# YieldScope landing site — task log

Current state (2026-11-17): site redesigned ("comparison-first") and live.
Open items live in the workspace tracker, not here.

## Done

- [x] Comparison-first homepage: fictional interactive demo table, asset
      stories, App Store screenshot section, privacy, FAQ, CTA
- [x] Legal pages (privacy / terms / support) restyled to match; legal text
      preserved, age-rating corrected to 4+ (was wrongly 17+)
- [x] 404 page, robots.txt, sitemap.xml, canonical + og/twitter meta
- [x] Theme: system-preference default, anti-FOUC inline script, shared
      localStorage key across pages
- [x] ~13 MB of unreferenced retired assets removed (old crypto-era mockups,
      store badges, unused logo variant)
- [x] Cache-busting `?v=` on CSS/JS references (CDN caches assets 4h)

## Open

- [ ] Cloudflare Email Address Obfuscation mangles `mailto:` links on the
      live site — needs the dashboard toggle (Scrape Shield → Email Address
      Obfuscation → Off). Cannot be fixed from this repo.
- [ ] Multi-language (EN / 繁中 / 简中) — not started; app already supports
      all three, site is English-only.
- [ ] Google Search Console / analytics — deliberately absent; the site
      itself runs no analytics (privacy position). Revisit only if Mike
      wants server-side or privacy-preserving measurement.
