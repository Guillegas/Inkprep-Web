# Inkprep Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Inkprep marketing landing page — a mobile-first, static, bilingual (EN/ES) site for an iOS tattoo ink-color-analysis app, with a pure-black / iOS liquid-glass / multicolor-glow aesthetic, ready to deploy on Hostinger at inkprep.app.

**Architecture:** Astro static site (no SSR, no backend). Tailwind CSS v4 via the `@tailwindcss/vite` plugin. All copy lives in per-locale data files (`src/i18n/en.ts`, `src/i18n/es.ts`); pages are duplicated per locale (`/` for EN, `/es/` for ES). Reusable `.astro` components compose each page section. A single config constant holds the App Store URL so it can be swapped at publish time.

**Tech Stack:** Astro 5, Tailwind CSS v4, TypeScript, `@astrojs/sitemap`. Node 18+.

## Global Constraints

- Static output only (`output: 'static'`). No server runtime, no backend, no DB.
- Mobile-first: every layout must look correct at 390px width and scale up.
- iOS only: download CTA is the Apple App Store; no Google Play, no Android.
- Aesthetic: pure black `#000000`, iOS "liquid glass" frosted cards, multicolor glows.
- Bilingual: English at `/`, Spanish at `/es/`. All visible strings from `src/i18n`.
- App Store URL is a SINGLE source of truth: `src/config.ts` → `APP_STORE_URL`. Placeholder for now.
- Canonical/site base URL: `https://inkprep.app`.
- Honor `prefers-reduced-motion: reduce` (disable transforms/animations).
- The `.p8` App Store Connect keys on the user's Desktop must NEVER enter this repo.
- App icons already present: `src/assets/inkprep-icon.png` (white bottle on black), `src/assets/inkprep-icon-glass.png` (liquid-glass + glow).
- Commit after every task. Conventional commit messages.

---

### Task 1: Scaffold Astro + Tailwind, remove Angular

**Files:**
- Delete: all Angular scaffold (`src/app/`, `src/index.html`, `src/main.ts`, `src/styles.scss`, `angular.json`, `tsconfig.app.json`, `tsconfig.spec.json`, `.editorconfig`, `.vscode/`, `node_modules/`, `package-lock.json`, `src/assets/images/`, `public/favicon.ico`, `.angular/`)
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/styles/global.css`, `src/env.d.ts`, `public/robots.txt`
- Keep: `src/assets/inkprep-icon.png`, `src/assets/inkprep-icon-glass.png`, `docs/`, `.gitignore`

**Interfaces:**
- Produces: a working Astro dev server (`npm run dev`) and build (`npm run build`); Tailwind classes usable in `.astro` files; `global.css` imported globally.

- [ ] **Step 1: Remove the Angular scaffold**

```bash
cd /Users/guillegas/Developer/inkprep_web
rm -rf src/app src/index.html src/main.ts src/styles.scss \
  angular.json tsconfig.app.json tsconfig.spec.json .editorconfig \
  .vscode node_modules package-lock.json .angular \
  src/assets/images public/favicon.ico
ls -la
```
Expected: `src/assets/inkprep-icon.png`, `src/assets/inkprep-icon-glass.png`, `docs/`, `.gitignore` remain; no Angular files.

- [ ] **Step 2: Create `package.json`**

```json
{
  "name": "inkprep-web",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/sitemap": "^3.2.0",
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0"
  }
}
```

- [ ] **Step 3: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://inkprep.app',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 4: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 5: Create `src/env.d.ts`**

```ts
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
```

- [ ] **Step 6: Create `src/styles/global.css`** (Tailwind entry; tokens added in Task 2)

```css
@import "tailwindcss";

html {
  scroll-behavior: smooth;
}

body {
  background-color: #000000;
  color: #f5f5f5;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 7: Create `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://inkprep.app/sitemap-index.xml
```

- [ ] **Step 8: Install dependencies and verify build**

Run:
```bash
npm install
npm run build
```
Expected: install succeeds; `npm run build` completes with no errors and creates `dist/`.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: replace Angular scaffold with Astro + Tailwind setup"
```

---

### Task 2: Design tokens + BaseLayout + Glow

**Files:**
- Modify: `src/styles/global.css`
- Create: `src/config.ts`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Glow.astro`
- Create: `src/pages/index.astro` (temporary smoke page; replaced in Task 9)

**Interfaces:**
- Produces:
  - `src/config.ts` exports `SITE_URL: string`, `APP_STORE_URL: string`, `SITE_NAME: string`.
  - `BaseLayout.astro` props: `{ title: string; description: string; lang: 'en' | 'es'; path: string }` (`path` = current path without locale prefix, e.g. `/`, `/terms`). Renders `<html lang>`, `<head>` SEO/OG/hreflang, imports `global.css`, exposes a `<slot />`.
  - `Glow.astro` props: `{ color: string; class?: string }` — renders an absolutely-positioned blurred radial gradient. Consumed by section components.

- [ ] **Step 1: Add design tokens + glass/glow utilities to `src/styles/global.css`**

Append after the existing `body` block:

```css
@theme {
  --color-ink-black: #000000;
  --color-ink-surface: #0a0a0a;
  --color-ink-text: #f5f5f5;
  --color-ink-muted: #8a8a8f;
  --color-ink-crimson: #c41e3a;
  --color-ink-violet: #7c3aed;
  --color-ink-teal: #14b8a6;
  --color-ink-amber: #f59e0b;
  --color-ink-blue: #3b82f6;
  --font-display: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
}

/* Liquid-glass card */
.glass {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

/* Scroll reveal (JS toggles .is-visible) */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 2: Add the web fonts** to `global.css` top (above `@import "tailwindcss";` is not allowed; put the `@import url` for fonts on the FIRST line of the file)

Insert as the very first line of `src/styles/global.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap");
```

- [ ] **Step 3: Create `src/config.ts`**

```ts
export const SITE_URL = "https://inkprep.app";
export const SITE_NAME = "Inkprep";

// Single source of truth for the App Store link.
// Placeholder until the app is published — swap this one value at launch.
export const APP_STORE_URL = "#";
export const APP_STORE_AVAILABLE = false; // flip to true when APP_STORE_URL is real
```

- [ ] **Step 4: Create `src/components/Glow.astro`**

```astro
---
interface Props {
  color: string;
  class?: string;
}
const { color, class: className = "" } = Astro.props;
---
<div
  class={`pointer-events-none absolute -z-10 rounded-full blur-[120px] opacity-40 ${className}`}
  style={`background: radial-gradient(circle, ${color} 0%, transparent 70%);`}
  aria-hidden="true"
>
</div>
```

- [ ] **Step 5: Create `src/layouts/BaseLayout.astro`**

```astro
---
import "../styles/global.css";
import { SITE_URL, SITE_NAME } from "../config";
import favicon from "../assets/inkprep-icon.png";

interface Props {
  title: string;
  description: string;
  lang: "en" | "es";
  path: string; // path without locale prefix, e.g. "/", "/terms"
}
const { title, description, lang, path } = Astro.props;

const canonical = `${SITE_URL}${lang === "es" ? "/es" : ""}${path === "/" ? "/" : path}`;
const enHref = `${SITE_URL}${path === "/" ? "/" : path}`;
const esHref = `${SITE_URL}/es${path === "/" ? "/" : path}`;
---
<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <link rel="alternate" hreflang="en" href={enHref} />
    <link rel="alternate" hreflang="es" href={esHref} />
    <link rel="alternate" hreflang="x-default" href={enHref} />
    <link rel="icon" type="image/png" href={favicon.src} />
    <meta name="theme-color" content="#000000" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={SITE_NAME} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body class="font-[var(--font-body)] relative min-h-screen">
    <slot />
    <script>
      const els = document.querySelectorAll(".reveal");
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      els.forEach((el) => io.observe(el));
    </script>
  </body>
</html>
```

- [ ] **Step 6: Create temporary `src/pages/index.astro` smoke page**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Glow from "../components/Glow.astro";
---
<BaseLayout title="Inkprep" description="Find the real inks for your tattoo." lang="en" path="/">
  <main class="relative grid min-h-screen place-items-center">
    <Glow color="var(--color-ink-crimson)" class="top-1/4 left-1/4 h-96 w-96" />
    <div class="glass rounded-3xl p-10 text-center">
      <h1 class="text-4xl font-bold">Inkprep</h1>
      <p class="mt-2 text-[var(--color-ink-muted)]">Liquid glass smoke test</p>
    </div>
  </main>
</BaseLayout>
```

- [ ] **Step 7: Run dev server and verify visually**

Run: `npm run dev` then open the printed localhost URL.
Expected: pure-black page, a frosted glass card centered, a soft crimson glow behind it. No console errors. Verify at 390px width (responsive devtools).

- [ ] **Step 8: Build + commit**

```bash
npm run build
git add -A
git commit -m "feat: design tokens, BaseLayout with SEO, and Glow component"
```

---

### Task 3: i18n content data

**Files:**
- Create: `src/i18n/types.ts`
- Create: `src/i18n/en.ts`
- Create: `src/i18n/es.ts`
- Create: `src/i18n/index.ts`

**Interfaces:**
- Produces:
  - `src/i18n/types.ts` exports `interface Content { ... }` (the shape below).
  - `en.ts` / `es.ts` each `export default` a `Content` object.
  - `index.ts` exports `getContent(lang: 'en' | 'es'): Content` and `type Lang = 'en' | 'es'`.
- Consumed by: every section component and page.

- [ ] **Step 1: Create `src/i18n/types.ts`**

```ts
export interface NavContent {
  features: string;
  how: string;
  faq: string;
  download: string;
}
export interface Step {
  title: string;
  body: string;
}
export interface Feature {
  title: string;
  body: string;
  glow: string; // CSS color var
}
export interface FaqItem {
  q: string;
  a: string;
}
export interface Content {
  meta: { title: string; description: string };
  nav: NavContent;
  hero: { eyebrow: string; heading: string; headingEm: string; sub: string; note: string };
  problem: { label: string; heading: string; body: string };
  how: { label: string; heading: string; steps: Step[] };
  features: { label: string; heading: string; items: Feature[] };
  showcase: { label: string; heading: string; body: string; swatchLabel: string; inkLabel: string };
  faq: { label: string; heading: string; items: FaqItem[] };
  cta: { heading: string; sub: string };
  footer: { tagline: string; product: string; legal: string; terms: string; privacy: string; rights: string };
  comingSoon: string; // App Store button label when not yet published
}
```

- [ ] **Step 2: Create `src/i18n/en.ts`**

```ts
import type { Content } from "./types";

const en: Content = {
  meta: {
    title: "Inkprep — Match every color in your tattoo to real inks",
    description:
      "Upload your tattoo design and Inkprep identifies every color and recommends the real inks that match it. The iOS app for color-accurate tattoos.",
  },
  nav: { features: "Features", how: "How it works", faq: "FAQ", download: "Download" },
  hero: {
    eyebrow: "iOS APP",
    heading: "The right inks for every color in your",
    headingEm: "tattoo",
    sub: "Upload your design and Inkprep analyzes it color by color, recommending the real tattoo inks that match — so what you imagine is what ends up on your skin.",
    note: "Free to download · iPhone",
  },
  problem: {
    label: "THE PROBLEM",
    heading: "Color is the hardest part of a tattoo to get right",
    body: "A design on a screen never looks the same once it's ink on skin. Artists and clients guess at shades, and small color mistakes are permanent. Inkprep takes the guessing out of it.",
  },
  how: {
    label: "HOW IT WORKS",
    heading: "From design to the exact inks in three steps",
    steps: [
      { title: "Upload your design", body: "Add any tattoo design from your photos in seconds." },
      { title: "We analyze the palette", body: "Inkprep detects every distinct color and reads it the way it'll look on skin." },
      { title: "Get the real inks", body: "Receive the actual tattoo inks recommended for each color, ranked by match." },
    ],
  },
  features: {
    label: "FEATURES",
    heading: "Color accuracy, engineered",
    items: [
      { title: "Full palette extraction", body: "Detects every distinct color in your design, not just the obvious ones.", glow: "var(--color-ink-crimson)" },
      { title: "True perceptual matching", body: "Matches color the way the human eye sees it, for results that hold up on skin.", glow: "var(--color-ink-violet)" },
      { title: "Skin-tone aware", body: "Pre-compensates for your skin tone so the ink reads true once healed.", glow: "var(--color-ink-teal)" },
      { title: "Ranked ink candidates", body: "Several real ink options per color, ranked by how closely they match.", glow: "var(--color-ink-amber)" },
    ],
  },
  showcase: {
    label: "SEE IT",
    heading: "One design, every color, matched",
    body: "Inkprep breaks your design into its true colors and pairs each one with real inks.",
    swatchLabel: "Detected colors",
    inkLabel: "Recommended inks",
  },
  faq: {
    label: "FAQ",
    heading: "Questions, answered",
    items: [
      { q: "Is Inkprep free?", a: "Inkprep is free to download on the App Store. You can analyze your designs right away." },
      { q: "Is it only for iPhone?", a: "Yes — Inkprep is currently available on iOS only." },
      { q: "Does it replace my tattoo artist?", a: "No. Inkprep is a tool to plan colors with confidence; your artist brings it to life." },
      { q: "Which inks does it recommend?", a: "Real tattoo inks matched to each color in your design, ranked by accuracy." },
      { q: "How accurate is the color matching?", a: "Inkprep uses perceptual color matching and skin-tone compensation for results that hold up once healed." },
    ],
  },
  cta: { heading: "Plan your next tattoo in color", sub: "Download Inkprep and match every color before the needle touches skin." },
  footer: {
    tagline: "Color-accurate tattoos, from screen to skin.",
    product: "Product",
    legal: "Legal",
    terms: "Terms",
    privacy: "Privacy",
    rights: "All rights reserved.",
  },
  comingSoon: "Coming soon to the App Store",
};

export default en;
```

- [ ] **Step 3: Create `src/i18n/es.ts`**

```ts
import type { Content } from "./types";

const es: Content = {
  meta: {
    title: "Inkprep — Acierta el color de tu tatuaje con tintas reales",
    description:
      "Sube el diseño de tu tatuaje e Inkprep identifica cada color y te recomienda las tintas reales que mejor encajan. La app iOS para tatuajes con color fiel.",
  },
  nav: { features: "Características", how: "Cómo funciona", faq: "Preguntas", download: "Descargar" },
  hero: {
    eyebrow: "APP iOS",
    heading: "Las tintas correctas para cada color de tu",
    headingEm: "tatuaje",
    sub: "Sube tu diseño e Inkprep lo analiza color por color, recomendándote las tintas reales que encajan — para que lo que imaginas sea lo que acaba en tu piel.",
    note: "Descarga gratis · iPhone",
  },
  problem: {
    label: "EL PROBLEMA",
    heading: "El color es lo más difícil de acertar en un tatuaje",
    body: "Un diseño en pantalla nunca se ve igual una vez es tinta sobre la piel. Artistas y clientes adivinan los tonos, y un pequeño error de color es permanente. Inkprep elimina las suposiciones.",
  },
  how: {
    label: "CÓMO FUNCIONA",
    heading: "Del diseño a las tintas exactas en tres pasos",
    steps: [
      { title: "Sube tu diseño", body: "Añade cualquier diseño de tatuaje desde tus fotos en segundos." },
      { title: "Analizamos la paleta", body: "Inkprep detecta cada color y lo interpreta como se verá sobre la piel." },
      { title: "Recibe las tintas reales", body: "Obtén las tintas de tatuaje recomendadas para cada color, ordenadas por coincidencia." },
    ],
  },
  features: {
    label: "CARACTERÍSTICAS",
    heading: "Precisión de color, por diseño",
    items: [
      { title: "Extracción completa de paleta", body: "Detecta cada color de tu diseño, no solo los evidentes.", glow: "var(--color-ink-crimson)" },
      { title: "Coincidencia perceptual real", body: "Empareja el color como lo ve el ojo humano, para resultados fieles en la piel.", glow: "var(--color-ink-violet)" },
      { title: "Consciente del tono de piel", body: "Precompensa según tu tono de piel para que la tinta se vea fiel una vez curada.", glow: "var(--color-ink-teal)" },
      { title: "Tintas candidatas ordenadas", body: "Varias tintas reales por color, ordenadas por cercanía de coincidencia.", glow: "var(--color-ink-amber)" },
    ],
  },
  showcase: {
    label: "MÍRALO",
    heading: "Un diseño, cada color, emparejado",
    body: "Inkprep descompone tu diseño en sus colores reales y empareja cada uno con tintas reales.",
    swatchLabel: "Colores detectados",
    inkLabel: "Tintas recomendadas",
  },
  faq: {
    label: "PREGUNTAS",
    heading: "Resolvemos tus dudas",
    items: [
      { q: "¿Inkprep es gratis?", a: "Inkprep es gratis en la App Store. Puedes analizar tus diseños desde el primer momento." },
      { q: "¿Solo está en iPhone?", a: "Sí — Inkprep está disponible solo en iOS por ahora." },
      { q: "¿Sustituye a mi tatuador?", a: "No. Inkprep es una herramienta para planificar el color con seguridad; tu tatuador lo hace realidad." },
      { q: "¿Qué tintas recomienda?", a: "Tintas de tatuaje reales emparejadas con cada color de tu diseño, ordenadas por precisión." },
      { q: "¿Qué precisión tiene el emparejado de color?", a: "Inkprep usa coincidencia perceptual y compensación por tono de piel para resultados fieles una vez curado." },
    ],
  },
  cta: { heading: "Planifica tu próximo tatuaje en color", sub: "Descarga Inkprep y acierta cada color antes de que la aguja toque la piel." },
  footer: {
    tagline: "Tatuajes con color fiel, de la pantalla a la piel.",
    product: "Producto",
    legal: "Legal",
    terms: "Términos",
    privacy: "Privacidad",
    rights: "Todos los derechos reservados.",
  },
  comingSoon: "Próximamente en la App Store",
};

export default es;
```

- [ ] **Step 4: Create `src/i18n/index.ts`**

```ts
import en from "./en";
import es from "./es";
import type { Content } from "./types";

export type Lang = "en" | "es";

export function getContent(lang: Lang): Content {
  return lang === "es" ? es : en;
}

export type { Content };
```

- [ ] **Step 5: Type-check + commit**

Run: `npm run build`
Expected: build passes (TypeScript strict). No type errors in i18n files.

```bash
git add -A
git commit -m "feat: bilingual content data (EN/ES) with typed schema"
```

---

### Task 4: Shared UI components (AppStoreButton, GlassCard, LanguageSwitcher, PhoneMockup)

**Files:**
- Create: `src/components/AppStoreButton.astro`
- Create: `src/components/GlassCard.astro`
- Create: `src/components/LanguageSwitcher.astro`
- Create: `src/components/PhoneMockup.astro`

**Interfaces:**
- Consumes: `src/config.ts` (`APP_STORE_URL`, `APP_STORE_AVAILABLE`), `getContent`.
- Produces:
  - `AppStoreButton.astro` props `{ label?: string; comingSoonLabel: string }` — renders the Apple App Store badge link; if `!APP_STORE_AVAILABLE`, shows `comingSoonLabel` and `aria-disabled`.
  - `GlassCard.astro` props `{ class?: string }` + `<slot />`.
  - `LanguageSwitcher.astro` props `{ lang: Lang; path: string }`.
  - `PhoneMockup.astro` props `{ class?: string }` + `<slot />` (the screen content); renders an iPhone frame.

- [ ] **Step 1: Create `src/components/GlassCard.astro`**

```astro
---
interface Props { class?: string; }
const { class: className = "" } = Astro.props;
---
<div class={`glass rounded-3xl ${className}`}>
  <slot />
</div>
```

- [ ] **Step 2: Create `src/components/AppStoreButton.astro`**

```astro
---
import { APP_STORE_URL, APP_STORE_AVAILABLE } from "../config";
interface Props { label?: string; comingSoonLabel: string; }
const { label = "Download on the App Store", comingSoonLabel } = Astro.props;
---
{APP_STORE_AVAILABLE ? (
  <a
    href={APP_STORE_URL}
    class="inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-3.5 font-semibold text-black transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,255,255,0.15)]"
  >
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.05 12.04c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.1-2.01-3.77-2.04-1.6-.16-3.13.94-3.94.94-.81 0-2.07-.92-3.4-.9-1.75.03-3.36 1.02-4.26 2.58-1.82 3.15-.47 7.81 1.3 10.37.86 1.25 1.89 2.66 3.23 2.61 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.38.81 1.4-.02 2.28-1.28 3.13-2.54.99-1.45 1.4-2.86 1.42-2.93-.03-.01-2.72-1.04-2.75-4.12zM14.7 4.6c.72-.87 1.2-2.08 1.07-3.29-1.03.04-2.28.69-3.02 1.56-.66.77-1.24 2-1.09 3.18 1.15.09 2.32-.58 3.04-1.45z"/></svg>
    <span class="flex flex-col leading-tight text-left">
      <span class="text-[0.65rem] font-medium opacity-70">Download on the</span>
      <span class="text-base font-semibold">App Store</span>
    </span>
  </a>
) : (
  <span
    aria-disabled="true"
    class="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white/70 cursor-default"
  >
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.05 12.04c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.1-2.01-3.77-2.04-1.6-.16-3.13.94-3.94.94-.81 0-2.07-.92-3.4-.9-1.75.03-3.36 1.02-4.26 2.58-1.82 3.15-.47 7.81 1.3 10.37.86 1.25 1.89 2.66 3.23 2.61 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.38.81 1.4-.02 2.28-1.28 3.13-2.54.99-1.45 1.4-2.86 1.42-2.93-.03-.01-2.72-1.04-2.75-4.12zM14.7 4.6c.72-.87 1.2-2.08 1.07-3.29-1.03.04-2.28.69-3.02 1.56-.66.77-1.24 2-1.09 3.18 1.15.09 2.32-.58 3.04-1.45z"/></svg>
    {comingSoonLabel}
  </span>
)}
```

- [ ] **Step 3: Create `src/components/LanguageSwitcher.astro`**

```astro
---
import type { Lang } from "../i18n";
interface Props { lang: Lang; path: string; }
const { lang, path } = Astro.props;
const norm = path === "/" ? "/" : path;
const enHref = norm;
const esHref = `/es${norm === "/" ? "/" : norm}`;
const base = "px-2 py-1 text-sm font-medium transition";
const active = "text-white";
const idle = "text-white/40 hover:text-white/70";
---
<div class="flex items-center gap-1">
  <a href={enHref} class={`${base} ${lang === "en" ? active : idle}`}>EN</a>
  <span class="text-white/20">/</span>
  <a href={esHref} class={`${base} ${lang === "es" ? active : idle}`}>ES</a>
</div>
```

- [ ] **Step 4: Create `src/components/PhoneMockup.astro`**

```astro
---
interface Props { class?: string; }
const { class: className = "" } = Astro.props;
---
<div class={`relative mx-auto aspect-[9/19.5] w-[260px] rounded-[3rem] border border-white/10 bg-[#0a0a0a] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.8)] ${className}`}>
  <div class="absolute left-1/2 top-3 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-black"></div>
  <div class="h-full w-full overflow-hidden rounded-[2.3rem] bg-black">
    <slot />
  </div>
</div>
```

- [ ] **Step 5: Build + commit**

Run: `npm run build`
Expected: build passes.

```bash
git add -A
git commit -m "feat: shared UI components (AppStoreButton, GlassCard, LanguageSwitcher, PhoneMockup)"
```

---

### Task 5: Navbar + Footer

**Files:**
- Create: `src/components/Navbar.astro`
- Create: `src/components/Footer.astro`

**Interfaces:**
- Consumes: `getContent`, `Lang`, `LanguageSwitcher`, `AppStoreButton`, icon asset.
- Produces:
  - `Navbar.astro` props `{ lang: Lang; path: string }` — sticky top bar, glass on scroll, logo + wordmark, anchor nav (features/how/faq), language switcher, download button. Anchors point to `#features`, `#how`, `#faq`.
  - `Footer.astro` props `{ lang: Lang; path: string }` — wordmark, tagline, product + legal link columns, language switcher, copyright. Legal links resolve to locale-aware `/terms` `/privacy` (prefixed `/es` for ES).

- [ ] **Step 1: Create `src/components/Navbar.astro`**

```astro
---
import { getContent, type Lang } from "../i18n";
import LanguageSwitcher from "./LanguageSwitcher.astro";
import AppStoreButton from "./AppStoreButton.astro";
import icon from "../assets/inkprep-icon.png";
interface Props { lang: Lang; path: string; }
const { lang, path } = Astro.props;
const c = getContent(lang);
const home = lang === "es" ? "/es/" : "/";
---
<header id="nav" class="fixed inset-x-0 top-0 z-50 transition-colors duration-300">
  <nav class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
    <a href={home} class="flex items-center gap-2">
      <img src={icon.src} alt="Inkprep" class="h-8 w-8 rounded-lg" width="32" height="32" />
      <span class="text-lg font-bold tracking-tight">Inkprep</span>
    </a>
    <div class="hidden items-center gap-7 md:flex">
      <a href="#features" class="text-sm text-white/60 transition hover:text-white">{c.nav.features}</a>
      <a href="#how" class="text-sm text-white/60 transition hover:text-white">{c.nav.how}</a>
      <a href="#faq" class="text-sm text-white/60 transition hover:text-white">{c.nav.faq}</a>
    </div>
    <div class="flex items-center gap-3">
      <LanguageSwitcher lang={lang} path={path} />
      <a href="#download" class="hidden rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90 sm:inline-block">{c.nav.download}</a>
    </div>
  </nav>
  <script>
    const nav = document.getElementById("nav");
    const onScroll = () => {
      if (window.scrollY > 20) nav?.classList.add("glass");
      else nav?.classList.remove("glass");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  </script>
</header>
```

- [ ] **Step 2: Create `src/components/Footer.astro`**

```astro
---
import { getContent, type Lang } from "../i18n";
import LanguageSwitcher from "./LanguageSwitcher.astro";
import icon from "../assets/inkprep-icon.png";
import { SITE_NAME } from "../config";
interface Props { lang: Lang; path: string; }
const { lang, path } = Astro.props;
const c = getContent(lang);
const p = lang === "es" ? "/es" : "";
const year = new Date().getFullYear();
---
<footer class="relative border-t border-white/10 px-5 py-12">
  <div class="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
    <div>
      <div class="flex items-center gap-2">
        <img src={icon.src} alt="Inkprep" class="h-7 w-7 rounded-lg" width="28" height="28" />
        <span class="font-bold">Inkprep</span>
      </div>
      <p class="mt-3 max-w-xs text-sm text-white/50">{c.footer.tagline}</p>
    </div>
    <div>
      <h3 class="text-xs font-semibold uppercase tracking-widest text-white/40">{c.footer.product}</h3>
      <ul class="mt-3 space-y-2 text-sm text-white/60">
        <li><a href="#features" class="hover:text-white">{c.nav.features}</a></li>
        <li><a href="#how" class="hover:text-white">{c.nav.how}</a></li>
        <li><a href="#faq" class="hover:text-white">{c.nav.faq}</a></li>
      </ul>
    </div>
    <div>
      <h3 class="text-xs font-semibold uppercase tracking-widest text-white/40">{c.footer.legal}</h3>
      <ul class="mt-3 space-y-2 text-sm text-white/60">
        <li><a href={`${p}/terms`} class="hover:text-white">{c.footer.terms}</a></li>
        <li><a href={`${p}/privacy`} class="hover:text-white">{c.footer.privacy}</a></li>
      </ul>
      <div class="mt-4"><LanguageSwitcher lang={lang} path={path} /></div>
    </div>
  </div>
  <div class="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-sm text-white/40">
    © {year} {SITE_NAME}. {c.footer.rights}
  </div>
</footer>
```

- [ ] **Step 3: Build + commit**

Run: `npm run build`
Expected: build passes.

```bash
git add -A
git commit -m "feat: Navbar and Footer components"
```

---

### Task 6: Hero + Problem sections

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/Problem.astro`

**Interfaces:**
- Consumes: `getContent`, `Lang`, `Glow`, `PhoneMockup`, `AppStoreButton`, glass icon asset.
- Produces: `Hero.astro` and `Problem.astro`, each props `{ lang: Lang }`.

- [ ] **Step 1: Create `src/components/Hero.astro`**

```astro
---
import { getContent, type Lang } from "../i18n";
import Glow from "./Glow.astro";
import PhoneMockup from "./PhoneMockup.astro";
import AppStoreButton from "./AppStoreButton.astro";
import glassIcon from "../assets/inkprep-icon-glass.png";
interface Props { lang: Lang; }
const { lang } = Astro.props;
const c = getContent(lang);
---
<section class="relative overflow-hidden px-5 pb-20 pt-36">
  <Glow color="var(--color-ink-crimson)" class="top-0 right-0 h-[28rem] w-[28rem]" />
  <Glow color="var(--color-ink-violet)" class="top-40 left-0 h-80 w-80 opacity-25" />
  <div class="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
    <div class="reveal">
      <span class="text-xs font-semibold tracking-[0.25em] text-[var(--color-ink-crimson)]">{c.hero.eyebrow}</span>
      <h1 class="mt-4 font-[var(--font-display)] text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
        {c.hero.heading} <em class="not-italic text-[var(--color-ink-crimson)]">{c.hero.headingEm}</em>
      </h1>
      <p class="mt-6 max-w-md text-lg leading-relaxed text-white/60">{c.hero.sub}</p>
      <div class="mt-8 flex flex-col items-start gap-3">
        <AppStoreButton comingSoonLabel={c.comingSoon} />
        <span class="text-sm text-white/40">{c.hero.note}</span>
      </div>
    </div>
    <div class="reveal flex justify-center">
      <PhoneMockup>
        <div class="relative flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#111] to-black">
          <img src={glassIcon.src} alt="Inkprep app icon" class="h-24 w-24 rounded-3xl" width="96" height="96" />
          <span class="font-[var(--font-display)] text-2xl font-bold">Inkprep</span>
        </div>
      </PhoneMockup>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create `src/components/Problem.astro`**

```astro
---
import { getContent, type Lang } from "../i18n";
interface Props { lang: Lang; }
const { lang } = Astro.props;
const c = getContent(lang);
---
<section class="px-5 py-20">
  <div class="reveal mx-auto max-w-3xl text-center">
    <span class="text-xs font-semibold tracking-[0.25em] text-white/40">{c.problem.label}</span>
    <h2 class="mt-4 font-[var(--font-display)] text-3xl font-bold sm:text-4xl">{c.problem.heading}</h2>
    <p class="mt-5 text-lg leading-relaxed text-white/60">{c.problem.body}</p>
  </div>
</section>
```

- [ ] **Step 3: Build + commit**

Run: `npm run build`
Expected: build passes.

```bash
git add -A
git commit -m "feat: Hero and Problem sections"
```

---

### Task 7: HowItWorks + Features sections

**Files:**
- Create: `src/components/HowItWorks.astro`
- Create: `src/components/Features.astro`

**Interfaces:**
- Consumes: `getContent`, `Lang`, `GlassCard`, `Glow`.
- Produces: `HowItWorks.astro` (id `how`) and `Features.astro` (id `features`), each props `{ lang: Lang }`.

- [ ] **Step 1: Create `src/components/HowItWorks.astro`**

```astro
---
import { getContent, type Lang } from "../i18n";
import GlassCard from "./GlassCard.astro";
interface Props { lang: Lang; }
const { lang } = Astro.props;
const c = getContent(lang);
---
<section id="how" class="px-5 py-20">
  <div class="mx-auto max-w-6xl">
    <div class="reveal mx-auto max-w-2xl text-center">
      <span class="text-xs font-semibold tracking-[0.25em] text-white/40">{c.how.label}</span>
      <h2 class="mt-4 font-[var(--font-display)] text-3xl font-bold sm:text-4xl">{c.how.heading}</h2>
    </div>
    <div class="mt-12 grid gap-5 md:grid-cols-3">
      {c.how.steps.map((step, i) => (
        <GlassCard class="reveal p-7">
          <span class="font-[var(--font-display)] text-4xl font-extrabold text-[var(--color-ink-crimson)]">{String(i + 1).padStart(2, "0")}</span>
          <h3 class="mt-4 text-xl font-semibold">{step.title}</h3>
          <p class="mt-2 text-white/60">{step.body}</p>
        </GlassCard>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create `src/components/Features.astro`**

```astro
---
import { getContent, type Lang } from "../i18n";
import GlassCard from "./GlassCard.astro";
import Glow from "./Glow.astro";
interface Props { lang: Lang; }
const { lang } = Astro.props;
const c = getContent(lang);
---
<section id="features" class="relative overflow-hidden px-5 py-20">
  <Glow color="var(--color-ink-teal)" class="bottom-0 right-10 h-80 w-80 opacity-20" />
  <div class="mx-auto max-w-6xl">
    <div class="reveal mx-auto max-w-2xl text-center">
      <span class="text-xs font-semibold tracking-[0.25em] text-white/40">{c.features.label}</span>
      <h2 class="mt-4 font-[var(--font-display)] text-3xl font-bold sm:text-4xl">{c.features.heading}</h2>
    </div>
    <div class="mt-12 grid gap-5 sm:grid-cols-2">
      {c.features.items.map((f) => (
        <GlassCard class="reveal relative overflow-hidden p-7">
          <Glow color={f.glow} class="-top-10 -right-10 h-40 w-40 opacity-30" />
          <div class="h-10 w-10 rounded-xl" style={`background: ${f.glow};`}></div>
          <h3 class="mt-5 text-xl font-semibold">{f.title}</h3>
          <p class="mt-2 text-white/60">{f.body}</p>
        </GlassCard>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Build + commit**

Run: `npm run build`
Expected: build passes.

```bash
git add -A
git commit -m "feat: HowItWorks and Features sections"
```

---

### Task 8: PaletteShowcase + Faq + CtaDownload sections

**Files:**
- Create: `src/components/PaletteShowcase.astro`
- Create: `src/components/Faq.astro`
- Create: `src/components/CtaDownload.astro`

**Interfaces:**
- Consumes: `getContent`, `Lang`, `GlassCard`, `Glow`, `AppStoreButton`, `PhoneMockup`.
- Produces: `PaletteShowcase.astro`, `Faq.astro` (id `faq`), `CtaDownload.astro` (id `download`), each props `{ lang: Lang }`.

- [ ] **Step 1: Create `src/components/PaletteShowcase.astro`**

```astro
---
import { getContent, type Lang } from "../i18n";
import GlassCard from "./GlassCard.astro";
interface Props { lang: Lang; }
const { lang } = Astro.props;
const c = getContent(lang);
const swatches = ["#c41e3a", "#7c3aed", "#14b8a6", "#f59e0b", "#3b82f6", "#e11d48"];
const inks = ["Crimson", "Royal Violet", "Teal", "Amber", "Cobalt", "Rose"];
---
<section class="px-5 py-20">
  <div class="mx-auto max-w-6xl">
    <div class="reveal mx-auto max-w-2xl text-center">
      <span class="text-xs font-semibold tracking-[0.25em] text-white/40">{c.showcase.label}</span>
      <h2 class="mt-4 font-[var(--font-display)] text-3xl font-bold sm:text-4xl">{c.showcase.heading}</h2>
      <p class="mt-4 text-lg text-white/60">{c.showcase.body}</p>
    </div>
    <GlassCard class="reveal mt-12 p-8">
      <p class="text-xs font-semibold uppercase tracking-widest text-white/40">{c.showcase.swatchLabel}</p>
      <div class="mt-4 flex flex-wrap gap-3">
        {swatches.map((s) => (
          <div class="h-12 w-12 rounded-xl border border-white/10" style={`background:${s};`}></div>
        ))}
      </div>
      <p class="mt-8 text-xs font-semibold uppercase tracking-widest text-white/40">{c.showcase.inkLabel}</p>
      <div class="mt-4 flex flex-wrap gap-3">
        {inks.map((ink, i) => (
          <span class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            <span class="h-3 w-3 rounded-full" style={`background:${swatches[i]};`}></span>{ink}
          </span>
        ))}
      </div>
    </GlassCard>
  </div>
</section>
```

- [ ] **Step 2: Create `src/components/Faq.astro`**

```astro
---
import { getContent, type Lang } from "../i18n";
interface Props { lang: Lang; }
const { lang } = Astro.props;
const c = getContent(lang);
---
<section id="faq" class="px-5 py-20">
  <div class="mx-auto max-w-3xl">
    <div class="reveal text-center">
      <span class="text-xs font-semibold tracking-[0.25em] text-white/40">{c.faq.label}</span>
      <h2 class="mt-4 font-[var(--font-display)] text-3xl font-bold sm:text-4xl">{c.faq.heading}</h2>
    </div>
    <div class="mt-10 space-y-3">
      {c.faq.items.map((item) => (
        <details class="reveal glass group rounded-2xl p-5">
          <summary class="flex cursor-pointer list-none items-center justify-between font-semibold">
            {item.q}
            <span class="text-[var(--color-ink-crimson)] transition group-open:rotate-45">+</span>
          </summary>
          <p class="mt-3 text-white/60">{item.a}</p>
        </details>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Create `src/components/CtaDownload.astro`**

```astro
---
import { getContent, type Lang } from "../i18n";
import Glow from "./Glow.astro";
import AppStoreButton from "./AppStoreButton.astro";
interface Props { lang: Lang; }
const { lang } = Astro.props;
const c = getContent(lang);
---
<section id="download" class="relative overflow-hidden px-5 py-28">
  <Glow color="var(--color-ink-crimson)" class="left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 opacity-30" />
  <div class="reveal mx-auto max-w-2xl text-center">
    <h2 class="font-[var(--font-display)] text-4xl font-extrabold sm:text-5xl">{c.cta.heading}</h2>
    <p class="mt-5 text-lg text-white/60">{c.cta.sub}</p>
    <div class="mt-8 flex justify-center">
      <AppStoreButton comingSoonLabel={c.comingSoon} />
    </div>
  </div>
</section>
```

- [ ] **Step 4: Build + commit**

Run: `npm run build`
Expected: build passes.

```bash
git add -A
git commit -m "feat: PaletteShowcase, Faq, and CtaDownload sections"
```

---

### Task 9: Assemble home pages (EN + ES)

**Files:**
- Replace: `src/pages/index.astro` (EN home — overwrite the Task 2 smoke page)
- Create: `src/pages/es/index.astro` (ES home)

**Interfaces:**
- Consumes: `BaseLayout`, all section components, `getContent`.
- Produces: full single-page landing at `/` (EN) and `/es/` (ES).

- [ ] **Step 1: Overwrite `src/pages/index.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Navbar from "../components/Navbar.astro";
import Hero from "../components/Hero.astro";
import Problem from "../components/Problem.astro";
import HowItWorks from "../components/HowItWorks.astro";
import Features from "../components/Features.astro";
import PaletteShowcase from "../components/PaletteShowcase.astro";
import Faq from "../components/Faq.astro";
import CtaDownload from "../components/CtaDownload.astro";
import Footer from "../components/Footer.astro";
import { getContent } from "../i18n";
const lang = "en" as const;
const c = getContent(lang);
---
<BaseLayout title={c.meta.title} description={c.meta.description} lang={lang} path="/">
  <Navbar lang={lang} path="/" />
  <main>
    <Hero lang={lang} />
    <Problem lang={lang} />
    <HowItWorks lang={lang} />
    <Features lang={lang} />
    <PaletteShowcase lang={lang} />
    <Faq lang={lang} />
    <CtaDownload lang={lang} />
  </main>
  <Footer lang={lang} path="/" />
</BaseLayout>
```

- [ ] **Step 2: Create `src/pages/es/index.astro`** (identical structure, `lang="es"`)

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Navbar from "../../components/Navbar.astro";
import Hero from "../../components/Hero.astro";
import Problem from "../../components/Problem.astro";
import HowItWorks from "../../components/HowItWorks.astro";
import Features from "../../components/Features.astro";
import PaletteShowcase from "../../components/PaletteShowcase.astro";
import Faq from "../../components/Faq.astro";
import CtaDownload from "../../components/CtaDownload.astro";
import Footer from "../../components/Footer.astro";
import { getContent } from "../../i18n";
const lang = "es" as const;
const c = getContent(lang);
---
<BaseLayout title={c.meta.title} description={c.meta.description} lang={lang} path="/">
  <Navbar lang={lang} path="/" />
  <main>
    <Hero lang={lang} />
    <Problem lang={lang} />
    <HowItWorks lang={lang} />
    <Features lang={lang} />
    <PaletteShowcase lang={lang} />
    <Faq lang={lang} />
    <CtaDownload lang={lang} />
  </main>
  <Footer lang={lang} path="/" />
</BaseLayout>
```

- [ ] **Step 3: Run dev server and verify both locales visually**

Run: `npm run dev`
Open `/` and `/es/`.
Expected at 390px and desktop:
- Pure-black page, glass cards, multicolor glows render.
- All sections present in order; nav anchors scroll to sections.
- Language switch toggles EN↔ES and copy changes.
- App Store button shows the "Coming soon" state.
- No console errors.

- [ ] **Step 4: Build + commit**

Run: `npm run build`
Expected: build passes; `dist/index.html` and `dist/es/index.html` exist.

```bash
git add -A
git commit -m "feat: assemble bilingual home pages (EN + ES)"
```

---

### Task 10: Legal pages (Terms + Privacy, EN + ES)

**Files:**
- Create: `src/layouts/LegalLayout.astro`
- Create: `src/pages/terms.astro`
- Create: `src/pages/privacy.astro`
- Create: `src/pages/es/terms.astro`
- Create: `src/pages/es/privacy.astro`

**Interfaces:**
- Consumes: `BaseLayout`, `Navbar`, `Footer`, `getContent`.
- Produces: `LegalLayout.astro` props `{ lang: Lang; path: string; title: string }` + `<slot />` for body; four legal pages.

- [ ] **Step 1: Create `src/layouts/LegalLayout.astro`**

```astro
---
import BaseLayout from "./BaseLayout.astro";
import Navbar from "../components/Navbar.astro";
import Footer from "../components/Footer.astro";
import { getContent, type Lang } from "../i18n";
interface Props { lang: Lang; path: string; title: string; }
const { lang, path, title } = Astro.props;
const c = getContent(lang);
---
<BaseLayout title={`${title} — Inkprep`} description={c.meta.description} lang={lang} path={path}>
  <Navbar lang={lang} path={path} />
  <main class="mx-auto max-w-3xl px-5 pb-20 pt-32">
    <h1 class="font-[var(--font-display)] text-4xl font-extrabold">{title}</h1>
    <div class="prose prose-invert mt-8 max-w-none text-white/70 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_p]:mt-3">
      <slot />
    </div>
  </main>
  <Footer lang={lang} path={path} />
</BaseLayout>
```

- [ ] **Step 2: Create `src/pages/terms.astro`** (placeholder copy, to be finalized by user)

```astro
---
import LegalLayout from "../layouts/LegalLayout.astro";
---
<LegalLayout lang="en" path="/terms" title="Terms of Service">
  <p>Last updated: <!-- TODO: set date at publish --> [date].</p>
  <h2>1. Acceptance of Terms</h2>
  <p>By downloading or using Inkprep, you agree to these Terms of Service. If you do not agree, do not use the app.</p>
  <h2>2. The Service</h2>
  <p>Inkprep analyzes tattoo design images and suggests matching tattoo inks. Recommendations are guidance only and do not guarantee a specific result on skin.</p>
  <h2>3. User Content</h2>
  <p>You are responsible for the designs you upload and confirm you have the right to use them.</p>
  <h2>4. Disclaimer</h2>
  <p>Inkprep does not replace the judgment of a professional tattoo artist. Final color and application decisions rest with you and your artist.</p>
  <h2>5. Contact</h2>
  <p>Questions about these terms: <!-- TODO: contact email --> [email].</p>
</LegalLayout>
```

> NOTE: the `[date]`, `[email]`, and TODO markers here are deliberate user-supplied legal content placeholders called out in spec §10, not plan placeholders. Leave them for the user to finalize.

- [ ] **Step 3: Create `src/pages/privacy.astro`**

```astro
---
import LegalLayout from "../layouts/LegalLayout.astro";
---
<LegalLayout lang="en" path="/privacy" title="Privacy Policy">
  <p>Last updated: <!-- TODO: set date at publish --> [date].</p>
  <h2>1. Data We Process</h2>
  <p>Inkprep processes the tattoo design images you choose to analyze in order to extract colors and suggest inks.</p>
  <h2>2. How Images Are Used</h2>
  <p>Images are used solely to provide the color-analysis feature. <!-- TODO: confirm retention/storage policy with app implementation --> [describe retention].</p>
  <h2>3. Third Parties</h2>
  <p>We do not sell your personal data. <!-- TODO: list any analytics/processors used --></p>
  <h2>4. Your Rights</h2>
  <p>You may request information about or deletion of your data by contacting us.</p>
  <h2>5. Contact</h2>
  <p>Privacy questions: <!-- TODO: contact email --> [email].</p>
</LegalLayout>
```

- [ ] **Step 4: Create `src/pages/es/terms.astro`**

```astro
---
import LegalLayout from "../../layouts/LegalLayout.astro";
---
<LegalLayout lang="es" path="/terms" title="Términos del Servicio">
  <p>Última actualización: <!-- TODO: fecha al publicar --> [fecha].</p>
  <h2>1. Aceptación de los términos</h2>
  <p>Al descargar o usar Inkprep, aceptas estos Términos del Servicio. Si no estás de acuerdo, no uses la app.</p>
  <h2>2. El servicio</h2>
  <p>Inkprep analiza imágenes de diseños de tatuaje y sugiere tintas que coinciden. Las recomendaciones son orientativas y no garantizan un resultado concreto sobre la piel.</p>
  <h2>3. Contenido del usuario</h2>
  <p>Eres responsable de los diseños que subes y confirmas que tienes derecho a usarlos.</p>
  <h2>4. Aviso legal</h2>
  <p>Inkprep no sustituye el criterio de un tatuador profesional. Las decisiones finales de color y aplicación son tuyas y de tu tatuador.</p>
  <h2>5. Contacto</h2>
  <p>Dudas sobre estos términos: <!-- TODO: email de contacto --> [email].</p>
</LegalLayout>
```

- [ ] **Step 5: Create `src/pages/es/privacy.astro`**

```astro
---
import LegalLayout from "../../layouts/LegalLayout.astro";
---
<LegalLayout lang="es" path="/privacy" title="Política de Privacidad">
  <p>Última actualización: <!-- TODO: fecha al publicar --> [fecha].</p>
  <h2>1. Datos que tratamos</h2>
  <p>Inkprep procesa las imágenes de diseños de tatuaje que elijas analizar para extraer colores y sugerir tintas.</p>
  <h2>2. Uso de las imágenes</h2>
  <p>Las imágenes se usan únicamente para ofrecer la función de análisis de color. <!-- TODO: confirmar política de retención con la app --> [describir retención].</p>
  <h2>3. Terceros</h2>
  <p>No vendemos tus datos personales. <!-- TODO: listar analítica/procesadores usados --></p>
  <h2>4. Tus derechos</h2>
  <p>Puedes solicitar información sobre tus datos o su eliminación contactando con nosotros.</p>
  <h2>5. Contacto</h2>
  <p>Dudas de privacidad: <!-- TODO: email de contacto --> [email].</p>
</LegalLayout>
```

- [ ] **Step 6: Verify + build + commit**

Run: `npm run build`
Expected: build passes; `dist/terms/index.html`, `dist/privacy/index.html`, and `/es/` equivalents exist. Footer legal links resolve correctly per locale.

```bash
git add -A
git commit -m "feat: Terms and Privacy legal pages (EN + ES) with placeholder copy"
```

---

### Task 11: SEO assets, OG image, favicon, README, CLAUDE.md, push

**Files:**
- Create: `public/og-image.png` (copied from icon as a stopgap)
- Create: `README.md`
- Create: `CLAUDE.md`
- Verify: sitemap generation

**Interfaces:**
- Produces: deploy-ready `dist/` with sitemap, OG image, docs, and an initial GitHub push.

- [ ] **Step 1: Create a stopgap OG image**

```bash
cp src/assets/inkprep-icon.png public/og-image.png
```
(A proper 1200×630 OG image is a later polish item; this keeps tags valid.)

- [ ] **Step 2: Create `README.md`**

````markdown
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
````

- [ ] **Step 3: Create `CLAUDE.md`**

```markdown
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
```

- [ ] **Step 4: Verify full build + sitemap**

Run: `npm run build`
Expected: build passes; `dist/sitemap-index.xml` and `dist/sitemap-0.xml` exist and include `/`, `/es/`, `/terms`, `/privacy`, `/es/terms`, `/es/privacy`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: SEO assets, OG image, README, and CLAUDE.md"
```

- [ ] **Step 6: Push to GitHub** (only after user confirms — see handoff)

```bash
git push -u origin main
```
Expected: branch `main` pushed to `github.com/Guillegas/Inkprep-Web`.

---

### Task 12: Final verification pass

**Files:** none (verification only).

- [ ] **Step 1: Production preview**

Run:
```bash
npm run build && npm run preview
```
Open the preview URL.

- [ ] **Step 2: Checklist (verify each, fix any failure in the relevant task's files)**

- [ ] Pure-black background everywhere; glass cards + multicolor glows visible.
- [ ] Mobile layout correct at 390px: no horizontal scroll, readable type, tappable targets.
- [ ] All sections present and in order on `/` and `/es/`.
- [ ] Navbar turns glass on scroll; anchor links scroll to sections.
- [ ] Language switcher toggles EN↔ES on home and legal pages, preserving the page.
- [ ] App Store button shows "Coming soon" state (since `APP_STORE_AVAILABLE = false`).
- [ ] FAQ accordion opens/closes; `+` rotates.
- [ ] `/terms`, `/privacy` and `/es/` equivalents render with Navbar + Footer.
- [ ] No console errors; `prefers-reduced-motion` disables reveal animation.
- [ ] `dist/` contains all pages + `sitemap-index.xml` + `robots.txt` + `og-image.png`.

- [ ] **Step 3: Final commit if any fixes were made**

```bash
git add -A
git commit -m "fix: final verification adjustments"
```

---

## Self-Review Notes

- **Spec coverage:** Stack/i18n/deploy (Task 1, 9, 11) · tokens/glass/glow (Task 2) ·
  all 9 sections (Tasks 5–8) · legal pages (Task 10) · SEO/sitemap/OG (Tasks 2, 11) ·
  single App-Store-URL source (Task 2 config, used everywhere) · git init+push (already
  done + Task 11) · icons (Tasks 2, 6). All spec sections map to a task.
- **Placeholders:** the only `[date]`/`[email]`/TODO markers are in legal pages — these are
  spec §10 user-supplied content, explicitly flagged, not plan gaps.
- **Type consistency:** `Content` schema (Task 3) is the single shape consumed by every
  component; `getContent(lang)` and `Lang` names are consistent across all tasks;
  `APP_STORE_URL`/`APP_STORE_AVAILABLE` names consistent (config → AppStoreButton).
