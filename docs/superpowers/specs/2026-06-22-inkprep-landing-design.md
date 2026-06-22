# Inkprep — Landing Page Design Spec

**Date:** 2026-06-22
**Author:** Guillermo Andújar (with Claude)
**Status:** Approved

## 1. Purpose

Marketing landing page for **Inkprep**, an iOS app whose core feature is
**tattoo ink color analysis**: the user uploads a tattoo design and the app
identifies each color in the design and recommends the real tattoo inks that
best match it (perceptual color matching, skin-tone pre-compensation, ranked
ink candidates per color).

The existing Angular 19 scaffold in this folder is a throwaway structural
prototype. It will be **deleted** and the site rebuilt from scratch.

### Goals

- Communicate clearly, on mobile first, what Inkprep does and why it's valuable.
- Drive App Store downloads (iOS only).
- Match the app's real aesthetic: pure black, iOS "liquid glass", multicolor glow.
- Be fast, lightweight, SEO-friendly, and easy to deploy on Hostinger.

### Non-goals (YAGNI)

- No waitlist / email capture (app is going straight to the App Store).
- No Android / Google Play.
- No blog, CMS, user accounts, or dynamic/interactive color demo (static only).
- No backend. The site is fully static.

## 2. Stack & Architecture

- **Framework:** Astro (static output) + Tailwind CSS.
- **Rendering:** 100% static HTML/CSS/JS. No SSR, no server runtime.
- **i18n:** English (default, `/`) and Spanish (`/es/`), with a language switcher.
  Strings live in per-locale data files; pages are duplicated per locale via
  Astro's routing (no heavy i18n lib needed).
- **Deploy:** Build to `dist/`, upload to **Hostinger** (FTP / file manager).
  Domain: **https://inkprep.app**. (If the Hostinger plan supports Git
  deploy, evaluate later — default path is static upload.)
- **Repo:** This folder becomes its own git repo (`git init`), independent of
  the ambient `.git` in the home directory, with remote
  `https://github.com/Guillegas/Inkprep-Web.git`.

### Project structure (target)

```
inkprep_web/
  astro.config.mjs
  tailwind.config.* (or @tailwind via Vite plugin, per Astro version)
  package.json
  CLAUDE.md
  README.md
  .gitignore
  public/
    favicon.ico / favicon.svg
    og-image.png
  src/
    assets/            # logo (provided by user), images, mockups
    styles/global.css  # design tokens, base
    i18n/
      en.ts
      es.ts
      utils.ts         # locale helpers
    layouts/
      BaseLayout.astro # <head>, SEO, fonts, glow background
    components/
      Navbar.astro
      Hero.astro
      Problem.astro
      HowItWorks.astro
      Features.astro
      PaletteShowcase.astro
      Faq.astro
      CtaDownload.astro
      Footer.astro
      LanguageSwitcher.astro
      AppStoreButton.astro
      GlassCard.astro
      Glow.astro         # reusable multicolor glow element
      PhoneMockup.astro  # iPhone frame wrapping a screenshot/placeholder
    pages/
      index.astro        # EN home
      terms.astro
      privacy.astro
      es/
        index.astro      # ES home
        terms.astro
        privacy.astro
  docs/superpowers/specs/...
```

## 3. Design Language

- **Background:** pure black `#000000`. Optional very subtle dark surface
  `#0a0a0a` for layering.
- **Liquid glass:** frosted glass cards — semi-transparent dark fill,
  `backdrop-blur`, 1px subtle light border (`rgba(255,255,255,0.08)`), soft
  inner/outer shadow. iOS 26 "liquid glass" feel.
- **Multicolor glow:** radial-gradient glows placed behind key elements. Each
  glow uses a different ink-like hue (crimson, violet, teal, amber, etc.),
  reinforcing the "palette of inks" concept. Low opacity, large blur.
- **Typography:** clean modern sans for body/UI; a slightly expressive display
  face for headlines. Final faces chosen at build time (system + 1 web font
  max for performance). Mobile-first type scale with `clamp()`.
- **Motion:** subtle scroll-reveal (fade + translateY), gentle glow drift.
  Must honor `prefers-reduced-motion: reduce` (disable transforms/animation).
- **Logo:** real app icon provided by user, in `src/assets/`:
  - `inkprep-icon.png` — white ink bottle on pure black. Primary mark; used in
    navbar, footer, and as base for the favicon. Matches the black aesthetic.
  - `inkprep-icon-glass.png` — liquid-glass version with multicolor glow.
    Embodies the exact design brief; used as a feature/hero accent.
  - **Note:** the App Store Connect `.p8` keys living next to the icon on the
    user's Desktop are sensitive and must NEVER be added to this repo.

## 4. Sections (mobile-first, single page)

1. **Navbar** — logo + "Inkprep" wordmark, language switcher (EN/ES), App Store
   button. Sticky, glass background on scroll. Collapses cleanly on mobile.
2. **Hero** — strong headline ("Find the real inks for every color in your
   tattoo" / ES equivalent), supporting subline, primary App Store button,
   iPhone mockup (placeholder screen now) with a multicolor glow behind it.
3. **Problem** — short empathetic framing: choosing tattoo colors is hard;
   screen colors don't match how ink looks on skin.
4. **How it works** — 3 steps with icons:
   1. Upload your design.
   2. Inkprep analyzes the palette color by color.
   3. Get the real inks recommended for each color.
5. **Features** — glass cards, each with its own glow accent:
   - Palette extraction (detects every distinct color).
   - True perceptual matching (color accuracy on skin).
   - Skin-tone pre-compensation.
   - Multiple ranked ink candidates per color.
6. **Palette showcase** — static visual: a design → extracted color swatches →
   suggested ink chips. Illustrative, not interactive.
7. **FAQ** — 4–6 Q&A (accordion). e.g. iOS only? Which inks? Does it replace my
   artist? Is it free? Accuracy?
8. **Final CTA** — bold download section with App Store button and glow.
9. **Footer** — wordmark, nav links, legal links (/terms, /privacy), language
   switcher, social placeholders, copyright.

**Legal pages:** `/terms` and `/privacy` (and `/es/` equivalents) — required by
the App Store. Simple readable templates with placeholder legal copy to be
finalized.

## 5. Content & i18n

- All visible strings sourced from `src/i18n/en.ts` and `src/i18n/es.ts`.
- Each page renders from a `lang` value; `LanguageSwitcher` links to the
  mirrored route in the other locale.
- `<html lang>`, `hreflang` alternate tags, and per-locale `<title>`/meta.

## 6. SEO & Performance

- Canonical URLs on `https://inkprep.app`.
- `sitemap.xml` (via `@astrojs/sitemap`) and `robots.txt`.
- Open Graph + Twitter card meta with `og-image.png`.
- Lighthouse targets: 95+ performance/SEO/accessibility on mobile.
- Lazy-load images, modern formats (WebP/AVIF), minimal JS.

## 7. App Store CTA handling

- A single source of truth for the App Store URL (e.g. a constant in config or
  i18n data). Currently a **placeholder** (`#` or "coming soon" link). When the
  app is published, change this one value and rebuild — that's the only edit
  needed across all CTAs.

## 8. Tooling / Repo setup

- `git init` in this folder; add remote `Inkprep-Web.git`; first commit.
- `.gitignore` for Node/Astro (`node_modules`, `dist`, `.astro`, etc.).
- `CLAUDE.md`: project context (what Inkprep is, stack, aesthetic rules,
  i18n conventions, deploy notes, "App Store URL is a single source of truth").
- `README.md`: dev/build/deploy instructions for Hostinger.

## 9. Success Criteria

- `npm run dev` serves the site locally; `npm run build` produces a static
  `dist/` deployable to Hostinger.
- Mobile-first layout looks correct at 390px width and scales up.
- EN and ES versions both render with working language switch.
- Aesthetic matches the brief (pure black, liquid glass, multicolor glow).
- Single App Store URL constant controls every download CTA.
- Repo is initialized and pushed to GitHub.

## 10. Open items (provided later by user)

- Final logo/icon asset (drop into `src/assets/`).
- Real app screenshots (replace mockup placeholders).
- Final legal copy for Terms / Privacy.
- Real App Store URL (swap the placeholder at publish time).
