import { Metadata } from 'next'
import IllustrationCard from '@/components/IllustrationCard'

const illustrations = [
  {
    src: '/images/Tasse + sachet chocolat.png',
    fallbackSrc: '/images/napolitain-tasse.svg',
    alt: 'Tasse de chocolat chaud et sachet de napolitains artisanaux',
  },
  {
    src: '/images/Logo avant cédric BRUN.png',
    fallbackSrc: '/images/logo-cacao.svg',
    alt: 'Logo Cédric Brun - Maître Artisan Pâtissier Chocolatier',
  },
  {
    src: '/images/Logo arrière .png',
    fallbackSrc: '/images/logo-cacao.svg',
    alt: 'Logo arrière Cédric Brun',
  },
  {
    src: '/images/Sachet chocolat .png',
    fallbackSrc: '/images/emballage-1.svg',
    alt: 'Sachet napolitain artisanal',
  },
  {
    src: '/images/sachet chocolat 1.png',
    fallbackSrc: '/images/emballage-2.svg',
    alt: 'Sachet napolitain chocolat',
  },
  {
    src: '/images/Sachet chocolat marron .png',
    fallbackSrc: '/images/emballage-1.svg',
    alt: 'Sachet napolitain chocolat marron',
  },
]

export const metadata: Metadata = {
  title: 'Galerie – Napolitains Chocolat BRUN',
  description: 'Découvrez nos illustrations et croquis de napolitains artisanaux, emballages et créations Chocolat BRUN.',
}

export default function GaleriePage() {
  return (
    <div className="min-h-screen bg-chocolate-light/30 py-20 paper-texture">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-chocolate-dark mb-4 font-serif">
            Galerie & Illustrations
          </h1>
          <p className="text-xl text-chocolate-dark/70 font-sans">
            Découvrez nos créations et croquis artisanaux
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {illustrations.map((illustration, index) => (
            <IllustrationCard
              key={index}
              src={illustration.src}
              fallbackSrc={illustration.fallbackSrc}
              alt={illustration.alt}
              delay={index * 0.1}
            />
          ))}
        </div>

        <div className="mt-12 text-center text-chocolate-dark/70">
          <p className="text-lg font-sans">
            Toutes nos illustrations reflètent l'âme artisanale et traditionnelle de Chocolat BRUN
          </p>
        </div>
      </div>
    </div>
  )
}

