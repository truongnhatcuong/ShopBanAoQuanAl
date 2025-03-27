/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    turbo: {
      cache: true,
      loaders: {}, // Bật Turbo Mode
    },
  },
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
