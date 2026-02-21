import { Metadata } from 'next'
import GalerieContent from './GalerieContent'

const galerieMedia: Array<{ src: string; alt: string }> = [
  { src: '/images/galerie/cabosse_etagere.jpg', alt: 'Cabosses de cacao sur étagère' },
  { src: '/images/galerie/cabosse_half.jpg', alt: 'Demi-cabosse de cacao' },
  { src: '/images/galerie/cabosse_ouverte.jpg', alt: 'Cabosse de cacao ouverte' },
  { src: '/images/galerie/chocolat_emballage_vrac.jpg', alt: 'Chocolat en vrac et emballage' },
  { src: '/images/galerie/chocolat_emballe_tapis_machine.jpg', alt: 'Chocolat emballé sur tapis de machine' },
  { src: '/images/galerie/chocolat_remplissage.MOV', alt: 'Remplissage des chocolats' },
  { src: '/images/galerie/emaballage.jpg', alt: 'Emballage artisanal' },
  { src: '/images/galerie/emballage_tapis.jpg', alt: 'Emballage sur tapis' },
  { src: '/images/galerie/machine_emballage.jpg', alt: 'Machine d\'emballage' },
  { src: '/images/galerie/sachet_chocolat_noir.png', alt: 'Sachet de chocolat noir' },
  { src: '/images/galerie/secouer_chocolat.MOV', alt: 'Secouage des chocolats' },
  { src: '/images/galerie/troix_cabosses.jpg', alt: 'Trois cabosses de cacao' },
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
            Découvrez nos créations, cabosses, emballages et processus artisanaux
          </p>
        </div>

        <GalerieContent media={galerieMedia} />

        <div className="mt-12 text-center text-chocolate-dark/70">
          <p className="text-lg font-sans">
            Toutes nos illustrations reflètent l'âme artisanale et traditionnelle de Cédric BRUN
          </p>
        </div>
      </div>
    </div>
  )
}

