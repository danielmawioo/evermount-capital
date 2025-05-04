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
  output: "export", // <-- Added to fix static export issue
};

module.exports = nextConfig;
