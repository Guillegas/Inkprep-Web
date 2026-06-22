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
