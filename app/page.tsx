'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import NapolitainCard from '@/components/NapolitainCard'
import SafeImage from '@/components/SafeImage'

// Import dynamique pour éviter les erreurs SSR avec Three.js
const ChocolateWrapper3D = dynamic(() => import('@/components/ChocolateWrapper3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse text-chocolate-dark/50">Chargement 3D...</div>
    </div>
  ),
})

const napolitains = [
  {
    name: 'Chocolat noir au café',
    description: 'Un chocolat noir intense sublimé par des notes de café finement torréfié, offrant une dégustation profonde et élégante.',
    notes: 'Cacao intense • Café torréfié • Légère amertume',
    ingredients: 'Fèves de cacao, sucre, beurre de cacao, café, émulsifiant : lécithine de tournesol, vanille naturelle.',
    imageSrc: '/images/chocolat noir café .JPG',
    fallbackSrc: '/images/napolitain-cafe.svg',
    imageAlt: 'Napolitain chocolat noir au café',
  },
  {
    name: 'Chocolat noir',
    description: 'Un chocolat noir pur et équilibré, révélant toute la richesse aromatique du cacao dans une dégustation authentique et raffinée.',
    notes: 'Cacao puissant • Notes boisées • Finale longue',
    ingredients: 'Fèves de cacao, sucre, beurre de cacao, émulsifiant : lécithine de tournesol, vanille naturelle.',
    imageSrc: '/images/chocolat noir café .JPG',
    fallbackSrc: '/images/napolitain-noir.svg',
    imageAlt: 'Napolitain chocolat noir',
  },
  {
    name: 'Chocolat au lait',
    description: 'Un chocolat au lait fondant et généreux, alliant douceur lactée et intensité cacaotée dans un parfait équilibre.',
    notes: 'Lait • Cacao • Douceur gourmande',
    ingredients: 'Sucre, beurre de cacao, fèves de cacao, lait entier en poudre, émulsifiant : lécithine de tournesol, vanille naturelle.',
    imageSrc: '/images/chocolat au lait.JPG',
    fallbackSrc: '/images/napolitain-lait.svg',
    imageAlt: 'Napolitain chocolat au lait',
  },
  {
    name: 'Chocolat blanc',
    description: 'Un chocolat blanc onctueux et délicat, aux notes de lait frais et de vanille naturelle, pour une dégustation tout en douceur.',
    notes: 'Lait frais • Vanille • Rondeur',
    ingredients: 'Sucre, beurre de cacao, lait entier en poudre, émulsifiant : lécithine de tournesol, vanille naturelle.',
    imageSrc: '/images/chocolat blanc.JPG',
    fallbackSrc: '/images/napolitain-blanc.svg',
    imageAlt: 'Napolitain chocolat blanc',
  },
  {
    name: 'Chocolat Dulcey',
    description: 'Un chocolat blond aux saveurs uniques de biscuit et de caramel, signature d\'une gourmandise intense et raffinée.',
    notes: 'Biscuit • Caramel • Céréales toastées',
    ingredients: 'Beurre de cacao, sucre, lait entier et écrémé en poudre, lactosérum (lait), beurre (lait), émulsifiant : lécithine de tournesol, vanille naturelle.',
    imageSrc: '/images/chocolat dulcey .JPG',
    fallbackSrc: '/images/napolitain-dulcey.svg',
    imageAlt: 'Napolitain chocolat Dulcey',
  },
]

export default function Home() {
  return (
    <div className="artisan-texture">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-chocolate-light to-chocolate-light/80">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center md:text-left"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-chocolate-dark mb-6 font-serif">
                Napolitains Artisanaux
                <br />
            
              </h1>
              <p className="text-xl text-chocolate-dark/80 mb-8 font-sans">
                Fabrication artisanale à Charquemont depuis 1999
              </p>
              <Link
                href="/prix"
                className="inline-block bg-chocolate-dark text-chocolate-light px-8 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-dark/90 transition-colors shadow-lg mb-8"
              >
                Voir nos assortiments
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="relative h-96 md:h-[500px]"
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <ChocolateWrapper3D />
              </div>
            </motion.div>
          </div>
          
          {/* Phrase d'accroche */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="mt-12 text-center max-w-4xl mx-auto"
          >
            <p className="text-[18px] md:text-[20px] lg:text-[22px] text-black leading-relaxed font-bold italic relative px-8 font-sans">
              <span className="text-chocolate-dark/60 text-lg md:text-xl">✦</span>
              <span className="mx-2">Parce que le plaisir se partage, nos napolitains artisanaux subliment vos pauses, créent des sourires et donnent à chaque moment du quotidien une saveur unique et réconfortante.</span>
              <span className="text-chocolate-dark/60 text-lg md:text-xl">✦</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section : Qu'est-ce qu'un napolitain ? */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-chocolate-dark mb-6 font-serif">
              Qu'est-ce qu'un napolitain ?
            </h2>
            <div className="space-y-4 text-lg text-chocolate-dark/80 font-sans">
              <p>
                Le napolitain est un petit carré de chocolat de <strong>5 grammes</strong>, 
                parfait pour accompagner votre café ou votre thé.
              </p>
              <p>
                Idéal pour les <strong>cafés, restaurants, hôtels, entreprises</strong> ou 
                comme <strong>cadeau d'affaires</strong>, nos napolitains sont fabriqués 
                artisanalement avec une sélection rigoureuse de chocolats fins.
              </p>
              <p>
                Chaque pièce est le fruit d'un savoir-faire traditionnel, transmis depuis 
                des générations, pour vous offrir une expérience gustative unique.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section : Nos goûts disponibles */}
      <section className="py-20 bg-chocolate-light/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-chocolate-dark mb-4 font-serif">
              Nos goûts disponibles
            </h2>
            <p className="text-xl text-chocolate-dark/70 font-sans">
              Découvrez notre gamme de napolitains artisanaux
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {napolitains.map((napolitain, index) => (
              <NapolitainCard
                key={napolitain.name}
                name={napolitain.name}
                description={napolitain.description}
                notes={napolitain.notes}
                ingredients={napolitain.ingredients}
                imageSrc={napolitain.imageSrc}
                fallbackSrc={napolitain.fallbackSrc}
                imageAlt={napolitain.imageAlt}
                delay={index * 0.1}
              />
            ))}
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
            <h2 className="text-4xl font-bold mb-6 font-serif">
              Prêt à commander ?
            </h2>
            <p className="text-xl mb-8 text-chocolate-light/90 font-sans">
              Demandez un devis personnalisé pour vos besoins professionnels ou particuliers
            </p>
            <Link
              href="/devis"
              className="inline-block bg-chocolate-light text-chocolate-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-light/90 transition-colors shadow-lg"
            >
              Demander un devis
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

