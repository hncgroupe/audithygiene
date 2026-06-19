/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // audithygiene.com → audithygiene.fr (301)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'audithygiene.com' }],
        destination: 'https://audithygiene.fr/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.audithygiene.com' }],
        destination: 'https://audithygiene.fr/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
