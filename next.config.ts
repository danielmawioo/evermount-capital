/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "export", // For static site generation
  images: {
    unoptimized: true, // Required for static export with <Image>
    domains: ["evermount.co"],
  },
};

module.exports = nextConfig;
