import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/recruitment',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
