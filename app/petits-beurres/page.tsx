'use client'

import GammePro from '@/components/site/GammePro'

export default function PetitsBeurresPage() {
  return (
    <GammePro
      gamme="petit-beurre"
      titre={
        <>
          À première vue, un biscuit.
          <br />
          <em className="font-light italic text-cacao">En réalité, un chocolat.</em>
        </>
      }
      accroche="Le petit beurre moulé en chocolat, emballé un à un. Le compagnon idéal des pauses café de vos clients."
      heroImage="/images/petits-beurres/biscuit-lait.png"
      heroAlt="Petit beurre en chocolat au lait Cédric Brun"
      heroDecoupe
      bandeau={{
        image: '/images/petits-beurres/ambiance.jpg',
        alt: 'Petits beurres en chocolat et sachet individuel, avec un café et un thé',
      }}
    />
  )
}
