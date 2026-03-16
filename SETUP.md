# Abbies Angels — Astro Conversion Setup

> **Feature branch only** — `feature/astro-conversion`
> Live site on Railway (`main`) is completely untouched.

## Branch Deploy URL
```
https://feature-astro-conversion--dancing-treacle-6631ef.netlify.app
```

## Local Dev

```powershell
git pull origin feature/astro-conversion
npm run dev
# Opens at http://localhost:4321
```

## Structure

| File/Folder | Purpose |
|---|---|
| `src/layouts/Base.astro` | Shared header, nav, footer, all CSS |
| `src/pages/index.astro` | Homepage — reads from `_data/` YAML at build time |
| `src/pages/gallery.astro` | Gallery page — reads from `_data/` YAML at build time |
| `stackbit.config.ts` | Netlify Visual Editor config (Stackbit) |
| `_data/` | All YAML content files |
| `public/images/` | Images served by Astro |

## Live Site Safety

- `main` branch = Railway = live site = **do not touch**
- This branch builds independently on Netlify
- Only merge to `main` when client approves the switch
