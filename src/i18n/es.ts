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
