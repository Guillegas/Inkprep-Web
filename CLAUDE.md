# Inkprep Landing — Project Guide

Static marketing + legal site for **Tattoo Inkprep**, a professional tool for
**COLOR tattoo ARTISTS** (iOS now, Android later). The artist uploads a clean
digital color design, picks ink brand(s) and the client's skin tone, and gets a
palette: the exact ink pots to use — or a 2-ink mix with ratios when there's no
direct match. Booth tool consulted before tattooing.

## Messaging rules (important)
- Audience = professional color tattoo artists (esp. beginner/intermediate).
- **Results, not mechanism.** NEVER surface internals in copy: no "LAB", no
  "Delta E", no "perceptual/deterministic", no "color science", and don't hype
  as "AI". Frame as benefit + proof (upload design → real inks & mixes that match).
- COLOR only. Input = clean digital designs, NOT photos / finished tattoos.
- Honest accuracy disclaimer (result depends on ink, technique, skin, lighting).
- **No prices and no "free"/"gratis" on the web** — pricing/trial is shown in the
  App Store only. A subscription may be mentioned (manage/cancel), never a number.

## Stack
- Astro 5 (static output) + Tailwind CSS v4 (`@tailwindcss/vite`).
- TypeScript strict. `@astrojs/sitemap`.
- Deploy: static `dist/` uploaded to **Hostinger** `public_html`. Domain: inkprep.app.

## Conventions
- **Mobile-first — 360px is the baseline** the user reviews against. Verify there first.
- **All visible copy** lives in `src/i18n/en.ts` / `es.ts` (typed by `Content`) —
  never hardcode strings. EN at `/`, ES at `/es/`.
- **Aesthetic:** pure black `#000`, `.glass` liquid-glass cards, multicolor `<Glow>`
  accents. Honor `prefers-reduced-motion`. Navbar fades to translucent dark on scroll
  (`.nav-bar.is-scrolled`); mobile menu is a glass dropdown (no extra bg layer).
- **Store links = single source of truth** in `src/config.ts`: `APP_STORE_URL`/
  `APP_STORE_AVAILABLE` (App Store shown now), `PLAY_STORE_URL`/`PLAY_STORE_AVAILABLE`
  (flip to add Google Play later). Use `StoreButtons.astro`; never inline store links.
- Contact/legal in config: `SUPPORT_EMAIL`, `LEGAL_ENTITY`.
- **Analytics is consent-gated:** `ConsentBanner.astro` loads analytics ONLY after
  Accept. Configure `ANALYTICS_DOMAIN` (Plausible) in config; empty = no provider yet.
- Brand logos (`src/assets/brands/`) are shown on **light/white tiles** (their native
  logos use dark text that vanishes on black).
- Design tokens are CSS vars in `src/styles/global.css` under `@theme`.

## Commands
- `npm run dev` · `npm run build` · `npm run preview`

## Do NOT
- Show Google Play yet (iOS only at launch — flag is ready for later).
- Put prices or "free" on the web.
- Add a backend, SSR, or email capture (static).
- Commit secrets. The App Store Connect `.p8` keys in `~/Desktop/Inkprep/Archivos/`
  must never enter this repo.

## Pending (user-supplied)
- Real app screenshots → replace placeholder screens in `PhoneMockup` / showcase.
- Finalize legal `[date]` and storage-region details in privacy/terms.
- `ANALYTICS_DOMAIN` once the Plausible (or other) account exists.
- Real App Store URL at publish; proper 1200×630 `public/og-image.png`.
