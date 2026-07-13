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
 * Abuse protections:
 *   - Origin allowlist (browser cross-site calls are rejected)
 *   - Hidden honeypot field (`company_website`) — silently dropped if filled
 *   - Optional Cloudflare Turnstile verification (enabled when TURNSTILE_SECRET is set)
 *   - Input validation (email format, length caps, non-negative amount)
 *   - Generic error responses (internal detail is logged, never returned)
 *
 * Returns: { ok: boolean, contactId?: string, dealId?: string, error?: string }
 */

import type { APIRoute } from 'astro';
import type { CloudflareEnv } from '../../lib/hubspot';
import { upsertContact, createDeal, subscribeEmail } from '../../lib/hubspot';

export const prerender = false;

// HubSpot Marketing Information subscription type ID
const NEWSLETTER_SUBSCRIPTION_ID = 1749943430;

const DEFAULT_ALLOWED_ORIGINS = [
  'https://abbiesangels.org',
  'https://www.abbiesangels.org',
];

// ─── Origin / CORS ──────────────────────────────────────────────────────────

function allowedOrigins(env?: CloudflareEnv): string[] {
  const raw = env?.ALLOWED_ORIGINS ?? '';
  const fromEnv = raw.split(',').map((s) => s.trim()).filter(Boolean);
  return fromEnv.length ? fromEnv : DEFAULT_ALLOWED_ORIGINS;
}

function isDevOrigin(origin: string): boolean {
  return /^http:\/\/localhost(:\d+)?$/.test(origin) || /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin);
}

function isOriginAllowed(origin: string | null, env?: CloudflareEnv): boolean {
  if (!origin) return true; // same-origin requests and non-browser clients omit Origin
  return allowedOrigins(env).includes(origin) || isDevOrigin(origin);
}

function corsHeaders(origin: string | null, env?: CloudflareEnv): Record<string, string> {
  const headers: Record<string, string> = {
    'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (origin && isOriginAllowed(origin, env)) headers['Access-Control-Allow-Origin'] = origin;
  return headers;
}

// ─── Validation helpers ───────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 254 && EMAIL_RE.test(value);
}

function cleanStr(value: unknown, max: number): string | undefined {
  if (value === undefined || value === null) return undefined;
  const s = String(value).trim();
  if (!s) return undefined;
  return s.slice(0, max);
}

function cleanAmount(value: unknown): number | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0 || n > 1_000_000) return NaN; // NaN signals invalid
  return n;
}

// ─── Turnstile (optional) ─────────────────────────────────────────────────────

async function verifyTurnstile(token: string | undefined, ip: string | null, secret: string): Promise<boolean> {
  if (!token) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token, remoteip: ip ?? undefined }),
    });
    const data = await res.json() as { success?: boolean };
    return data?.success === true;
  } catch {
    return false;
  }
}

// ─── Route ────────────────────────────────────────────────────────────────────

export const OPTIONS: APIRoute = ({ request }) =>
  new Response(null, { status: 204, headers: corsHeaders(request.headers.get('Origin')) });

export const POST: APIRoute = async (context) => {
  const { request, locals } = context;
  const origin = request.headers.get('Origin');
  const env = (locals as { runtime?: { env?: CloudflareEnv } }).runtime?.env as CloudflareEnv | undefined;
  const headers = corsHeaders(origin, env);

  const respond = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), { status, headers: { ...headers, 'Content-Type': 'application/json' } });

  // Reject browser calls from disallowed origins.
  if (!isOriginAllowed(origin, env)) {
    return respond({ ok: false, error: 'Forbidden' }, 403);
  }

  if (!env?.HUBSPOT_TOKEN) {
    console.error('[HubSpot API] HUBSPOT_TOKEN is not configured');
    return respond({ ok: false, error: 'Service unavailable' }, 503);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return respond({ ok: false, error: 'Invalid request' }, 400);
  }

  // Honeypot: real users never fill this hidden field. Pretend success so bots move on.
  if (cleanStr(body.company_website, 200)) {
    return respond({ ok: true });
  }

  // Optional Turnstile enforcement.
  if (env.TURNSTILE_SECRET) {
    const ok = await verifyTurnstile(
      cleanStr(body.cf_turnstile_token, 4096),
      request.headers.get('CF-Connecting-IP'),
      env.TURNSTILE_SECRET,
    );
    if (!ok) return respond({ ok: false, error: 'Verification failed' }, 403);
  }

  const formType = cleanStr(body.formType, 40) ?? 'contact';

  // Shared validated fields.
  if (!isValidEmail(body.email)) {
    return respond({ ok: false, error: 'A valid email address is required' }, 400);
  }
  const email = String(body.email);
  const firstname = cleanStr(body.firstname, 100);
  const lastname = cleanStr(body.lastname, 100);
  const phone = cleanStr(body.phone, 40);
  const message = cleanStr(body.message, 2000);
  const company = cleanStr(body.company, 200);
  const interest = cleanStr(body.interest, 100);
  const amount = cleanAmount(body.amount);
  if (Number.isNaN(amount)) {
    return respond({ ok: false, error: 'Invalid amount' }, 400);
  }

  try {
    switch (formType) {

      // ── Contact form ────────────────────────────────────────────────────
      case 'contact': {
        const result = await upsertContact({
          email, firstname, lastname, message,
          hs_lead_status: interest,
          lifecyclestage: 'lead',
        }, env);
        if (!result.ok) {
          console.error('[HubSpot API] contact upsert failed:', result.error);
          return respond({ ok: false, error: 'Unable to submit right now' }, 502);
        }
        return respond({ ok: true, contactId: result.id });
      }

      // ── Volunteer form ──────────────────────────────────────────────────
      case 'volunteer': {
        const result = await upsertContact({
          email, firstname, lastname, phone, message,
          lifecyclestage: 'lead',
          hs_lead_status: 'volunteer',
        }, env);
        if (!result.ok) {
          console.error('[HubSpot API] volunteer upsert failed:', result.error);
          return respond({ ok: false, error: 'Unable to submit right now' }, 502);
        }
        return respond({ ok: true, contactId: result.id });
      }

      // ── Donate form ──────────────────────────────────────────────────────
      case 'donate': {
        const contactResult = await upsertContact({
          email, firstname, lastname,
          lifecyclestage: 'lead',
        }, env);
        if (!contactResult.ok) {
          console.error('[HubSpot API] donate contact failed:', contactResult.error);
          return respond({ ok: false, error: 'Unable to submit right now' }, 502);
        }
        const dealResult = await createDeal({
          dealname:  `Donation — ${firstname ?? ''} ${lastname ?? ''} (${email})`.trim(),
          pipeline:  'default',
          dealstage: 'appointmentscheduled',
          amount,
        }, contactResult.id, env);
        return respond({ ok: true, contactId: contactResult.id, dealId: dealResult.id });
      }

      // ── Sponsor form ─────────────────────────────────────────────────────
      case 'sponsor': {
        const contactResult = await upsertContact({
          email, firstname, lastname, phone, message,
          lifecyclestage: 'opportunity',
          hs_lead_status: 'sponsor',
        }, env);
        if (!contactResult.ok) {
          console.error('[HubSpot API] sponsor contact failed:', contactResult.error);
          return respond({ ok: false, error: 'Unable to submit right now' }, 502);
        }
        const dealResult = await createDeal({
          dealname:  `Sponsorship — ${company ?? firstname ?? ''} (${email})`.trim(),
          pipeline:  'default',
          dealstage: 'appointmentscheduled',
          amount,
        }, contactResult.id, env);
        return respond({ ok: true, contactId: contactResult.id, dealId: dealResult.id });
      }

      // ── Newsletter opt-in ────────────────────────────────────────────────
      case 'newsletter': {
        const contactResult = await upsertContact({
          email, firstname,
          lifecyclestage: 'subscriber',
        }, env);
        if (!contactResult.ok) {
          console.error('[HubSpot API] newsletter contact failed:', contactResult.error);
          return respond({ ok: false, error: 'Unable to subscribe right now' }, 502);
        }
        // Non-fatal — if subscribeEmail throws, contact is already saved
        try {
          await subscribeEmail(email, NEWSLETTER_SUBSCRIPTION_ID, env);
        } catch {
          // swallow — redirect should still fire
        }
        return respond({ ok: true, contactId: contactResult.id });
      }

      default:
        return respond({ ok: false, error: 'Unknown form type' }, 400);
    }
  } catch (err) {
    console.error('[HubSpot API]', err instanceof Error ? err.message : err);
    return respond({ ok: false, error: 'Internal server error' }, 500);
  }
};
