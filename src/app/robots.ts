import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
          "/verify-email",
          "/dashboard",
          "/api",
          "/test",
          "/dev",
          "/drafts",
        ],
      },
    ],
    sitemap: "https://www.evermount.co/sitemap.xml",
  };
}
