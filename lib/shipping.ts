/**
 * Calcul des frais de port pour la France Métropolitaine
 * Gratuit au-dessus de 70€ TTC
 */

export const FREE_SHIPPING_THRESHOLD = 70 // € TTC

// Tarifs de port standard (France Métropolitaine)
const STANDARD_SHIPPING_RATES = [
  { maxWeight: 0.25, price: 11.93 },
  { maxWeight: 0.5, price: 17.04 },
  { maxWeight: 0.75, price: 17.04 },
  { maxWeight: 1, price: 17.42 },
  { maxWeight: 2, price: 19.36 },
  { maxWeight: 5, price: 24.68 },
  { maxWeight: 10, price: 35.44 },
]

// Tarifs de port période chaude (France Métropolitaine)
const HOT_PERIOD_SHIPPING_RATES = [
  { maxWeight: 0.25, price: 16.78 },
  { maxWeight: 0.5, price: 21.65 },
  { maxWeight: 0.75, price: 21.65 },
  { maxWeight: 1, price: 25.29 },
  { maxWeight: 2, price: 27.23 },
  { maxWeight: 5, price: 32.55 },
  { maxWeight: 10, price: 47.24 },
]

/**
 * Détermine si on est en période chaude
 * Pour l'instant, on retourne false par défaut
 * Peut être étendu pour vérifier la date ou la destination
 */
function isHotPeriod(): boolean {
  // TODO: Implémenter la logique de détection de période chaude
  // Par exemple: vérifier la date (été) ou la destination
  return false
}

/**
 * Calcule les frais de port en fonction du poids (en grammes)
 * @param weightInGrams Poids total en grammes
 * @param subtotalTTC Sous-total TTC de la commande (hors frais de port)
 * @param useHotPeriod Utiliser les tarifs période chaude (optionnel)
 * @returns Frais de port en euros, ou 0 si gratuit
 */
export function calculateShippingCost(
  weightInGrams: number,
  subtotalTTC: number,
  useHotPeriod?: boolean
): number {
  // Gratuit si le sous-total dépasse le seuil
  if (subtotalTTC >= FREE_SHIPPING_THRESHOLD) {
    return 0
  }

  const weightInKg = weightInGrams / 1000
  const rates = useHotPeriod ?? isHotPeriod() ? HOT_PERIOD_SHIPPING_RATES : STANDARD_SHIPPING_RATES

  // Trouver le tarif approprié selon le poids
  for (const rate of rates) {
    if (weightInKg <= rate.maxWeight) {
      return rate.price
    }
  }

  // Si le poids dépasse 10kg, retourner le tarif maximum
  return rates[rates.length - 1].price
}

/**
 * Retourne tous les tarifs de port pour affichage
 */
export function getShippingRates() {
  return {
    standard: STANDARD_SHIPPING_RATES,
    hotPeriod: HOT_PERIOD_SHIPPING_RATES,
  }
}
