/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["your-api-domain.com"], // optional: for optimized images from API
  },
};

module.exports = nextConfig;
