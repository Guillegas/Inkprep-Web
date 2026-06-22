# Inkprep — Landing Page

Marketing landing page for **Inkprep**, the iOS app that matches every color in a
tattoo design to real tattoo inks. Built with Astro + Tailwind CSS. Static, mobile-first,
bilingual (EN/ES).

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
```

## Build

```bash
npm run build    # outputs static site to ./dist
npm run preview  # preview the production build locally
```

## Deploy (Hostinger)

The site is fully static. Build, then upload the **contents of `dist/`** to your
Hostinger `public_html` directory via the File Manager or FTP.

1. `npm run build`
2. Upload everything inside `dist/` (not the `dist` folder itself) to `public_html/`.
3. Site is live at https://inkprep.app

## App Store link

The download CTA URL lives in **one place**: `src/config.ts`.
When the app is published, set `APP_STORE_URL` to the real link and
`APP_STORE_AVAILABLE = true`, then rebuild.

## Structure

- `src/pages/` — routes (`/` EN, `/es/` ES, plus `/terms`, `/privacy`)
- `src/components/` — section + UI components
- `src/i18n/` — all copy (en.ts / es.ts)
- `src/config.ts` — site + App Store config
- `src/assets/` — app icons
