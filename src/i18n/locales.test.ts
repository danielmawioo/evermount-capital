import { localeFromBrowser, isLocale } from "./locales";

describe("locales", () => {
  it("accepts supported locale codes", () => {
    expect(isLocale("de")).toBe(true);
    expect(isLocale("nl")).toBe(true);
    expect(isLocale("pt")).toBe(false);
  });

  it("maps browser language prefixes to supported locales", () => {
    expect(localeFromBrowser("de-DE")).toBe("de");
    expect(localeFromBrowser("nl-NL")).toBe("nl");
    expect(localeFromBrowser("fr-FR")).toBe("fr");
    expect(localeFromBrowser("es-MX")).toBe("es");
    expect(localeFromBrowser("sv-SE")).toBe("en");
  });
});
