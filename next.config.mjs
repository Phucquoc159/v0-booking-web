/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'async_hooks': false,
        'node:async_hooks': false,
      };
    }
    
    config.externals = [...(config.externals || []), '@prisma/client'];
    
    return config
  },
}
export default nextConfig
