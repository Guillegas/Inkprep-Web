# Inkprep Landing — Project Guide

Static marketing landing page for **Inkprep**, an **iOS-only** app whose core
feature is **tattoo ink color analysis**: upload a design → the app detects every
color → recommends the real tattoo inks that match (perceptual matching +
skin-tone compensation + ranked candidates).

## Stack
- Astro 5 (static output) + Tailwind CSS v4 (`@tailwindcss/vite`).
- TypeScript strict. `@astrojs/sitemap`.
- Deploy: static `dist/` uploaded to **Hostinger** `public_html`. Domain: inkprep.app.

## Conventions
- **Mobile-first.** Verify every change at 390px before desktop.
- **All visible copy** lives in `src/i18n/en.ts` and `src/i18n/es.ts` — never hardcode
  strings in components. EN at `/`, ES at `/es/`.
- **Aesthetic:** pure black `#000`, `.glass` liquid-glass cards, multicolor `<Glow>` accents
  (one ink-like hue per accent). Honor `prefers-reduced-motion`.
- **App Store URL is a single source of truth:** `src/config.ts` (`APP_STORE_URL`,
  `APP_STORE_AVAILABLE`). Swap at launch; never inline App Store links.
- Design tokens are CSS vars in `src/styles/global.css` under `@theme`.

## Commands
- `npm run dev` · `npm run build` · `npm run preview`

## Do NOT
- Add Android/Google Play (iOS only).
- Add a backend, SSR, or email capture (static, no waitlist).
- Commit secrets. The App Store Connect `.p8` keys on the user's Desktop must never
  enter this repo.

## Pending (user-supplied)
- Real app screenshots → replace placeholder screens in `PhoneMockup`.
- Final legal copy in `terms`/`privacy` pages (placeholders marked with TODO).
- Real App Store URL at publish.
- Proper 1200×630 `public/og-image.png`.
