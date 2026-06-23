export interface Step {
  title: string;
  body: string;
}
export interface Feature {
  title: string;
  body: string;
  glow: string; // CSS color var
  emoji: string;
}
export interface FaqItem {
  q: string;
  a: string;
}
export interface Content {
  meta: { title: string; description: string };
  nav: {
    how: string;
    features: string;
    brands: string;
    faq: string;
    download: string;
  };
  hero: { headingPre: string; headingEm1: string; headingMid: string; headingEm2: string };
  showcase: {
    label: string;
    heading: string;
    body: string;
  };
  problem: { label: string; heading: string; points: string[] };
  how: { label: string; heading: string; steps: Step[] };
  features: { label: string; heading: string; items: Feature[] };
  brands: { label: string; heading: string; caption: string };
  input: {
    cleanEmoji: string;
    cleanTitle: string;
    cleanBody: string;
    accuracyEmoji: string;
    accuracyTitle: string;
    accuracyBody: string;
  };
  faq: { label: string; heading: string; items: FaqItem[] };
  cta: { heading: string; sub: string };
  footer: {
    tagline: string;
    product: string;
    legal: string;
    support: string;
    terms: string;
    privacy: string;
    contact: string;
    rights: string;
  };
  comingSoon: string;
  consent: { text: string; accept: string; reject: string; privacyLabel: string };
}
