/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // A few of msw's transitive deps (rettime, until-async,
  // @open-draft/deferred-promise) ship ESM-only with no "require" export
  // condition. next/jest only transforms node_modules packages listed here
  // (see next/dist/build/jest/jest.js), so without this, Jest can't parse
  // them when the one MSW integration test (deposits.integration.test.ts)
  // pulls in src/mocks/server.ts. msw itself is dev-only / dynamically
  // imported (src/mocks/init.ts), so this has no effect on production
  // bundles that never import it.
  transpilePackages: [
    "msw",
    "@mswjs/interceptors",
    "@open-draft/deferred-promise",
    "@open-draft/logger",
    "@open-draft/until",
    "rettime",
    "until-async",
    "headers-polyfill",
    "outvariant",
    "strict-event-emitter",
    "is-node-process",
  ],
  // Removed "output: export" to enable API routes for chat functionality
  // If you need static export, you'll need to use a different approach for the chat API
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "evermount.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/investor-tour",
        destination: "/platform-tour",
        permanent: true,
      },
      {
        source: "/portfolio-insights",
        destination: "/analytics",
        permanent: true,
      },
      {
        source: "/capital",
        destination: "/institutions",
        permanent: true,
      },
      {
        source: "/features",
        destination: "/platform",
        permanent: true,
      },
      {
        source: "/investment-agreement",
        destination: "/terms",
        permanent: true,
      },
    ];
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
