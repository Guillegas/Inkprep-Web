# Inkprep Landing — Repositioning Design Spec (v2)

**Date:** 2026-06-22
**Status:** Approved
**Supersedes the messaging/content of:** `2026-06-22-inkprep-landing-design.md` (the v1 stack/structure stays; this redefines audience, message, sections, and content).

## 1. Why this revision

The v1 site was built before the full app context was known. It wrongly framed Inkprep as an iOS app for tattoo *clients* with an "AI color analysis" angle. The real product is different and this spec corrects it.

## 2. What Inkprep actually is

**Tattoo Inkprep** is a professional tool for **COLOR tattoo ARTISTS** (Flutter, iOS now / Android later). A booth tool the artist consults before setting up, to know **which inks to use**.

- **Message = results, not mechanism.** Artists only care that it works and the palettes it returns on their designs. **Do NOT surface internals** on the web — no "LAB", no "Delta E", no "perceptual/deterministic pipeline", no "color science", and don't hype it as "AI". Frame everything as benefit + proof: upload a design, get the real inks (and mixes) that match it, fast and consistently. Promise utility, speed, confidence — not perfection. (Internally it is a deterministic color-match engine; that's background only, never copy.)
- **Input** = a **clean digital color design** (PNG/JPG/WEBP) the artist made. **Not** camera photos, **not** finished-tattoo photos.
- **Audience/copy** = color tattoo artists, esp. beginner/intermediate, who want confidence and to save prep time.

### User flow (for "How it works")
1. Create a project and upload a clean digital design.
2. Choose the ink **brand(s)** used.
3. Choose the client's **skin tone** (4–5 presets).
4. Tap Analyze.
5. Get a **palette**: the exact recommended **pot** per brand when there's a clear match, or a suggested **mix of 2 same-brand inks** at ratios **70/30, 50/50, 30/70** when no direct color is close enough — adjusted to skin tone.
6. Project is **saved to history**.

## 3. Platforms & CTA

**iOS only at launch** → show **only the App Store** button. Android is planned later: build config so a Google Play button can be enabled by setting one flag + URL. App Store URL stays a placeholder (`#`, non-functional, final look) until publish.

`src/config.ts` becomes:
- `APP_STORE_URL` (placeholder `#`), `APP_STORE_AVAILABLE = true`
- `PLAY_STORE_URL` (placeholder `#`), `PLAY_STORE_AVAILABLE = false` (flip when Android ships)
- `SUPPORT_EMAIL = "tattooinkprep@gmail.com"`
- `LEGAL_ENTITY = "Guillermo Andújar Martínez"` (data controller)

## 4. Information architecture (single page, mobile-first, 360px baseline)

1. **Navbar** — logo · How it works · Features · Brands · Pricing · FAQ · language · Download. (Mobile: hamburger glass menu — already built.)
2. **Hero** — H1 "Know exactly which inks to use before you start tattooing" / "Sabe exactamente qué tintas usar antes de empezar a tatuar"; subline naming the audience (color tattoo artists) and the value; **App Store button**; image (phone/tablet mockup placeholder). Centered, full-screen, as built.
3. **Results showcase** — visual proof it works: a clean design → the resulting palette (exact pots + a suggested 2-ink mix with its ratio). Shows the output on a design; no mechanism, no jargon. This is the key "it works" moment.
4. **Problem** — choosing inks & mixes is done by eye, from experience and color cards; Inkprep makes it fast and reliable, with results you can trust.
5. **How it works** — 4 steps (per §2 flow): upload clean design → choose brand(s) → choose skin tone → get palette (exact pots + 2-ink mixes at ratios), saved to history.
6. **Features** — glass cards, benefit-framed (no internals): get the real inks that match each color in your design; suggested 2-ink mixes with exact ratios when there's no direct match; results adjusted to the client's skin tone; explorable ink catalog (filter by brand/color group/search); color "loupe" to inspect any color; project history + favorites; **"My inks"** personal inventory (Pro); **tablet split view** (design + palette side by side); ES/EN.
7. **Supported brands** — the 6 V1 brands with logos on **light/white rounded tiles** (their native logos use dark text/fills that vanish on black, so tiles are required): Eternal Ink, Intenze, Dermaglo, World Famous, Radiant, Solid Ink. Caption: **6 brands · 1100+ pots catalogued (hex + LAB)**. Logo assets in `src/assets/brands/`.
8. **Input + accuracy disclaimer** — clarify input = clean digital color design, **not photos**; honest disclaimer: the recommendation is a professional guide based on color references; the real result depends on skin, ink, technique and lighting.
9. **Pricing / subscription** — generic, **no hard numbers**: monthly & annual subscription, possible free trial, Pro features ("My inks"); price is set by the App Store; CTA to download. Managed via RevenueCat (no need to surface that to users).
10. **FAQ** — updated: Is it AI? / Which platforms (iOS now, Android later)? / Does it work with photos? / Color only? / Which brands? / How accurate? / Free trial & cancel?
11. **Final CTA** — download (App Store).
12. **Footer** — wordmark, product links, **Support / Privacy / Terms**, language, contact email.

### Standalone pages (stable URLs, ES+EN, app links to these from paywall/settings)
- `/privacy` + `/es/privacy`
- `/terms` + `/es/terms`
- `/support` + `/es/support` (NEW)

## 5. Legal content (real, not lorem; with named placeholders only where the user must finalize)

**Privacy Policy** must cover: data collected (account/email via Google/Apple OAuth, uploaded designs, usage/project data, subscription data via RevenueCat/stores); purpose & legal basis; processors named — **Supabase** (auth, Postgres, image storage bucket "designs"), **RevenueCat** (subscriptions), **Apple/Google** (login & payments); where data/images are stored; user rights (access, rectification, erasure, portability); how to request account+data deletion (app has "delete account"); data controller contact = **Guillermo Andújar Martínez**, **tattooinkprep@gmail.com**. GDPR/RGPD (Spain/EU).

**Terms** must cover: service description and that it is a **support tool**, not medical advice nor a guarantee of tattoo result; clear **limitation of liability** (final result depends on the professional; the app only suggests color references); IP — uploaded designs remain the artist's, with a limited license to process them to provide the service; subscription terms — auto-renewal, cancel via store, refunds via Apple/Google; acceptable use and termination.

**Support page** — contact email, what to include in a request, links to Privacy/Terms, account-deletion instructions.

`Last updated` date and any company/address details remain `[placeholders]` for the user to finalize.

## 6. Analytics & cookie consent (GDPR)

- Add analytics **gated by consent**. Recommended provider: **Plausible** (cookieless, EU-hosted) — but implementation is provider-agnostic: a config switch (`ANALYTICS_ENABLED`, `ANALYTICS_DOMAIN`/snippet) and a `ConsentBanner` component.
- **ConsentBanner**: GDPR-compliant — analytics script loads **only after** the user accepts; Accept/Reject; choice persisted in `localStorage`; reject = no tracking. Banner styled in the site's glass aesthetic, dismissible, accessible.
- If/when a non-cookieless provider (e.g. GA4) is chosen, the same consent gate applies.

## 7. Non-goals (do NOT put on the web)

- No black & grey / fine line (color only). No analyzing real/finished-tattoo photos. No ink-quantity estimate. No design editing/chat/personalized learning. No hardcoded prices. No Android button yet.

## 8. Success criteria

- Copy is artist-facing and **results-focused**: no internals (no LAB/ΔE/"perceptual"/"color science"), no "AI" hype. Bilingual EN/ES, all in `src/i18n`.
- App Store-only CTA; Google Play addable via one flag.
- Brands section shows 6 logos legibly (light tiles).
- Pricing section is generic (no numbers).
- `/privacy`, `/terms`, `/support` exist in EN+ES with real, complete content (named placeholders only where user must finalize).
- Consent banner gates analytics; no tracking before consent.
- Builds to static `dist/`; mobile-first correct at 360px.
