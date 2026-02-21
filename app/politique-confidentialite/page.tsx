import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique de confidentialité – PATISSERIE BRUN CEDRIC',
  description: 'Politique de confidentialité et protection des données personnelles conforme au RGPD.',
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-chocolate-light/30 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-chocolate-dark mb-8 font-serif">
            Politique de confidentialité
          </h1>

          <div className="prose prose-chocolate max-w-none space-y-6 text-chocolate-dark/80 font-sans">
            <section>
              <p className="font-sans">
                La présente politique de confidentialité décrit la façon dont <strong>PATISSERIE BRUN CEDRIC</strong> 
                (ci-après «&nbsp;nous&nbsp;») collecte, utilise et protège les données personnelles des utilisateurs 
                du site <strong>cedric-brun.com</strong>, conformément au Règlement général sur la protection des 
                données (RGPD) et à la loi française «&nbsp;Informatique et Libertés&nbsp;».
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                1. Responsable du traitement
              </h2>
              <p className="font-sans">
                Le responsable du traitement des données est :
              </p>
              <address className="not-italic mt-2 font-sans">
                <p><strong>PATISSERIE BRUN CEDRIC</strong></p>
                <p>Cédric BRUN</p>
                <p>2 rue du Chalet</p>
                <p>25140 Charquemont</p>
                <p>France</p>
                <p className="mt-2">
                  Email :{' '}
                  <a href="mailto:patisseriebrun-25@orange.fr" className="text-chocolate-dark hover:underline">
                    patisseriebrun-25@orange.fr
                  </a>
                </p>
                <p>
                  Téléphone :{' '}
                  <a href="tel:+33381440736" className="text-chocolate-dark hover:underline">03 81 44 07 36</a>
                </p>
              </address>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                2. Données collectées et finalités
              </h2>
              <p className="font-sans">
                Nous collectons uniquement les données strictement nécessaires aux finalités indiquées ci-dessous.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full border border-chocolate-light/40 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-chocolate-light/20">
                      <th className="text-left p-3 font-semibold text-chocolate-dark">Données</th>
                      <th className="text-left p-3 font-semibold text-chocolate-dark">Finalité</th>
                      <th className="text-left p-3 font-semibold text-chocolate-dark">Base légale</th>
                      <th className="text-left p-3 font-semibold text-chocolate-dark">Durée</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-t border-chocolate-light/40">
                      <td className="p-3">Identité (nom, prénom), email, téléphone, société</td>
                      <td className="p-3">Gestion des comptes utilisateurs et des profils</td>
                      <td className="p-3">Exécution du contrat</td>
                      <td className="p-3">Compte actif + 3 ans après dernière activité</td>
                    </tr>
                    <tr className="border-t border-chocolate-light/40">
                      <td className="p-3">Email, mot de passe (chiffré)</td>
                      <td className="p-3">Authentification et accès sécurisé au compte</td>
                      <td className="p-3">Exécution du contrat</td>
                      <td className="p-3">Compte actif + 3 ans</td>
                    </tr>
                    <tr className="border-t border-chocolate-light/40">
                      <td className="p-3">Coordonnées (nom, prénom, email, tél), adresse de livraison et de facturation, instructions de livraison</td>
                      <td className="p-3">Exécution des commandes, livraison, facturation</td>
                      <td className="p-3">Exécution du contrat</td>
                      <td className="p-3">10 ans (obligations comptables)</td>
                    </tr>
                    <tr className="border-t border-chocolate-light/40">
                      <td className="p-3">Contenu des commandes (produits, quantités, montants)</td>
                      <td className="p-3">Traitement des commandes, historique client</td>
                      <td className="p-3">Exécution du contrat</td>
                      <td className="p-3">10 ans (obligations comptables)</td>
                    </tr>
                    <tr className="border-t border-chocolate-light/40">
                      <td className="p-3">Nom, email, téléphone, goûts souhaités, quantité, message</td>
                      <td className="p-3">Réponse aux demandes de devis / commande (formulaire Pro)</td>
                      <td className="p-3">Intérêt légitime (réponse à une demande)</td>
                      <td className="p-3">3 ans maximum</td>
                    </tr>
                    <tr className="border-t border-chocolate-light/40">
                      <td className="p-3">Préférence de consentement aux cookies</td>
                      <td className="p-3">Mémorisation du choix sur l’utilisation des cookies</td>
                      <td className="p-3">Consentement</td>
                      <td className="p-3">13 mois</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="font-sans mt-4 text-sm text-chocolate-dark/70">
                Les données de paiement par carte bancaire sont collectées et traitées exclusivement par <strong>Stripe</strong>. 
                Nous ne stockons jamais les numéros de carte. Nous ne conservons que les identifiants techniques de paiement 
                (ex. identifiant de session Stripe) liés aux commandes, pour le suivi et la preuve des transactions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                3. Sous-traitants et transferts de données
              </h2>
              <p className="font-sans">
                Nous faisons appel aux prestataires suivants pour le traitement des données. Chacun est lié par des 
                obligations contractuelles garantissant la sécurité et la confidentialité des données.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 font-sans">
                <li>
                  <strong>Supabase</strong> : hébergement de la base de données et authentification. 
                  Données stockées en Union européenne. 
                  <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-chocolate-dark hover:underline ml-1">Politique de confidentialité</a>
                </li>
                <li>
                  <strong>Stripe</strong> : traitement des paiements. Les coordonnées bancaires restent chez Stripe. 
                  <a href="https://stripe.com/fr/privacy" target="_blank" rel="noopener noreferrer" className="text-chocolate-dark hover:underline ml-1">Politique de confidentialité</a>
                </li>
                <li>
                  <strong>Vercel</strong> : hébergement du site web. 
                  <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-chocolate-dark hover:underline ml-1">Politique de confidentialité</a>
                </li>
                <li>
                  <strong>Resend</strong> : envoi des emails (confirmations de commande, demandes de devis, notifications propriétaire). 
                  <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-chocolate-dark hover:underline ml-1">Politique de confidentialité</a>
                </li>
              </ul>
              <p className="font-sans mt-4">
                En cas de transfert de données vers un pays tiers (hors UE), nous veillons à ce que des garanties 
                appropriées (clauses contractuelles types de la Commission européenne ou équivalent) soient en place.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                4. Cookies
              </h2>
              <p className="font-sans">
                Notre site utilise des cookies et stockages locaux pour :
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2 font-sans">
                <li>
                  <strong>Cookies essentiels</strong> : nécessaires au fonctionnement du site (session utilisateur, panier). 
                  Ils ne peuvent pas être désactivés.
                </li>
                <li>
                  <strong>Stockage du consentement</strong> : mémorisation de votre choix concernant les cookies 
                  (via <code className="bg-chocolate-light/30 px-1 rounded">localStorage</code>).
                </li>
              </ul>
              <p className="font-sans mt-4">
                Nous n&apos;utilisons actuellement <strong>pas</strong> de cookies analytiques (Google Analytics, etc.) 
                ni de cookies marketing. Si cela venait à changer, nous mettrions à jour la présente politique et 
                solliciterions votre consentement préalable.
              </p>
              <p className="font-sans mt-4">
                Vous pouvez accepter ou refuser les cookies via la bannière affichée lors de votre première visite. 
                Vous pouvez également modifier vos préférences à tout moment via les paramètres de votre navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                5. Vos droits (RGPD)
              </h2>
              <p className="font-sans">
                Conformément au RGPD et à la loi «&nbsp;Informatique et Libertés&nbsp;», vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2 font-sans">
                <li><strong>Droit d&apos;accès</strong> : obtenir une copie de vos données personnelles</li>
                <li><strong>Droit de rectification</strong> : faire corriger des données inexactes ou incomplètes</li>
                <li><strong>Droit à l&apos;effacement</strong> : demander la suppression de vos données (sous réserve des obligations légales de conservation)</li>
                <li><strong>Droit à la limitation du traitement</strong> : demander la suspension du traitement dans certains cas</li>
                <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré et couramment utilisé</li>
                <li><strong>Droit d&apos;opposition</strong> : vous opposer au traitement de vos données pour des motifs légitimes</li>
                <li><strong>Droit de retirer votre consentement</strong> : pour les traitements fondés sur le consentement</li>
              </ul>
              <p className="font-sans mt-4">
                Pour exercer ces droits, adressez votre demande à{' '}
                <a href="mailto:patisseriebrun-25@orange.fr" className="text-chocolate-dark hover:underline font-semibold">
                  patisseriebrun-25@orange.fr
                </a>
                . Nous vous répondrons dans un délai d&apos;un mois.
              </p>
              <p className="font-sans mt-4">
                Vous avez également le droit d&apos;introduire une réclamation auprès de la{' '}
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-chocolate-dark hover:underline">
                  CNIL
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                6. Sécurité des données
              </h2>
              <p className="font-sans">
                Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données 
                contre l&apos;accès non autorisé, la modification, la divulgation ou la destruction. Les mots de passe 
                sont stockés de manière sécurisée (hachage). Les échanges avec le site sont chiffrés (HTTPS).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                7. Modification de la politique
              </h2>
              <p className="font-sans">
                Nous pouvons mettre à jour cette politique pour refléter des changements dans nos pratiques ou la 
                réglementation. La date de dernière mise à jour sera indiquée en bas de page. Nous vous encourageons 
                à consulter périodiquement cette page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                8. Contact
              </h2>
              <p className="font-sans">
                Pour toute question relative à la protection de vos données personnelles :
              </p>
              <address className="not-italic mt-4 font-sans">
                <p><strong>PATISSERIE BRUN CEDRIC</strong></p>
                <p>2 rue du Chalet</p>
                <p>25140 Charquemont</p>
                <p>
                  Email :{' '}
                  <a href="mailto:patisseriebrun-25@orange.fr" className="text-chocolate-dark hover:underline">
                    patisseriebrun-25@orange.fr
                  </a>
                </p>
                <p>
                  Téléphone :{' '}
                  <a href="tel:+33381440736" className="text-chocolate-dark hover:underline">03 81 44 07 36</a>
                </p>
              </address>
            </section>

            <section className="pt-6 border-t border-chocolate-light/50 flex flex-wrap gap-4">
              <Link href="/mentions-legales" className="text-chocolate-dark hover:underline font-sans">
                Mentions légales
              </Link>
              <span className="text-chocolate-light/40">|</span>
              <Link href="/cgu" className="text-chocolate-dark hover:underline font-sans">
                CGU/CGV
              </Link>
              <span className="w-full" />
              <p className="text-sm text-chocolate-dark/60 font-sans">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
