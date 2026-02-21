import { Metadata } from 'next'
import { FLAT_SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '@/lib/shipping'

export const metadata: Metadata = {
  title: 'Livraison et frais de port – Cédric Brun',
  description: 'Modalités de livraison et frais de port pour vos commandes de napolitains artisanaux.',
}

export default function LivraisonPage() {

  return (
    <div className="min-h-screen bg-chocolate-light/30 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-chocolate-dark mb-8 font-serif">
            Livraison et frais de port
          </h1>

          <div className="prose prose-chocolate max-w-none space-y-8 text-chocolate-dark/80 font-sans">
            {/* Section préparation */}
            <section>
              <p className="text-lg leading-relaxed">
                Les colis sont préparés par <strong>Cédric Brun</strong> sous 24h à 48h du mercredi au vendredi. 
                Ils sont conditionnés dans un emballage fermé, résistant, approprié au contenu et aux exigences du transport.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Pendant les périodes chaudes en France métropole ou pour toute autre expédition, où le délai 
                d'acheminement est supérieur à 3 jours ouvrés, un emballage isotherme permet de garantir la qualité 
                des produits pendant le temps de leur acheminement. Un surcoût est automatiquement ajouté au frais de transport.
              </p>
            </section>

            {/* Section responsabilité */}
            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                Responsabilité et conditions de livraison
              </h2>
              <p className="leading-relaxed">
                <strong>Cédric Brun</strong> se dégage de toute responsabilité si le colis est laissé plus de 10h 
                dans sa boîte aux lettres ou si le destinataire n'est pas allé le chercher sous 24h à réception 
                d'un avis de passage.
              </p>
              <p className="leading-relaxed mt-4">
                Le Client est responsable des mentions relatives au nom et à l'adresse du destinataire qui doivent 
                être précises, exactes et complètes (code de la porte, étage, téléphone, …) pour permettre une 
                livraison dans les conditions normales. <strong>Cédric Brun</strong> ne pourra être tenu responsable 
                d'un retour de livraison dû à une erreur d'adresse ou à une impossibilité de livrer à l'adresse indiquée.
              </p>
              <p className="leading-relaxed mt-4">
                Les délais indiqués dans les présentes conditions générales de vente et de manière plus générale 
                sur le site internet sont garantis en dehors des cas de force majeure : guerre, émeute, grèves, 
                incendie, accidents, arrêts des transports et autres décisions administratives.
              </p>
            </section>

            {/* Section livraison Colissimo */}
            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                Livraison via Colissimo
              </h2>
              <p className="leading-relaxed">
                Pour une livraison via Colissimo, le colis sera déposé dans la boîte aux lettres du destinataire 
                si sa taille le permet en France Métropolitaine, ou remis contre signature. En cas d'absence, le 
                livreur déposera un avis de passage et le destinataire devra se déplacer en bureau de Poste pour 
                récupérer son colis.
              </p>
              <p className="leading-relaxed mt-4">
                À tout moment le Client peut suivre la livraison grâce au numéro de suivi transmis par email. 
                Ce suivi est effectué jusqu'à la livraison en France métropolitaine.
              </p>
              <p className="leading-relaxed mt-4">
                Pour une livraison en France métropolitaine, le délai d'acheminement est de 2 jours ouvrés.
              </p>
              <p className="leading-relaxed mt-4">
                <strong>Cédric Brun</strong>, après confirmation de la commande, s'engage à traiter et à acheminer 
                la commande jusqu'à la destination convenu, selon l'adresse et le mode de livraison choisi par le Client. 
                <strong>Cédric Brun</strong> assure la marchandise jusqu'au lieu de livraison, mais il appartient au 
                destinataire de vérifier l'état du colis en présence du livreur. Toute anomalie lors de la livraison 
                devra être signalée sur le bon de livraison ou, à défaut, sous 24h auprès de <strong>Cédric Brun</strong> 
                avec photographies à l'appui. Sans le respect de cette clause, aucune procédure de remboursement auprès 
                du transporteur choisi ne pourra être entamée.
              </p>
            </section>

            {/* Section frais de port */}
            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                Frais de port
              </h2>
              <p className="leading-relaxed mb-6">
                Les frais d&apos;expédition sont au <strong>tarif unique de {FLAT_SHIPPING_COST} €</strong> en France métropolitaine.
                La livraison est <strong>gratuite</strong> pour toute commande (hors frais de port) égale ou supérieure à <strong>{FREE_SHIPPING_THRESHOLD} €</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
