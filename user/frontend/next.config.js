/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com","img.freepik.com"]
  }
};

module.exports = nextConfig;
