import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Standalone output только для production (Vercel) - убираем для локальной разработки
  ...(process.env.NODE_ENV === 'production' ? { output: 'standalone' as const } : {}),
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Optimize for Vercel
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
