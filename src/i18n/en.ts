import type { Content } from "./types";

const en: Content = {
  meta: {
    title: "Inkprep: Know exactly which inks to use before you tattoo",
    description:
      "Inkprep is the iOS app for color tattoo artists: upload a clean design and get the exact inks to use, adjusted to your client's skin tone.",
  },
  nav: {
    how: "How it works",
    features: "Features",
    brands: "Brands",
    faq: "FAQ",
    download: "Download",
  },
  hero: {
    heading: "Know exactly which inks to use before you start",
    headingEm: "tattooing",
  },
  showcase: {
    label: "SEE THE RESULTS",
    heading: "Your design, turned into a ready-to-use palette",
    body: "Upload a clean color design and Inkprep gives you the exact inks to use for every color.",
  },
  problem: {
    label: "WHY INKPREP",
    heading: "Eyeballing colors is costly",
    points: [
      "Time wasted picking the palette by hand.",
      "Colors shift depending on skin tone.",
      "Ink wasted on test mixes.",
    ],
  },
  how: {
    label: "HOW IT WORKS",
    heading: "From design to inks in four steps",
    steps: [
      { title: "Upload your design", body: "Create a project and add a clean color design you made (PNG, JPG or WEBP)." },
      { title: "Choose your ink brands", body: "Tell Inkprep which brands you work with." },
      { title: "Set the client's skin tone", body: "Pick the skin tone so the palette fits the real result." },
      { title: "Get your palette", body: "Receive the exact pots to use for every color. Every project is saved to your history." },
    ],
  },
  features: {
    label: "FEATURES",
    heading: "Everything you need before the needle",
    items: [
      { title: "Exact ink recommendations", body: "Get the real pots that match each color in your design.", glow: "var(--color-ink-crimson)" },
      { title: "Fast and consistent", body: "Get a clear palette in seconds, the same way every time.", glow: "var(--color-ink-violet)" },
      { title: "Skin-tone aware", body: "Recommendations adjusted to your client's skin tone.", glow: "var(--color-ink-teal)" },
      { title: "Explore the ink catalog", body: "Browse 1100+ pots and filter by brand, color group or search.", glow: "var(--color-ink-amber)" },
      { title: "Color loupe", body: "Tap any color to inspect it in detail.", glow: "var(--color-ink-blue)" },
      { title: "Projects & favorites", body: "Every analysis is saved to your history, with favorites.", glow: "var(--color-ink-crimson)" },
      { title: "My inks (Pro)", body: "Keep an inventory of the pots you actually own.", glow: "var(--color-ink-violet)" },
      { title: "Made for tablet", body: "Split view: your design and its palette side by side.", glow: "var(--color-ink-teal)" },
    ],
  },
  brands: {
    label: "SUPPORTED BRANDS",
    heading: "Works with the brands you already use",
    caption: "6 brands · 1100+ pots catalogued",
  },
  input: {
    label: "GOOD TO KNOW",
    heading: "Designed for clean digital designs",
    body: "Inkprep works with clean, color digital designs you created, not camera photos or pictures of finished tattoos.",
    disclaimerTitle: "About accuracy",
    disclaimer:
      "Recommendations are a professional guide based on color references. The final result on skin depends on the ink, the technique, the client's skin and the lighting.",
  },
  faq: {
    label: "FAQ",
    heading: "Questions, answered",
    items: [
      { q: "Does it work with photos of tattoos?", a: "No. Inkprep is for clean, color digital designs you made, not camera photos or finished-tattoo pictures." },
      { q: "Is it only for color tattoos?", a: "Yes. Inkprep is built for color work." },
      { q: "Which platforms is it on?", a: "Inkprep is on iPhone now. Android is coming later." },
      { q: "Which ink brands are supported?", a: "Eternal Ink, Intenze, Dermaglo, World Famous, Radiant and Solid Ink, with 1100+ pots." },
      { q: "How accurate are the recommendations?", a: "They're a reliable professional guide. The real result also depends on ink, technique, skin and lighting." },
      { q: "How do I manage my subscription?", a: "Manage or cancel your subscription anytime from your App Store account." },
    ],
  },
  cta: {
    heading: "Set up your next tattoo with confidence",
    sub: "Download Inkprep and know your inks before you start.",
  },
  footer: {
    tagline: "Know your inks before you start.",
    product: "Product",
    legal: "Legal",
    support: "Support",
    terms: "Terms",
    privacy: "Privacy",
    contact: "Contact",
    rights: "All rights reserved.",
  },
  comingSoon: "Coming soon to the App Store",
  consent: {
    text: "We use privacy-friendly analytics to improve Inkprep. You can accept or decline.",
    accept: "Accept",
    reject: "Decline",
    privacyLabel: "Privacy Policy",
  },
};

export default en;
