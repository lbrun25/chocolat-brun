/** @type {import('next').NextConfig} */
const nextConfig = {
  // images.domains est déprécié en Next.js 16 ; remotePatterns si nécessaire
  turbopack: {
    root: __dirname,
  },
}

module.exports = nextConfig



