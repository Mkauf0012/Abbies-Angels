# Abbie's Angels — Sanity Studio

Content Studio for the Abbie's Angels website (Sanity project `7o31gm3n`, dataset `production`).

## Run locally

```bash
cd studio
npm install
npm run dev        # http://localhost:3333
```

You'll be prompted to log in with the Sanity account that has access to the project.

## Deploy the Studio (optional hosted version)

```bash
npm run deploy     # deploys to <name>.sanity.studio
```

## Content model

Every website section maps to a **singleton** document (one per type), grouped in the
desk by page: Homepage, Events, Gallery, Sponsored Family, Get Involved, Contact, Team.
`Event` and `Gallery Image` are collections (many documents).

Singletons are edited in place from the grouped structure, they can't be duplicated or
deleted and don't appear in the global "Create new" menu, so the dataset stays clean.

The website reads these documents at build/request time via GROQ (see
`src/lib/sanity.ts` `getSingleton()` in the site repo).
