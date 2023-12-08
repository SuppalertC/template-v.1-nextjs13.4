/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    appDir: true,
    typedRoutes: true,
  },

  //   typescript: {
  // //     // !! WARN !!
  // //     // Dangerously allow production builds to successfully complete even if
  // //     // your project has type errors.
  // //     // !! WARN !!
  // //     ignoreBuildErrors: true,
  // //   },
};

module.exports = nextConfig;
