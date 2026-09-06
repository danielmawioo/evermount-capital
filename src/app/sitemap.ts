import type { MetadataRoute } from "next";

const BASE_URL = "https://www.evermount.co";

const routes = [
  "",
  "/platform",
  "/infrastructure",
  "/markets",
  "/institutions",
  "/developers",
  "/research",
  "/technology",
  "/pricing",
  "/analytics",
  "/platform-tour",
  "/about",
  "/careers",
  "/partners",
  "/book-demo",
  "/terms",
  "/privacy",
  "/cookie-policy",
  "/risk-disclosure",
  "/data-policy",
  "/api-terms",
  "/aml-policy",
  "/regulatory-compliance",
  "/conflict-of-interest",
  "/best-execution",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
