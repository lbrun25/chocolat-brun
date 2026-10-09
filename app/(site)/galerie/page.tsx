import { Metadata } from 'next'
import GalerieContent from './GalerieContent'

const galerieMedia: Array<{ src: string; alt: string }> = [
  { src: '/images/galerie/cabosse_etagere.jpg', alt: 'Cabosses de cacao sur étagère' },
  { src: '/images/galerie/cabosse_half.jpg', alt: 'Demi-cabosse de cacao' },
  { src: '/images/galerie/cabosse_ouverte.jpg', alt: 'Cabosse de cacao ouverte' },
  { src: '/images/galerie/chocolat_emballage_vrac.jpg', alt: 'Chocolat en vrac et emballage' },
  { src: '/images/galerie/chocolat_emballe_tapis_machine.jpg', alt: 'Chocolat emballé sur tapis de machine' },
  { src: '/images/galerie/emaballage.jpg', alt: 'Emballage artisanal' },
  { src: '/images/galerie/emballage_tapis.jpg', alt: 'Emballage sur tapis' },
  { src: '/images/galerie/machine_emballage.jpg', alt: 'Machine d\'emballage' },
  { src: '/images/galerie/sachet_chocolat_noir.png', alt: 'Sachet de chocolat noir' },
  { src: '/images/galerie/troix_cabosses.jpg', alt: 'Trois cabosses de cacao' },
  { src: '/images/galerie/caramels_moules_refroidissement.png', alt: 'Caramels et confiseries en moules sur grilles de refroidissement' },
  { src: '/images/galerie/moule_chocolat_et_finis.png', alt: 'Moule à chocolat et barres de chocolat au lait démoulées' },
  { src: '/images/galerie/cafe_chocolat.png', alt: 'Tasse de café avec chocolat emballé' },
  { src: '/images/galerie/the_chocolat.jpg', alt: 'Tasse de thé avec chocolat et tablette' },
  { src: '/images/galerie/poissons-chocolat-demoules.jpg', alt: 'Poissons en chocolat au lait fraîchement démoulés' },
  { src: '/images/galerie/poissons-moules-refroidissement.jpg', alt: 'Moules à poissons vides sur grille de refroidissement, à côté de carrés de chocolat' },
  { src: '/images/galerie/poissons-moule-coulage.jpg', alt: 'Poissons en chocolat noir dans leur moule, prêts à être démoulés' },
  { src: '/images/galerie/poissons-plaque-moulee.jpg', alt: 'Plaque entière de poissons en chocolat noir moulés' },
  { src: '/images/galerie/vaches-comtoises-demoulage.jpg', alt: 'Vaches des Belles Comtoises en chocolat au lait, démoulage en cours' },
  { src: '/images/galerie/ecureuils-chocolat-moules.jpg', alt: 'Écureuils en chocolat noir dans leurs moules' },
  { src: '/videos/galerie/poissons-demoulage.mp4', alt: 'Démoulage des poissons en chocolat' },
  { src: '/videos/galerie/emballage-machine.mp4', alt: 'Emballage automatique des chocolats sur la ligne de production' },
  { src: '/images/galerie/orangettes-grille-enrobage.jpg', alt: 'Bâtonnets d\'orange confits sur la grille de l\'enrobeuse' },
  { src: '/images/galerie/orangettes-cascade-chocolat.jpg', alt: 'Orangettes passant sous la cascade de chocolat au lait' },
  { src: '/images/galerie/orangettes-enrobeuse.jpg', alt: 'Orangettes sur le tapis de l\'enrobeuse, sous le voile de chocolat' },
  { src: '/images/galerie/enrobeuse-chocolat.jpg', alt: 'Enrobeuse à chocolat en fonctionnement' },
  { src: '/images/galerie/orangettes-enrobees-vermicelles.jpg', alt: 'Orangettes enrobées de chocolat noir et vermicelles sur papier sulfurisé' },
  { src: '/images/galerie/poissons-lait-demoules-octobre.jpg', alt: 'Poissons en chocolat au lait démoulés' },
  { src: '/images/galerie/poissons-moules-grilles.jpg', alt: 'Plaques de moules à poissons en chocolat posées sur des grilles' },
  { src: '/images/galerie/poissons-emballes-carton.jpg', alt: 'Poissons en chocolat emballés individuellement dans un carton' },
  { src: '/images/galerie/machine-emballage-vue-dessus.jpg', alt: 'Machine d\'emballage vue de dessus' },
  { src: '/images/galerie/vaches-blanc-moules.jpg', alt: 'Moules de vaches Belles Comtoises remplis de chocolat blanc' },
  { src: '/images/galerie/vaches-noir-coques-moules.jpg', alt: 'Coques de vaches Belles Comtoises en chocolat noir dans leurs moules' },
  { src: '/images/galerie/vaches-coques-chocolat-detail.jpg', alt: 'Gros plan sur des coques de vaches en chocolat dans leurs moules' },
  { src: '/videos/galerie/poissons-grilles-refroidissement.mp4', alt: 'Poissons en chocolat sur les grilles de refroidissement' },
  { src: '/videos/galerie/poissons-moules-granit.mp4', alt: 'Poissons en chocolat dans leurs moules sur plan de travail en granit' },
  { src: '/videos/galerie/vaches-coques-moules.mp4', alt: 'Coques de vaches Belles Comtoises en chocolat dans leurs moules' },
  { src: '/videos/galerie/emballage-tapis-bleu.mp4', alt: 'Chocolats emballés défilant sur le tapis bleu de la machine' },
  { src: '/videos/galerie/emballage-sortie-machine.mp4', alt: 'Sortie des chocolats emballés de la machine d\'emballage' },
  { src: '/videos/galerie/emballage-poissons-tapis.mp4', alt: 'Poissons en chocolat acheminés vers la machine d\'emballage' },
  { src: '/videos/galerie/emballage-machine-gros-plan.mp4', alt: 'Gros plan sur la machine d\'emballage en marche' },
]

export const metadata: Metadata = {
  title: 'Galerie – Napolitains Cédric BRUN',
  description: 'Découvrez nos illustrations et croquis de napolitains artisanaux, emballages et créations Cédric BRUN.',
}

export default function GaleriePage() {
  return (
    <div className="min-h-screen bg-chocolate-light/30 pt-28 md:pt-36 pb-20 paper-texture">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 mt-6 md:mt-10">
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

