import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales – PATISSERIE BRUN CEDRIC',
  description: 'Mentions légales du site PATISSERIE BRUN CEDRIC.',
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-chocolate-light/30 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-chocolate-dark mb-8 font-serif">
            Mentions légales
          </h1>

          <div className="prose prose-chocolate max-w-none space-y-6 text-chocolate-dark/80 font-sans">
            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                1. Éditeur du site
              </h2>
              <p className="font-sans">
                Le site <strong>cedric-brun.com</strong> est édité par :
              </p>
              <address className="not-italic mt-4 font-sans">
                <p><strong>PATISSERIE BRUN CEDRIC</strong></p>
                <p>Cédric BRUN</p>
                <p>2 rue du Chalet</p>
                <p>25140 Charquemont</p>
                <p>France</p>
                <p className="mt-2">
                  Téléphone :{' '}
                  <a
                    href="tel:+33381440736"
                    className="text-chocolate-dark hover:underline"
                  >
                    03 81 44 07 36
                  </a>
                </p>
                <p>
                  Email :{' '}
                  <a
                    href="mailto:patisseriebrun-25@orange.fr"
                    className="text-chocolate-dark hover:underline"
                  >
                    patisseriebrun-25@orange.fr
                  </a>
                </p>
              </address>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                2. Informations légales
              </h2>
              <div className="space-y-2 font-sans">
                <p>
                  <strong>Nom commercial :</strong> PATISSERIE BRUN CEDRIC
                </p>
                <p>
                  <strong>Forme juridique :</strong> EI (Entrepreneur Individuel)
                </p>
                <p>
                  <strong>SIRET :</strong> 424 016 293 00021
                </p>
                <p>
                  <strong>TVA Intracommunautaire :</strong> FR09424016293
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                3. Directeur de publication
              </h2>
              <p className="font-sans">
                Le directeur de publication est <strong>Cédric BRUN</strong>, propriétaire de PATISSERIE BRUN CEDRIC.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                4. Hébergement
              </h2>
              <p className="font-sans">
                Ce site est hébergé par :
              </p>
              <address className="not-italic mt-2 font-sans">
                <p><strong>Vercel Inc.</strong></p>
                <p>340 S Lemon Ave #4133</p>
                <p>Walnut, CA 91789</p>
                <p>États-Unis</p>
                <p>
                  Site web :{' '}
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-chocolate-dark hover:underline"
                  >
                    vercel.com
                  </a>
                </p>
              </address>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                5. Propriété intellectuelle
              </h2>
              <p className="font-sans">
                L'ensemble du contenu de ce site (textes, images, logos, graphismes, etc.) est la propriété 
                exclusive de PATISSERIE BRUN CEDRIC, sauf mention contraire. Toute reproduction, représentation, 
                modification, publication, adaptation de tout ou partie des éléments du site, quel que soit 
                le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable de PATISSERIE BRUN CEDRIC.
              </p>
              <p className="font-sans mt-4">
                Toute exploitation non autorisée du site ou de son contenu engage la responsabilité civile 
                et/ou pénale de l'utilisateur et pourra donner lieu à des poursuites judiciaires.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                6. Protection des données personnelles
              </h2>
              <p className="font-sans">
                Nous collectons des données personnelles (identité, coordonnées, adresses, commandes) pour 
                la gestion des comptes, l&apos;exécution des commandes et la relation client. Les données de 
                paiement sont traitées exclusivement par Stripe ; nous ne conservons pas les numéros de carte.
              </p>
              <p className="font-sans mt-4">
                Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au 
                Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, 
                de rectification, de suppression, de limitation, de portabilité et d&apos;opposition aux données vous concernant.
              </p>
              <p className="font-sans mt-4">
                Pour exercer ces droits ou toute question :{' '}
                <a
                  href="mailto:patisseriebrun-25@orange.fr"
                  className="text-chocolate-dark hover:underline"
                >
                  patisseriebrun-25@orange.fr
                </a>
              </p>
              <p className="font-sans mt-4">
                Pour le détail des données collectées, des finalités et des durées de conservation, consultez notre{' '}
                <a
                  href="/politique-confidentialite"
                  className="text-chocolate-dark hover:underline font-semibold"
                >
                  politique de confidentialité
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                7. Cookies
              </h2>
              <p className="font-sans">
                Ce site utilise des cookies essentiels (session, panier) et stocke votre préférence de consentement. 
                Nous n&apos;utilisons pas actuellement de cookies analytiques ni marketing. 
                Vous pouvez accepter ou refuser via la bannière lors de votre première visite. Pour plus d&apos;informations :{' '}
                <a
                  href="/politique-confidentialite"
                  className="text-chocolate-dark hover:underline font-semibold"
                >
                  politique de confidentialité
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                8. Responsabilité
              </h2>
              <p className="font-sans">
                PATISSERIE BRUN CEDRIC s'efforce de fournir sur le site des informations aussi précises que possible. 
                Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes et des 
                carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires 
                qui lui fournissent ces informations.
              </p>
              <p className="font-sans mt-4">
                Tous les informations indiquées sur le site sont données à titre indicatif, et sont 
                susceptibles d'évoluer. Par ailleurs, les renseignements figurant sur le site ne sont pas 
                exhaustifs. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur 
                mise en ligne.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                9. Liens hypertextes
              </h2>
              <p className="font-sans">
                Le site peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. 
                Les liens vers ces autres ressources vous font quitter le site. Il est possible de créer un lien 
                vers la page de présentation de ce site sans autorisation expresse de l'éditeur. Aucune 
                autorisation ni demande d'information préalable ne peut être exigée par l'éditeur à l'égard 
                d'un site qui souhaite établir un lien vers le site de l'éditeur. Il convient toutefois 
                d'afficher ce site dans une nouvelle fenêtre du navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                10. Droit applicable
              </h2>
              <p className="font-sans">
                Les présentes mentions légales sont régies par le droit français. En cas de litige et à 
                défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément 
                aux règles de compétence en vigueur.
              </p>
            </section>

            <section className="pt-4 border-t border-chocolate-light/50">
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
