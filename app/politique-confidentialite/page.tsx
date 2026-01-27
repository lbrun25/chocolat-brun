import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité – Chocolat BRUN',
  description: 'Politique de confidentialité et gestion des cookies de Chocolat BRUN.',
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
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                Collecte des données
              </h2>
              <p className="font-sans">
                Chocolat BRUN s'engage à protéger votre vie privée. Nous collectons uniquement les données 
                nécessaires au fonctionnement du site et à l'amélioration de votre expérience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                Utilisation des cookies
              </h2>
              <p className="font-sans">
                Notre site utilise des cookies pour améliorer votre expérience de navigation. 
                Les cookies sont de petits fichiers texte stockés sur votre appareil.
              </p>
              <h3 className="text-xl font-semibold text-chocolate-dark mt-4 mb-2 font-serif">
                Types de cookies utilisés :
              </h3>
              <ul className="list-disc pl-6 space-y-2 font-sans">
                <li>
                  <strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site. 
                  Ils ne peuvent pas être désactivés.
                </li>
                <li>
                  <strong>Cookies analytiques :</strong> Nous permettent d'analyser la fréquentation 
                  du site pour l'améliorer.
                </li>
                <li>
                  <strong>Cookies marketing :</strong> Utilisés pour personnaliser la publicité 
                  et mesurer l'efficacité des campagnes.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                Vos droits
              </h2>
              <p className="font-sans">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2 font-sans">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit d'opposition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                Contact
              </h2>
              <p className="font-sans">
                Pour toute question concernant vos données personnelles, vous pouvez nous contacter :
              </p>
              <address className="not-italic mt-4 font-sans">
                <p><strong>Chocolat BRUN</strong></p>
                <p>2 rue du Chalet</p>
                <p>25140 Charquemont</p>
                <p>
                  Email :{' '}
                  <a
                    href="mailto:patisseriebrun-25@orange.fr"
                    className="text-chocolate-dark hover:underline"
                  >
                    patisseriebrun-25@orange.fr
                  </a>
                </p>
                <p>
                  Téléphone :{' '}
                  <a
                    href="tel:+33381440736"
                    className="text-chocolate-dark hover:underline"
                  >
                    03 81 44 07 36
                  </a>
                </p>
              </address>
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


