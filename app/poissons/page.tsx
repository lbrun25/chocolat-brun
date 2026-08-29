'use client'

import GammePro from '@/components/site/GammePro'

export default function PoissonsPage() {
  return (
    <GammePro
      gamme="poisson"
      titre={
        <>
          Les petits
          <br />
          <em className="font-light italic text-cacao">poissons</em>
        </>
      }
      accroche="Le chocolat qui accompagne le café de vos clients. Emballé un à un, fabriqué dans notre atelier de Charquemont."
      heroImage="/images/poissons/poisson-lait.png"
      heroAlt="Poisson en chocolat au lait Cédric Brun"
      heroDecoupe
    />
  )
}
