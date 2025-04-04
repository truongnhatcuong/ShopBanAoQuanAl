/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.vietqr.io",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {},
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
