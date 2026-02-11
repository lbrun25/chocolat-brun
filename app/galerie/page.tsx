import { Metadata } from 'next'
import IllustrationCard from '@/components/IllustrationCard'

const illustrations: Array<{
  src: string
  fallbackSrc: string
  alt: string
  cover?: boolean
}> = [
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
  {
    src: '/images/galerie/chocolat-noir-cafe-trainee-or.png',
    fallbackSrc: '/images/emballage-1.svg',
    alt: 'Chocolats noirs et fèves de café sur plateau doré',
    cover: true,
  },
  {
    src: '/images/galerie/chocolat-blanc-barres.png',
    fallbackSrc: '/images/emballage-1.svg',
    alt: 'Barres de chocolat blanc Chocolat Brun',
    cover: true,
  },
  {
    src: '/images/galerie/chocolats-trainee-doree.png',
    fallbackSrc: '/images/emballage-1.svg',
    alt: 'Assortiment de chocolats sur plateau à bordure dorée',
    cover: true,
  },
]

export const metadata: Metadata = {
  title: 'Galerie – Napolitains Cédric BRUN',
  description: 'Découvrez nos illustrations et croquis de napolitains artisanaux, emballages et créations Cédric BRUN.',
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

        {/* Les 3 photos produits en grand, cadre couvert */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {illustrations
            .filter((ill) => ill.cover)
            .map((illustration, index) => (
              <IllustrationCard
                key={illustration.src}
                src={illustration.src}
                fallbackSrc={illustration.fallbackSrc}
                alt={illustration.alt}
                delay={index * 0.1}
                cover
                aspectRatio="square"
              />
            ))}
        </div>

        {/* Reste de la galerie */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {illustrations
            .filter((ill) => !ill.cover)
            .map((illustration, index) => (
              <IllustrationCard
                key={illustration.src}
                src={illustration.src}
                fallbackSrc={illustration.fallbackSrc}
                alt={illustration.alt}
                delay={index * 0.1}
              />
            ))}
        </div>

        <div className="mt-12 text-center text-chocolate-dark/70">
          <p className="text-lg font-sans">
            Toutes nos illustrations reflètent l'âme artisanale et traditionnelle de Cédric BRUN
          </p>
        </div>
      </div>
    </div>
  )
}

