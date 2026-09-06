import type { Metadata } from "next";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = `https://www.evermount.co${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "Evermount",
      title: `${title} | Evermount`,
      description,
      images: [
        {
          url: "https://www.evermount.co/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Evermount`,
      description,
      images: ["https://www.evermount.co/og-image.png"],
    },
  };
}
