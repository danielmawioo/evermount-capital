import type { Locale } from "../locales";
import type { Messages } from "../types";
import { siteAr, siteDe, siteEn, siteEs, siteFr, siteNl } from "../copy";
import { ar } from "./ar";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { nl } from "./nl";

export type { Messages } from "../types";

export const messages: Record<Locale, Messages> = {
  en: { ...en, ...siteEn },
  fr: { ...fr, ...siteFr },
  es: { ...es, ...siteEs },
  de: { ...de, ...siteDe },
  nl: { ...nl, ...siteNl },
  ar: { ...ar, ...siteAr },
};
