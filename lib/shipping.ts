/**
 * Calcul des frais de port pour la France Métropolitaine
 * Prix unique : 10 €. Gratuit au-dessus de 70€ TTC.
 */

export const FREE_SHIPPING_THRESHOLD = 70 // € TTC

/** Frais de port en prix unique (€) */
export const FLAT_SHIPPING_COST = 10

/** Délais de livraison (page /livraison, llms.txt, données structurées) */
export const DELAI_PREPARATION = 'sous 24 à 48 h, du mercredi au vendredi'
export const TRANSPORTEUR = 'Colissimo'
/** Délai d'acheminement en France métropolitaine, en jours ouvrés */
export const DELAI_ACHEMINEMENT_JOURS = 2

/**
 * Calcule les frais de port (tarif unique).
 * @param _weightInGrams Poids total en grammes (ignoré, conservé pour compatibilité d’API)
 * @param subtotalTTC Sous-total TTC de la commande (hors frais de port)
 * @returns Frais de port en euros (10 €), ou 0 si livraison gratuite (sous-total ≥ seuil)
 */
export function calculateShippingCost(
  _weightInGrams: number,
  subtotalTTC: number
): number {
  if (subtotalTTC >= FREE_SHIPPING_THRESHOLD) {
    return 0
  }
  return FLAT_SHIPPING_COST
}

/**
 * Retourne le tarif de port pour affichage (prix unique).
 */
export function getShippingRates() {
  return { flat: FLAT_SHIPPING_COST }
}
