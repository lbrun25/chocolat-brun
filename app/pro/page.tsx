'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Building2, Coffee, Hotel, Briefcase, Package, Truck, Sparkles, Users } from 'lucide-react'

const avantagesPro = [
  {
    icon: <Coffee className="w-12 h-12 text-chocolate-dark" />,
    title: 'Pour les cafés et restaurants',
    description: 'Offrez à vos clients une pause gourmande avec nos napolitains artisanaux. Parfait pour accompagner vos boissons chaudes.',
  },
  {
    icon: <Hotel className="w-12 h-12 text-chocolate-dark" />,
    title: 'Pour les hôtels',
    description: 'Accueillez vos clients avec élégance. Nos napolitains font le parfait cadeau de bienvenue ou pour les chambres.',
  },
  {
    icon: <Briefcase className="w-12 h-12 text-chocolate-dark" />,
    title: 'Pour les entreprises',
    description: 'Cadeaux d\'affaires personnalisés, pauses gourmandes pour vos équipes. Emballage sur mesure avec votre logo possible.',
  },
  {
    icon: <Package className="w-12 h-12 text-chocolate-dark" />,
    title: 'Emballage personnalisé',
    description: 'Possibilité d\'emballage sur mesure avec votre logo et vos couleurs pour renforcer votre image de marque.',
  },
  {
    icon: <Truck className="w-12 h-12 text-chocolate-dark" />,
    title: 'Livraison professionnelle',
    description: 'Service de livraison adapté à vos besoins professionnels avec suivi et flexibilité des dates.',
  },
  {
    icon: <Sparkles className="w-12 h-12 text-chocolate-dark" />,
    title: 'Fabrication artisanale',
    description: 'Qualité premium garantie avec un savoir-faire traditionnel depuis 1999. Chaque napolitain est fabriqué à la main.',
  },
]

export default function ProPage() {
  return (
    <div className="min-h-screen artisan-texture">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-chocolate-dark via-chocolate-dark/95 to-chocolate-dark/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-chocolate-light/10 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Contenu texte */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-4"
              >
                <span className="text-sm md:text-base font-semibold text-chocolate-light/80 uppercase tracking-wider">
                  Solutions professionnelles
                </span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-chocolate-light mb-6 font-serif leading-tight">
                Napolitains artisanaux
                <br />
                <span className="text-chocolate-medium">pour professionnels</span>
              </h1>
              
              <p className="text-lg md:text-xl text-chocolate-light/90 mb-4 font-sans leading-relaxed">
                Des solutions sur mesure pour cafés, restaurants, hôtels et entreprises
              </p>
              
              <p className="text-base md:text-lg text-chocolate-light/80 font-sans mb-8">
                Depuis 1999, nous accompagnons les professionnels avec des napolitains artisanaux de qualité, 
                des emballages personnalisés et un service adapté à vos besoins.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/devis"
                  className="group inline-flex items-center justify-center bg-chocolate-light text-chocolate-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-light/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Demander un devis
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/prix"
                  className="inline-flex items-center justify-center bg-transparent border-2 border-chocolate-light text-chocolate-light px-8 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-light hover:text-chocolate-dark transition-all duration-300"
                >
                  Voir les tarifs
                </Link>
              </div>
            </motion.div>

            {/* Image du sachet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="relative h-[400px] md:h-[500px] lg:h-[600px]"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div 
                  className="absolute inset-0 rounded-full blur-3xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(245, 230, 200, 0.2) 0%, transparent 70%)'
                  }}
                />
                
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                  className="relative z-10 w-full h-full max-w-md md:max-w-lg lg:max-w-xl mx-auto"
                >
                  <div className="relative w-full h-full drop-shadow-2xl">
                    <Image
                      src="/images/chocolat_sachet_transparent_bg.png"
                      alt="Sachet de napolitains artisanaux Cédric BRUN"
                      fill
                      className="object-contain"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Avantages Pro */}
      <section className="py-16 md:py-20 relative overflow-hidden bg-chocolate-light/30">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-chocolate-dark mb-4 font-serif">
              Pourquoi choisir nos napolitains ?
            </h2>
            <p className="text-lg md:text-xl text-chocolate-dark/70 font-sans max-w-2xl mx-auto">
              Des solutions adaptées à chaque secteur professionnel
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {avantagesPro.map((avantage, index) => (
              <motion.div
                key={avantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 hover:shadow-xl transition-all border border-chocolate-dark/10"
              >
                <div className="flex justify-center mb-4 text-chocolate-dark">{avantage.icon}</div>
                <h3 className="text-xl font-bold text-chocolate-dark mb-3 font-serif text-center">
                  {avantage.title}
                </h3>
                <p className="text-chocolate-dark/70 font-sans text-center">
                  {avantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Tarifs dégressifs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-chocolate-dark mb-4 font-serif">
                Tarifs professionnels
              </h2>
              <p className="text-lg md:text-xl text-chocolate-dark/70 font-sans">
                Des prix compétitifs pour vos commandes professionnelles
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-chocolate-light/40 via-chocolate-light/30 to-chocolate-light/40 rounded-2xl shadow-xl border border-chocolate-dark/10 p-8 md:p-10"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                    Conditionnements disponibles
                  </h3>
                  <ul className="space-y-3 text-chocolate-dark/80 font-sans">
                    <li className="flex items-start">
                      <span className="text-chocolate-medium mr-3 text-xl">•</span>
                      <span><strong className="text-chocolate-dark">100 pièces</strong> (500 g) - Parfait pour tester ou petites commandes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-chocolate-medium mr-3 text-xl">•</span>
                      <span><strong className="text-chocolate-dark">200 pièces</strong> (1000 g) - Idéal pour les commandes régulières</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-chocolate-medium mr-3 text-xl">•</span>
                      <span><strong className="text-chocolate-dark">Commandes sur mesure</strong> - Pour les volumes importants, tarifs dégressifs disponibles</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-chocolate-dark/20">
                  <h3 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                    Services professionnels
                  </h3>
                  <ul className="space-y-3 text-chocolate-dark/80 font-sans">
                    <li className="flex items-start">
                      <span className="text-chocolate-medium mr-3 text-xl">•</span>
                      <span><strong className="text-chocolate-dark">Emballage personnalisé</strong> avec votre logo et vos couleurs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-chocolate-medium mr-3 text-xl">•</span>
                      <span><strong className="text-chocolate-dark">Livraison professionnelle</strong> avec suivi et flexibilité des dates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-chocolate-medium mr-3 text-xl">•</span>
                      <span><strong className="text-chocolate-dark">Accompagnement personnalisé</strong> pour vos projets et événements</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-chocolate-medium mr-3 text-xl">•</span>
                      <span><strong className="text-chocolate-dark">Facturation professionnelle</strong> avec devis et factures détaillées</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-chocolate-dark text-chocolate-light">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Building2 className="w-16 h-16 mx-auto mb-6 text-chocolate-medium" />
            <h2 className="text-4xl font-bold mb-6 font-serif">
              Prêt à passer commande ?
            </h2>
            <p className="text-xl mb-8 text-chocolate-light/90 font-sans max-w-2xl mx-auto">
              Demandez un devis personnalisé adapté à vos besoins professionnels. 
              Nous vous répondrons dans les plus brefs délais avec une proposition sur mesure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/devis"
                className="inline-block bg-chocolate-light text-chocolate-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-light/90 transition-colors shadow-lg hover:shadow-xl hover:scale-105"
              >
                Demander un devis
              </Link>
              <Link
                href="/prix"
                className="inline-block bg-transparent border-2 border-chocolate-light text-chocolate-light px-8 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-light hover:text-chocolate-dark transition-all duration-300"
              >
                Voir les tarifs détaillés
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
