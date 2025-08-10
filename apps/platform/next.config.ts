import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      //TODO: This host is only for mock data. Replace it with your actual host.
      {
        protocol: 'https',
        hostname: 'framebyframe-dev.s3.ap-south-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
