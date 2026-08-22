/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lint already runs as its own blocking CI step (deploy.yml); keep the
  // build gated on it too so a misconfigured/skipped CI step can't ship.
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Removed "output: export" to enable API routes for chat functionality
  // If you need static export, you'll need to use a different approach for the chat API
  images: {
    domains: ["evermount.co"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
