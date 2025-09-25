import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  output: "standalone",
};

export default nextConfig;

