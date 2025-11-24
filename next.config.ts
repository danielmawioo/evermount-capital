/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Removed "output: export" to enable API routes for chat functionality
  // If you need static export, you'll need to use a different approach for the chat API
  images: {
    domains: ["evermount.co"],
  },
};

module.exports = nextConfig;
