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
