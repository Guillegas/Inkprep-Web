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
    headingPre: "Your design's exact ",
    headingEm1: "inks",
    headingMid: ", before you ",
    headingEm2: "tattoo",
  },
  showcase: {
    label: "SEE THE RESULTS",
    heading: "Your design, turned into a ready-to-use palette",
    body: "Upload a clean color design and Inkprep gives you the exact inks.",
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
      { title: "Upload your design", body: "Create a project and add a clean color design you made." },
      { title: "Choose your ink brands", body: "Tell Inkprep which brands you work with." },
      { title: "Set the client's skin tone", body: "Pick the skin tone so the palette fits the real result." },
      { title: "Get your palette", body: "Receive the exact pots to use for every color, and see where each ink goes on the design. Every project is saved to your history." },
    ],
  },
  features: {
    label: "FEATURES",
    heading: "Everything you need before the needle",
    items: [
      { title: "Exact ink recommendations", body: "Get the real pots that match each color in your design.", glow: "var(--color-ink-crimson)", emoji: "🎯" },
      { title: "Skin-tone aware", body: "Recommendations adjusted to your client's skin tone.", glow: "var(--color-ink-teal)", emoji: "🖐️" },
      { title: "Explore the ink catalog", body: "Browse 1100+ pots and filter by brand, color group or search.", glow: "var(--color-ink-amber)", emoji: "🧪" },
      { title: "Design loupe", body: "Slide your finger across the design to see the color in any area.", glow: "var(--color-ink-blue)", emoji: "🔍" },
      { title: "My inks", body: "Keep an inventory of the pots you actually own.", glow: "var(--color-ink-violet)", emoji: "💼" },
      { title: "Made for tablet", body: "Split view: your design and its palette side by side.", glow: "var(--color-ink-crimson)", emoji: "📱" },
    ],
  },
  brands: {
    label: "SUPPORTED BRANDS",
    heading: "Works with the brands you already use",
    caption: "6 brands · 1100+ pots catalogued",
  },
  input: {
    cleanEmoji: "🎨",
    cleanTitle: "Feed it your digital art",
    cleanBody:
      "Drop in the clean, color design you drew. Not camera photos, not pictures of finished tattoos. A sharp file in, real inks out.",
    accuracyEmoji: "🎯",
    accuracyTitle: "A guide, not a guarantee",
    accuracyBody:
      "Your palette is a professional starting point from color references. What lands on skin still depends on the ink, your technique, the client's skin and the lighting.",
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
  comingSoon: "Coming Soon",
  consent: {
    text: "We use privacy-friendly analytics to improve Inkprep. You can accept or decline.",
    accept: "Accept",
    reject: "Decline",
    privacyLabel: "Privacy Policy",
  },
};

export default en;
