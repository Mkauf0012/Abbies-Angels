# Abbies Angels — Astro Conversion Setup

> **Feature branch only** — `feature/astro-conversion`
> Live site on Railway (`main`) is completely untouched.

## Prerequisites
- Node.js 18+ installed
- Git

## Local Dev Setup (one-time)

```powershell
# 1. Clone / pull the branch
git fetch origin
git checkout feature/astro-conversion

# 2. Copy images from the old images/ folder into public/
# PowerShell:
if (!(Test-Path public/images)) { New-Item -ItemType Directory -Path public/images }
Copy-Item images/* public/images/ -Recurse -Force

# 3. Install dependencies
npm install

# 4. Run dev server
npm run dev
# Opens at http://localhost:4321
```

## What You're Looking At

| File/Folder | Purpose |
|---|---|
| `src/layouts/Base.astro` | Shared header, nav, footer, all CSS |
| `src/pages/index.astro` | Homepage — reads from `_data/` YAML at build time |
| `src/pages/gallery.astro` | Gallery page — reads from `_data/` YAML at build time |
| `public/admin/index.html` | Decap CMS admin panel WITH live preview templates |
| `public/admin/config.yml` | Full CMS config (all collections) |
| `public/admin/preview.css` | Preview pane styles |
| `_data/` | All YAML content files (same as before) |
| `public/images/` | Images served by Astro (copy from `images/` — see above) |

## CMS Preview Panes — What Works

Every section now has a styled preview template registered in `admin/index.html`:

- ✅ Hero Section (headline, buttons, meta)
- ✅ Hero Card (image, date, time, location)
- ✅ Mission Section
- ✅ Events Section (with featured card)
- ✅ Ways to Help (with Give Today card)
- ✅ Contact Section Intro
- ✅ Gallery Tiles (grid layout with images)
- ✅ Family Spotlight (two-column with photo)
- ✅ Board Members (photo grid)
- ✅ Staff & Volunteers (photo grid)

## Netlify Deploy (when ready)

1. In Netlify, add this as a new site pointing to `feature/astro-conversion`
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Enable Netlify Identity + Git Gateway in Site Settings
5. Point `abbiesangels.org` DNS to Netlify when approved

## Live Site Safety

- `main` branch = Railway = live site = **do not touch**
- This branch builds independently
- Only merge to `main` when client approves the switch
