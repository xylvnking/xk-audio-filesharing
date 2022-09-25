/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'images.unsplash.com', 'upload.wikimedia.org']
  }
}

module.exports = nextConfig
