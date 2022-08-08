/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 画像パスを通すときに必要
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;
