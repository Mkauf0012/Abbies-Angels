/**
 * POST /api/hubspot
 *
 * Universal HubSpot form endpoint.
 * Accepts JSON body with a `formType` discriminator and routes
 * to the correct HubSpot action(s).
 *
 * formType values:
 *   'contact'    — contact page general enquiry
 *   'volunteer'  — volunteer application
 *   'donate'     — donation interest / offline pledge
 *   'sponsor'    — sponsorship enquiry
 *   'newsletter' — newsletter opt-in only
 *
 * Returns: { ok: boolean, contactId?: string, dealId?: string, error?: string }
 */

import type { APIRoute } from 'astro';
import type { CloudflareEnv } from '../../lib/hubspot';
import { upsertContact, createDeal, subscribeEmail } from '../../lib/hubspot';

export const prerender = false;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// HubSpot Marketing Information subscription type ID
const NEWSLETTER_SUBSCRIPTION_ID = 1749943430;

export const OPTIONS: APIRoute = () =>
  new Response(null, { status: 204, headers: CORS_HEADERS });

export const POST: APIRoute = async (context) => {
  const { request, locals } = context;

  // Cloudflare Workers runtime env — this is where vars live with @astrojs/cloudflare
  const env = (locals as { runtime?: { env?: CloudflareEnv } }).runtime?.env as CloudflareEnv | undefined;

  if (!env?.HUBSPOT_TOKEN) {
    return json({ ok: false, error: 'HUBSPOT_TOKEN is not configured on this environment' }, 500);
  }

  let body: Record<string, string | number>;
  try {
    body = await request.json() as Record<string, string | number>;
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400);
  }

  const formType = (body.formType as string | undefined) ?? 'contact';

  try {
    switch (formType) {

      // ── Contact form ────────────────────────────────────────────────────
      case 'contact': {
        const result = await upsertContact({
          email:          String(body.email),
          firstname:      body.firstname ? String(body.firstname) : undefined,
          lastname:       body.lastname  ? String(body.lastname)  : undefined,
          message:        body.message  ? String(body.message)  : undefined,
          hs_lead_status: body.interest ? String(body.interest) : undefined,
          lifecyclestage: 'lead',
        }, env);
        if (!result.ok) return json({ ok: false, error: result.error }, 422);
        return json({ ok: true, contactId: result.id });
      }

      // ── Volunteer form ──────────────────────────────────────────────────
      case 'volunteer': {
        const result = await upsertContact({
          email:          String(body.email),
          firstname:      body.firstname ? String(body.firstname) : undefined,
          lastname:       body.lastname  ? String(body.lastname)  : undefined,
          phone:          body.phone     ? String(body.phone)     : undefined,
          message:        body.message  ? String(body.message)  : undefined,
          lifecyclestage: 'lead',
          hs_lead_status: 'volunteer',
        }, env);
        if (!result.ok) return json({ ok: false, error: result.error }, 422);
        return json({ ok: true, contactId: result.id });
      }

      // ── Donate form ──────────────────────────────────────────────────────
      case 'donate': {
        const contactResult = await upsertContact({
          email:          String(body.email),
          firstname:      body.firstname ? String(body.firstname) : undefined,
          lastname:       body.lastname  ? String(body.lastname)  : undefined,
          lifecyclestage: 'lead',
        }, env);
        if (!contactResult.ok) return json({ ok: false, error: contactResult.error }, 422);

        const dealResult = await createDeal({
          dealname:  `Donation — ${body.firstname ?? ''} ${body.lastname ?? ''} (${body.email})`.trim(),
          pipeline:  'default',
          dealstage: 'appointmentscheduled',
          amount:    body.amount ? Number(body.amount) : undefined,
        }, contactResult.id, env);

        return json({ ok: true, contactId: contactResult.id, dealId: dealResult.id });
      }

      // ── Sponsor form ─────────────────────────────────────────────────────
      case 'sponsor': {
        const contactResult = await upsertContact({
          email:          String(body.email),
          firstname:      body.firstname ? String(body.firstname) : undefined,
          lastname:       body.lastname  ? String(body.lastname)  : undefined,
          phone:          body.phone     ? String(body.phone)     : undefined,
          message:        body.message  ? String(body.message)  : undefined,
          lifecyclestage: 'opportunity',
          hs_lead_status: 'sponsor',
        }, env);
        if (!contactResult.ok) return json({ ok: false, error: contactResult.error }, 422);

        const dealResult = await createDeal({
          dealname:  `Sponsorship — ${body.company ?? body.firstname ?? ''} (${body.email})`.trim(),
          pipeline:  'default',
          dealstage: 'appointmentscheduled',
          amount:    body.amount ? Number(body.amount) : undefined,
        }, contactResult.id, env);

        return json({ ok: true, contactId: contactResult.id, dealId: dealResult.id });
      }

      // ── Newsletter opt-in ────────────────────────────────────────────────
      case 'newsletter': {
        const contactResult = await upsertContact({
          email:          String(body.email),
          firstname:      body.firstname ? String(body.firstname) : undefined,
          lifecyclestage: 'subscriber',
        }, env);
        if (!contactResult.ok) return json({ ok: false, error: contactResult.error }, 422);

        // Non-fatal — if subscribeEmail throws, contact is already saved
        try {
          await subscribeEmail(String(body.email), NEWSLETTER_SUBSCRIPTION_ID, env);
        } catch {
          // swallow — redirect should still fire
        }

        return json({ ok: true, contactId: contactResult.id });
      }

      default:
        return json({ ok: false, error: `Unknown formType: ${formType}` }, 400);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('[HubSpot API]', message);
    return json({ ok: false, error: message }, 500);
  }
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}
