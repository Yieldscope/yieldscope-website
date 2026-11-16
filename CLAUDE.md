# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

YieldScope landing site — a four-page static marketing site for the YieldScope
iOS app (HK + US yield comparison: bank time deposits, bonds, dividend stocks).
The app is iOS-only; the only store link used anywhere is
https://apps.apple.com/hk/app/id6764265537 (verified). Never add an Android /
Google Play link unless Mike confirms one exists.

**Tech stack:** plain HTML/CSS/JS, no build step. Hosted on GitHub Pages at
landing.yieldscope.app (CNAME + `.nojekyll` + `.well-known/apple-app-site-association`
— don't touch those). Push to `main` auto-deploys.

## Pages

- `index.html` — comparison-first homepage: interactive fictional demo table
  (deposits/bonds/stocks, sortable, row condition panels), asset-class stories,
  App Store screenshot section, privacy facts, FAQ, CTA.
- `privacy.html`, `terms.html`, `support.html` — legal pages, same chrome.
- `404.html` — GitHub Pages 404.

All sample yields on the homepage are **fictional** and labeled as such. Never
present them as live rates. Factual claims must match the app: no account, no
analytics/tracking, watchlist stored on device, iOS only. The App Store rating
is **4+** (verify via `https://itunes.apple.com/lookup?id=6764265537&country=hk`
if referencing it in copy).

## Design language

Source of truth: `/Users/mikewong/yieldscope-work/frontend/DESIGN.md` (the
Flutter app's spec). The site follows it: Exo 2 (400/500/600 only, Google
Fonts), emerald `#047857` as the only accent, neutral white/gray surfaces,
true-black dark mode (`#1A1A1A` cards, `#2D2D2D` hairlines), 8px radius
controls, hairline borders, no shadows/gradients/glassmorphism, yield tiers
≥5% `#3D6473` light / `#A2CED9` dark, 3–5% primary, <3% ink.

Deliberate site-only deviations (documented, don't "fix" without asking):
- Dark `--accent` is `#10b981` (the app keeps `#047857`) — needed for contrast
  on true black; light mode matches the app exactly.
- Dark `--secondary` is `#cbd5e1` (a middle ink between the app's two dark
  inks) for long-form legal readability.
- Display sizes run larger than the app's type scale (marketing surface).

## Architecture

- `styles.css` — shared tokens + homepage styles (light/dark via
  `[data-theme]` on `<html>`).
- `styles-legal.css` — legal-page layout on the same tokens.
- `script.js` — serves every page: theme toggle + localStorage (`theme`,
  shared across pages, falls back to `prefers-color-scheme`), brand logo swap;
  the comparison-table logic is guarded and only runs when `.comparison`
  exists.
- Each page's `<head>` has a tiny inline script that sets `data-theme` before
  first paint (no FOUC). If you touch theme logic, update both places.
- `asset/` — `logo-light.png`/`logo-dark.png` (brand mark, swapped by theme),
  `home-screen.png` (cropped from the current App Store screenshot),
  `ys_logo_light_mode.png` (favicon + og:image).

## Cache-busting (important)

The CDN in front of GitHub Pages caches assets for 4 hours while HTML stays
fresh. `styles.css`, `script.js` and `styles-legal.css` are referenced with
`?v=` query strings — **bump the version on every page whenever you change
those files**, or visitors get new HTML with old CSS/JS (this broke the site
once). Current: `?v=20261117-2`.

## Verification before pushing

No build step, but verify before claiming done:

```bash
node --check script.js
# then, against the live site (or a local route in ~/sites/routes/):
# - 0 console errors on all pages
# - no horizontal overflow at 390px and 1440px
# - theme default follows system preference on first visit
# - table filters/sort/row-details work on the homepage
```

Headless Chrome via `playwright-core` works from this machine:
`/Users/mikewong/.npm/_npx/9833c18b2d85bc59/node_modules/playwright-core`,
launch with `{ channel: 'chrome', headless: true }`.

## Known external issue

Cloudflare's Email Address Obfuscation rewrites `mailto:` links on the live
site into `/cdn-cgi/l/email-protection#…` (breaks JS-less mail clients). Fix
is a Cloudflare dashboard toggle (Scrape Shield → Email Address Obfuscation →
Off); it cannot be fixed from this repo.
