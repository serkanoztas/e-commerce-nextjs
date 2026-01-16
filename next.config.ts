import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  images: {
    domains: [
      "i.dummyjson.com",
      "cdn.dummyjson.com",
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
