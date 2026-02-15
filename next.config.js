/** @type {import('next').NextConfig} */
const nextConfig = {
  // images.domains est déprécié en Next.js 16 ; remotePatterns si nécessaire
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      // Éviter 404 favicon.ico - rediriger vers l'icône du logo
      { source: '/favicon.ico', destination: '/images/logo.png', permanent: false },
    ]
  },
}

module.exports = nextConfig



