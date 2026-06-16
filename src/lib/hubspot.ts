/**
 * HubSpot API client
 * Uses the HubSpot Private App Access Token via direct fetch().
 * Cloudflare Workers compatible — no Node.js-only SDK needed.
 */

const HS_BASE = 'https://api.hubapi.com';

function getToken(): string {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) throw new Error('HUBSPOT_ACCESS_TOKEN is not set');
  return token;
}

function headers() {
  return {
    'Authorization': `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  };
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContactPayload {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  message?: string;
  /** HubSpot lifecycle stage: 'lead' | 'subscriber' | 'opportunity' | 'customer' */
  lifecyclestage?: string;
  /** Custom property — maps to the "interest" select on contact form */
  hs_lead_status?: string;
  /** Free-form source label e.g. 'Website Contact Form' */
  lead_source?: string;
}

export interface DealPayload {
  dealname: string;
  pipeline?: string;
  dealstage?: string;
  amount?: number;
  /** HubSpot owner ID (optional) */
  hubspot_owner_id?: string;
}

export interface HubSpotResult {
  ok: boolean;
  id?: string;
  error?: string;
  status?: number;
}

// ─── Contact upsert ───────────────────────────────────────────────────────────

/**
 * Creates or updates a HubSpot contact by email (upsert).
 * Endpoint: POST /crm/v3/objects/contacts
 * On duplicate email HubSpot returns 409 — we then PATCH the existing record.
 */
export async function upsertContact(payload: ContactPayload): Promise<HubSpotResult> {
  const properties: Record<string, string | number> = {
    email: payload.email,
  };
  if (payload.firstname)       properties.firstname        = payload.firstname;
  if (payload.lastname)        properties.lastname         = payload.lastname;
  if (payload.phone)           properties.phone            = payload.phone;
  if (payload.message)         properties.message          = payload.message;
  if (payload.lifecyclestage)  properties.lifecyclestage   = payload.lifecyclestage;
  if (payload.hs_lead_status)  properties.hs_lead_status   = payload.hs_lead_status;
  if (payload.lead_source)     properties.lead_source      = payload.lead_source;

  // Try to create first
  const createRes = await fetch(`${HS_BASE}/crm/v3/objects/contacts`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ properties }),
  });

  if (createRes.ok) {
    const data = await createRes.json() as { id: string };
    return { ok: true, id: data.id };
  }

  // 409 = contact already exists — patch instead
  if (createRes.status === 409) {
    const searchRes = await fetch(
      `${HS_BASE}/crm/v3/objects/contacts/search`,
      {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({
          filterGroups: [{
            filters: [{ propertyName: 'email', operator: 'EQ', value: payload.email }],
          }],
          properties: ['id'],
          limit: 1,
        }),
      }
    );
    const searchData = await searchRes.json() as { results: Array<{ id: string }> };
    const existingId = searchData?.results?.[0]?.id;
    if (!existingId) {
      return { ok: false, error: 'Contact exists but could not be found', status: 409 };
    }
    const patchRes = await fetch(`${HS_BASE}/crm/v3/objects/contacts/${existingId}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify({ properties }),
    });
    if (patchRes.ok) {
      return { ok: true, id: existingId };
    }
    const patchErr = await patchRes.json() as { message?: string };
    return { ok: false, error: patchErr?.message ?? 'Patch failed', status: patchRes.status };
  }

  const errData = await createRes.json() as { message?: string };
  return { ok: false, error: errData?.message ?? 'Unknown error', status: createRes.status };
}

// ─── Deal creation ────────────────────────────────────────────────────────────

/**
 * Creates a deal and associates it with a contact.
 */
export async function createDeal(
  deal: DealPayload,
  contactId?: string
): Promise<HubSpotResult> {
  const properties: Record<string, string | number> = {
    dealname: deal.dealname,
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
    headers: headers(),
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

/**
 * Subscribes an email address to a HubSpot marketing email subscription type.
 * subscriptionId comes from HubSpot → Marketing → Subscriptions.
 */
export async function subscribeEmail(
  email: string,
  subscriptionId: number
): Promise<HubSpotResult> {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  if (!portalId) return { ok: false, error: 'HUBSPOT_PORTAL_ID is not set' };

  const res = await fetch(
    `${HS_BASE}/communication-preferences/v3/subscribe`,
    {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        emailAddress: email,
        subscriptionId,
        legalBasis: 'CONSENT_WITH_NOTICE',
        legalBasisExplanation: 'User submitted newsletter signup form on abbiesangels.org',
      }),
    }
  );

  if (res.ok || res.status === 204) return { ok: true };
  const errData = await res.json() as { message?: string };
  return { ok: false, error: errData?.message ?? 'Subscribe failed', status: res.status };
}
