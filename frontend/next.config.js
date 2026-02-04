/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  env: {
    SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  optimizeFonts: false,
  async redirects() {
    return [
      {
        source: '/check-in',
        destination: process.env.CHECKIN_REDIRECT || '/',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
