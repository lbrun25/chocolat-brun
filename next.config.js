/** @type {import('next').NextConfig} */
const nextConfig = {
  // images.domains est déprécié en Next.js 16 ; remotePatterns si nécessaire
  turbopack: {
    root: __dirname,
  },
  // En-têtes de sécurité : le site encaisse des paiements et affiche des pages
  // Stripe en redirection. On protège contre le détournement de cadre, le
  // reniflage de type MIME et la fuite de référent vers des tiers.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig



