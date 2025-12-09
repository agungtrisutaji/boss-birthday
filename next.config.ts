import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
