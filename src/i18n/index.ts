import en from "./en";
import es from "./es";
import type { Content } from "./types";

export type Lang = "en" | "es";

export function getContent(lang: Lang): Content {
  return lang === "es" ? es : en;
}

export type { Content };
