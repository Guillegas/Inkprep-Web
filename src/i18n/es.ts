import type { Content } from "./types";

const es: Content = {
  meta: {
    title: "Inkprep: Sabe qué tintas usar antes de empezar a tatuar",
    description:
      "Inkprep es la app iOS para tatuadores a color: sube un diseño limpio y obtén las tintas exactas que usar, ajustadas al tono de piel de tu cliente.",
  },
  nav: {
    how: "Cómo funciona",
    features: "Características",
    brands: "Marcas",
    faq: "Preguntas",
    download: "Descargar",
  },
  hero: {
    heading: "Las tintas exactas para tu diseño, listas antes de",
    headingEm: "tatuar",
  },
  showcase: {
    label: "VE LOS RESULTADOS",
    heading: "Tu diseño, convertido en una paleta lista para usar",
    body: "Sube un diseño a color limpio e Inkprep te da las tintas exactas que usar para cada color.",
  },
  problem: {
    label: "POR QUÉ INKPREP",
    heading: "Calcular los colores a ojo sale caro",
    points: [
      "Tiempo perdido eligiendo la paleta a mano.",
      "Los colores cambian según el tono de piel.",
      "Tinta desperdiciada en mezclas de prueba.",
    ],
  },
  how: {
    label: "CÓMO FUNCIONA",
    heading: "Del diseño a las tintas en cuatro pasos",
    steps: [
      { title: "Sube tu diseño", body: "Crea un proyecto y añade un diseño a color limpio hecho por ti." },
      { title: "Elige tus marcas de tinta", body: "Indícale a Inkprep con qué marcas trabajas." },
      { title: "Indica el tono de piel", body: "Elige el tono de piel del cliente para que la paleta encaje con el resultado real." },
      { title: "Recibe tu paleta", body: "Obtén los botes exactos que usar para cada color y ve dónde va cada tinta en el diseño. Cada proyecto se guarda en tu historial." },
    ],
  },
  features: {
    label: "CARACTERÍSTICAS",
    heading: "Todo lo que necesitas antes de la aguja",
    items: [
      { title: "Recomendaciones exactas de tinta", body: "Obtén los botes reales que coinciden con cada color de tu diseño.", glow: "var(--color-ink-crimson)", emoji: "🎯" },
      { title: "Adaptado al tono de piel", body: "Recomendaciones ajustadas al tono de piel de tu cliente.", glow: "var(--color-ink-teal)", emoji: "🖐️" },
      { title: "Explora el catálogo de tintas", body: "Navega +1100 botes y filtra por marca, grupo de color o búsqueda.", glow: "var(--color-ink-amber)", emoji: "🧪" },
      { title: "Lupa de diseño", body: "Desliza el dedo por el diseño para ver el color de cada zona.", glow: "var(--color-ink-blue)", emoji: "🔍" },
      { title: "Mis tintas", body: "Lleva el inventario de los botes que realmente tienes.", glow: "var(--color-ink-violet)", emoji: "💼" },
      { title: "Hecho para tablet", body: "Vista dividida: tu diseño y su paleta a la vez.", glow: "var(--color-ink-crimson)", emoji: "📱" },
    ],
  },
  brands: {
    label: "MARCAS COMPATIBLES",
    heading: "Funciona con las marcas que ya usas",
    caption: "6 marcas · +1100 botes catalogados",
  },
  input: {
    cleanEmoji: "🎨",
    cleanTitle: "Dale tu arte digital",
    cleanBody:
      "Sube el diseño a color y limpio que dibujaste. No fotos de cámara ni de tatuajes terminados. Archivo nítido entra, tintas reales salen.",
    accuracyEmoji: "🎯",
    accuracyTitle: "Una guía, no una garantía",
    accuracyBody:
      "Tu paleta es un punto de partida profesional basado en referencias de color. Lo que queda en la piel depende de la tinta, tu técnica, la piel del cliente y la iluminación.",
  },
  faq: {
    label: "PREGUNTAS",
    heading: "Resolvemos tus dudas",
    items: [
      { q: "¿Funciona con fotos de tatuajes?", a: "No. Inkprep es para diseños digitales a color hechos por ti, no fotos de cámara ni de tatuajes terminados." },
      { q: "¿Solo sirve para tatuajes a color?", a: "Sí. Inkprep está pensado para trabajo a color." },
      { q: "¿En qué plataformas está?", a: "Inkprep está en iPhone ahora. Android llegará más adelante." },
      { q: "¿Qué marcas de tinta admite?", a: "Eternal Ink, Intenze, Dermaglo, World Famous, Radiant y Solid Ink, con +1100 botes." },
      { q: "¿Qué precisión tienen las recomendaciones?", a: "Son una guía profesional fiable. El resultado real también depende de la tinta, la técnica, la piel y la iluminación." },
      { q: "¿Cómo gestiono mi suscripción?", a: "Gestiona o cancela tu suscripción cuando quieras desde tu cuenta de la App Store." },
    ],
  },
  cta: {
    heading: "Prepara tu próximo tatuaje con seguridad",
    sub: "Descarga Inkprep y ten claras tus tintas antes de empezar.",
  },
  footer: {
    tagline: "Ten claras tus tintas antes de empezar.",
    product: "Producto",
    legal: "Legal",
    support: "Soporte",
    terms: "Términos",
    privacy: "Privacidad",
    contact: "Contacto",
    rights: "Todos los derechos reservados.",
  },
  comingSoon: "Próximamente",
  consent: {
    text: "Usamos analítica respetuosa con la privacidad para mejorar Inkprep. Puedes aceptar o rechazar.",
    accept: "Aceptar",
    reject: "Rechazar",
    privacyLabel: "Política de Privacidad",
  },
};

export default es;
