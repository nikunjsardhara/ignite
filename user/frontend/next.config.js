/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "img.freepik.com",
      "mdbcdn.b-cdn.net",
      "cdn-icons-png.flaticon.com",
      "placeimg.com",
    ]
  }
};

module.exports = nextConfig;
