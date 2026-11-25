import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { ALLERGENES, COMPOSITION, PRIX_PROVISOIRES, coffrets, recettes } from '@/lib/belles-comtoises'
import { DELAI_ACHEMINEMENT_JOURS, FLAT_SHIPPING_COST } from '@/lib/shipping'
import { absoluteUrl } from '@/lib/site-url'
import LandingBellesComtoises from './LandingBellesComtoises'

const TITRE = 'Les Belles Comtoises, vaches en chocolat praliné'
const DESCRIPTION =
  'Les Belles Comtoises : les petites vaches montbéliardes en chocolat pur beurre de cacao praliné noisette de Mélanie et Cédric Brun, à Charquemont (Doubs). Coffrets de 6 à 30, livrés en France.'

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: '/belles-comtoises' },
  openGraph: {
    title: `${TITRE} – Cédric Brun`,
    description: DESCRIPTION,
    type: 'website',
    locale: 'fr_FR',
    url: '/belles-comtoises',
    images: [
      {
        url: '/images/og-comtoises.jpg',
        width: 1200,
        height: 630,
        alt: 'Les Belles Comtoises – vaches en chocolat de Mélanie et Cédric Brun',
      },
    ],
  },
}

const URL_PAGE = absoluteUrl('/belles-comtoises')

/**
 * Fiche produit pour Google et les assistants IA (ChatGPT, Perplexity…) : un produit par coffret,
 * avec son prix, la livraison et la politique de retour (CGV §7 : pas de rétractation sur les denrées).
 * Tout vient du catalogue : rien à tenir à jour à la main.
 */
function ficheProduit() {
  const offreCommune = {
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    url: `${URL_PAGE}#coffrets`,
    seller: { '@id': absoluteUrl('/#organisation') },
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingRate: { '@type': 'MonetaryAmount', value: FLAT_SHIPPING_COST.toFixed(2), currency: 'EUR' },
      shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'FR' },
      // Préparation sous 24 à 48 h (1 à 2 jours), puis acheminement Colissimo en jours ouvrés
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'DAY' },
        transitTime: { '@type': 'QuantitativeValue', minValue: DELAI_ACHEMINEMENT_JOURS, maxValue: DELAI_ACHEMINEMENT_JOURS, unitCode: 'DAY' },
      },
    },
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'FR',
      returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
    },
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'ProductGroup',
    '@id': `${URL_PAGE}#produit`,
    productGroupID: 'belles-comtoises',
    name: 'Les Belles Comtoises',
    description: `${DESCRIPTION} Recettes : ${recettes.map((r) => r.nom.toLowerCase()).join(', ')}. ${COMPOSITION} ${ALLERGENES}`,
    url: URL_PAGE,
    brand: { '@type': 'Brand', name: 'Les Belles Comtoises' },
    manufacturer: { '@id': absoluteUrl('/#organisation') },
    category: 'Chocolats',
    image: coffrets.map((c) => absoluteUrl(c.image)),
    variesBy: 'https://schema.org/size',
    hasVariant: coffrets.map((c) => ({
      '@type': 'Product',
      '@id': `${URL_PAGE}#${c.id}`,
      sku: c.id,
      name: `Les Belles Comtoises, ${c.nom.toLowerCase()}`,
      description: `${c.nom} : ${c.pieces} vaches montbéliardes en chocolat pur beurre de cacao, praliné noisette.`,
      size: `${c.pieces} pièces`,
      image: absoluteUrl(c.image),
      offers: { '@type': 'Offer', price: c.prixTTC.toFixed(2), ...offreCommune },
    })),
  }
}

export default function BellesComtoisesPage() {
  return (
    <>
      {/* Pas de prix publiés aux moteurs tant que la grille est provisoire */}
      {!PRIX_PROVISOIRES && <JsonLd data={ficheProduit()} />}
      <LandingBellesComtoises />
    </>
  )
}
