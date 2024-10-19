/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'shop.realmadrid.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
