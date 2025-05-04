/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["evermount.co"],
  },
  output: "export", // ✅ Required for static export
};

module.exports = nextConfig;
