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
      {
        protocol: 'https',
        hostname: 'w7.pngwing.com',  // Existing hostname
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static-00.iconduck.com',  // Existing hostname
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',  // Add the new hostname here
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
