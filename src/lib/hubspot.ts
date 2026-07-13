/**
 * HubSpot API client
 * Cloudflare Workers compatible — no Node.js SDK needed.
 *
 * IMPORTANT: With @astrojs/cloudflare adapter (output: 'server'),
 * env vars are NOT on process.env or import.meta.env at runtime.
 * They live on context.locals.runtime.env and must be passed in.
 */

const HS_BASE = 'https://api.hubapi.com';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CloudflareEnv {
  HUBSPOT_TOKEN: string;
  HUBSPOT_PORTAL_ID?: string;
  // Comma-separated origin allowlist for the form endpoint (falls back to the
  // production domains when unset).
  ALLOWED_ORIGINS?: string;
  // When set, Cloudflare Turnstile verification is enforced on form submissions.
  TURNSTILE_SECRET?: string;
}

export interface ContactPayload {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  message?: string;
  lifecyclestage?: string;
  hs_lead_status?: string;
}

export interface DealPayload {
  dealname: string;
  pipeline?: string;
  dealstage?: string;
  amount?: number;
  hubspot_owner_id?: string;
}

export interface HubSpotResult {
  ok: boolean;
  id?: string;
  error?: string;
  status?: number;
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

function makeHeaders(env: CloudflareEnv) {
  if (!env.HUBSPOT_TOKEN) throw new Error('HUBSPOT_TOKEN is not set');
  return {
    'Authorization': `Bearer ${env.HUBSPOT_TOKEN}`,
    'Content-Type': 'application/json',
  };
}

// ─── Contact upsert ───────────────────────────────────────────────────────────

export async function upsertContact(
  payload: ContactPayload,
  env: CloudflareEnv
): Promise<HubSpotResult> {
  const h = makeHeaders(env);
  const properties: Record<string, string | number> = { email: payload.email };
  if (payload.firstname)      properties.firstname       = payload.firstname;
  if (payload.lastname)       properties.lastname        = payload.lastname;
  if (payload.phone)          properties.phone           = payload.phone;
  if (payload.message)        properties.message         = payload.message;
  if (payload.lifecyclestage) properties.lifecyclestage  = payload.lifecyclestage;
  if (payload.hs_lead_status) properties.hs_lead_status  = payload.hs_lead_status;

  const createRes = await fetch(`${HS_BASE}/crm/v3/objects/contacts`, {
    method: 'POST',
    headers: h,
    body: JSON.stringify({ properties }),
  });

  if (createRes.ok) {
    const data = await createRes.json() as { id: string };
    return { ok: true, id: data.id };
  }

  if (createRes.status === 409) {
    const searchRes = await fetch(`${HS_BASE}/crm/v3/objects/contacts/search`, {
      method: 'POST',
      headers: h,
      body: JSON.stringify({
        filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: payload.email }] }],
        properties: ['id'],
        limit: 1,
      }),
    });
    const searchData = await searchRes.json() as { results: Array<{ id: string }> };
    const existingId = searchData?.results?.[0]?.id;
    if (!existingId) return { ok: false, error: 'Contact exists but could not be found', status: 409 };

    const patchRes = await fetch(`${HS_BASE}/crm/v3/objects/contacts/${existingId}`, {
      method: 'PATCH',
      headers: h,
      body: JSON.stringify({ properties }),
    });
    if (patchRes.ok) return { ok: true, id: existingId };
    const patchErr = await patchRes.json() as { message?: string };
    return { ok: false, error: patchErr?.message ?? 'Patch failed', status: patchRes.status };
  }

  const errData = await createRes.json() as { message?: string };
  return { ok: false, error: errData?.message ?? 'Unknown error', status: createRes.status };
}

// ─── Deal creation ────────────────────────────────────────────────────────────

export async function createDeal(
  deal: DealPayload,
  contactId: string | undefined,
  env: CloudflareEnv
): Promise<HubSpotResult> {
  const h = makeHeaders(env);
  const properties: Record<string, string | number> = {
    dealname:  deal.dealname,
    pipeline:  deal.pipeline  ?? 'default',
    dealstage: deal.dealstage ?? 'appointmentscheduled',
  };
  if (deal.amount)           properties.amount           = deal.amount;
  if (deal.hubspot_owner_id) properties.hubspot_owner_id = deal.hubspot_owner_id;

  const body: Record<string, unknown> = { properties };
  if (contactId) {
    body.associations = [{
      to: { id: contactId },
      types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }],
    }];
  }

  const res = await fetch(`${HS_BASE}/crm/v3/objects/deals`, {
    method: 'POST',
    headers: h,
    body: JSON.stringify(body),
  });

  if (res.ok) {
    const data = await res.json() as { id: string };
    return { ok: true, id: data.id };
  }
  const errData = await res.json() as { message?: string };
  return { ok: false, error: errData?.message ?? 'Unknown error', status: res.status };
}

// ─── Email subscription ───────────────────────────────────────────────────────

export async function subscribeEmail(
  email: string,
  subscriptionId: number,
  env: CloudflareEnv
): Promise<HubSpotResult> {
  const h = makeHeaders(env);
  const res = await fetch(`${HS_BASE}/communication-preferences/v3/subscribe`, {
    method: 'POST',
    headers: h,
    body: JSON.stringify({
      emailAddress: email,
      subscriptionId,
      legalBasis: 'CONSENT_WITH_NOTICE',
      legalBasisExplanation: 'User submitted newsletter signup form on abbiesangels.org',
    }),
  });

  if (res.ok || res.status === 204) return { ok: true };
  const errData = await res.json() as { message?: string };
  return { ok: false, error: errData?.message ?? 'Subscribe failed', status: res.status };
}
