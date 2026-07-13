/**
 * One-time dataset cleanup for Abbie's Angels (Sanity project 7o31gm3n).
 *
 * What it does:
 *   1. Sets the Donate button to Venmo on `singleton-donate`.
 *   2. Deletes the duplicate plain-id singletons (keeping the canonical
 *      `singleton-*` docs the website now reads), after verifying the
 *      canonical counterpart exists.
 *   3. Deletes the orphaned `contact_intro` document.
 *
 * It NEVER deletes drafts and NEVER touches the `event` / `gallery_image`
 * collections. Runs in dry-run mode unless you pass --apply.
 *
 * Usage (PowerShell):
 *   $env:SANITY_WRITE_TOKEN = "<editor token>"
 *   node studio/scripts/cleanup-duplicates.mjs           # dry run (shows plan)
 *   node studio/scripts/cleanup-duplicates.mjs --apply   # executes
 *
 * Create an Editor token at https://www.sanity.io/manage -> project -> API -> Tokens.
 */

const PROJECT_ID = '7o31gm3n'
const DATASET = 'production'
const API = '2024-01-01'
const token = process.env.SANITY_WRITE_TOKEN
const APPLY = process.argv.includes('--apply')

const VENMO = {button_text: 'Donate on Venmo', button_url: 'https://venmo.com/abbies-angels'}

// Plain-id duplicates to remove; each must have a `singleton-*` counterpart.
const PLAIN_DUPLICATES = [
  'hero', 'mission', 'what_we_do', 'events', 'support', 'contact',
  'donate', 'volunteer', 'sponsor', 'thank_you', 'board', 'staff',
]
// Orphaned documents with no counterpart (type removed from schema).
const ORPHANS = ['contact_intro']

const singletonId = (t) => 'singleton-' + t.replace(/_/g, '-')

if (!token) {
  console.error('ERROR: set SANITY_WRITE_TOKEN (an Editor token) first.')
  process.exit(1)
}

async function query(groq) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API}/data/query/${DATASET}?query=${encodeURIComponent(groq)}`
  const res = await fetch(url, {headers: {Authorization: `Bearer ${token}`}})
  if (!res.ok) throw new Error(`query ${res.status}: ${await res.text()}`)
  return (await res.json()).result
}

async function mutate(mutations) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API}/data/mutate/${DATASET}?returnIds=true`
  const res = await fetch(url, {
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
    body: JSON.stringify({mutations}),
  })
  if (!res.ok) throw new Error(`mutate ${res.status}: ${await res.text()}`)
  return res.json()
}

async function main() {
  const mutations = []

  // 1. Donate -> Venmo
  const donate = await query('*[_id == "singleton-donate"][0]{button_url}')
  if (!donate) {
    console.warn('WARN: singleton-donate not found; skipping Venmo update.')
  } else if ((donate.button_url || '').includes('venmo')) {
    console.log('Donate button already points at Venmo; no change.')
  } else {
    console.log(`Donate button: "${donate.button_url || '(empty)'}" -> ${VENMO.button_url}`)
    mutations.push({patch: {id: 'singleton-donate', set: VENMO}})
  }

  // 2. Delete plain duplicates (only when the singleton counterpart exists)
  for (const type of PLAIN_DUPLICATES) {
    const sid = singletonId(type)
    const [plain, canonical] = await Promise.all([
      query(`*[_id == "${type}"][0]{_id}`),
      query(`*[_id == "${sid}"][0]{_id}`),
    ])
    if (!plain) {
      console.log(`- ${type}: already removed.`)
      continue
    }
    if (!canonical) {
      console.warn(`WARN: ${type}: canonical ${sid} missing -> NOT deleting ${type}.`)
      continue
    }
    console.log(`delete ${type} (keeping ${sid})`)
    mutations.push({delete: {id: type}})
  }

  // 3. Delete orphans
  for (const id of ORPHANS) {
    const doc = await query(`*[_id == "${id}"][0]{_id}`)
    if (doc) {
      console.log(`delete orphan ${id}`)
      mutations.push({delete: {id}})
    }
  }

  if (mutations.length === 0) {
    console.log('\nNothing to do. Dataset already clean.')
    return
  }

  if (!APPLY) {
    console.log(`\nDRY RUN: ${mutations.length} mutation(s) planned. Re-run with --apply to execute.`)
    return
  }

  const result = await mutate(mutations)
  console.log(`\nApplied ${mutations.length} mutation(s).`)
  console.log('Result:', JSON.stringify(result.results?.map((r) => r.id) ?? result, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
