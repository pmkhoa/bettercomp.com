import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    // Matches the behavior of `sanity dev` which sets styled-components to use the fastest way of inserting CSS rules in both dev and production. It's default behavior is to disable it in dev mode.
    SC_DISABLE_SPEEDY: 'false',
  },

  /*
  async headers() {
    const headers = [];
    if (
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ||
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'dev'
    ) {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
        source: '/:path*',
      });
    }
    return headers;
  },
  */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
