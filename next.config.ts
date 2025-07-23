import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
   webpack: (config, { isServer }) => {
    // Add a rule to handle the .node files
    config.module.rules.push({
      test: /\.node$/,
      use: 'raw-loader',
    });

    // Exclude 'canvas' from being processed by Next.js on the server
    if (isServer) {
      config.externals.push('canvas');
    }
    
    config.externals.push('p5');


    return config;
  },
};

export default nextConfig;
