import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation – PATISSERIE BRUN CEDRIC',
  description: 'Conditions Générales d\'Utilisation (CGU) et de Vente (CGV) du site cedric-brun.com',
}

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-chocolate-light/30 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-chocolate-dark mb-8 font-serif">
            Conditions Générales d'Utilisation et de Vente
          </h1>

          <div className="prose prose-chocolate max-w-none space-y-6 text-chocolate-dark/80 font-sans">
            {/* Introduction */}
            <section>
              <p className="font-sans text-lg">
                Les présentes Conditions Générales d'Utilisation et de Vente (ci-après "CGU/CGV") régissent 
                l'utilisation du site <strong>cedric-brun.com</strong> et les relations contractuelles entre 
                PATISSERIE BRUN CEDRIC et ses clients.
              </p>
              <p className="font-sans mt-4">
                En passant commande sur notre site, vous acceptez sans réserve les présentes conditions.
              </p>
            </section>

            {/* 1. Informations légales */}
            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                1. Informations légales
              </h2>
              <p className="font-sans">
                Le site <strong>cedric-brun.com</strong> est édité par :
              </p>
              <address className="not-italic mt-4 font-sans">
                <p><strong>PATISSERIE BRUN CEDRIC</strong></p>
                <p>Cédric BRUN</p>
                <p>2 rue du Chalet</p>
                <p>25140 Charquemont, France</p>
                <p className="mt-2">
                  <strong>SIRET :</strong> 424 016 293 00021
                </p>
                <p>
                  <strong>TVA Intracommunautaire :</strong> FR09424016293
                </p>
                <p className="mt-2">
                  <strong>Téléphone :</strong>{' '}
                  <a href="tel:+33381440736" className="text-chocolate-dark hover:underline">
                    03 81 44 07 36
                  </a>
                </p>
                <p>
                  <strong>Email :</strong>{' '}
                  <a href="mailto:patisseriebrun-25@orange.fr" className="text-chocolate-dark hover:underline">
                    patisseriebrun-25@orange.fr
                  </a>
                </p>
              </address>
            </section>

            {/* 2. Objet et champ d'application */}
            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                2. Objet et champ d'application
              </h2>
              <p className="font-sans">
                Les présentes CGU/CGV ont pour objet de définir les droits et obligations des parties dans 
                le cadre de la vente en ligne de napolitains en chocolat artisanaux et autres produits 
                proposés par PATISSERIE BRUN CEDRIC.
              </p>
              <p className="font-sans mt-4">
                Ces conditions s'appliquent à toute commande passée sur le site, tant pour les particuliers 
                que pour les professionnels (cafés, hôtels, restaurants, entreprises).
              </p>
            </section>

            {/* 3. Produits et services */}
            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                3. Produits et services
              </h2>
              <p className="font-sans">
                PATISSERIE BRUN CEDRIC propose à la vente des napolitains en chocolat artisanaux dans 
                les variétés suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2 font-sans">
                <li>Chocolat noir</li>
                <li>Chocolat noir au café</li>
                <li>Chocolat au lait</li>
                <li>Chocolat blanc</li>
                <li>Chocolat Dulcey (blond)</li>
              </ul>
              <p className="font-sans mt-4">
                Les produits sont présentés sur le site avec leurs caractéristiques essentielles : description, 
                ingrédients, allergènes, poids, prix. Les photographies sont non contractuelles et peuvent 
                présenter de légères différences avec le produit réel, s'agissant de fabrication artisanale.
              </p>
              <p className="font-sans mt-4">
                Tous nos produits sont fabriqués artisanalement à Charquemont (Doubs, 25140) avec des 
                ingrédients de qualité sélectionnés avec soin.
              </p>
            </section>

            {/* 4. Commandes */}
            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                4. Commandes
              </h2>
              
              <h3 className="text-xl font-semibold text-chocolate-dark mt-4 mb-2 font-serif">
                4.1. Processus de commande
              </h3>
              <p className="font-sans">
                Pour passer commande, vous devez :
              </p>
              <ol className="list-decimal pl-6 space-y-2 mt-2 font-sans">
                <li>Sélectionner les produits et quantités souhaitées</li>
                <li>Les ajouter au panier</li>
                <li>Vérifier votre panier et valider</li>
                <li>Renseigner vos coordonnées et adresse de livraison</li>
                <li>Choisir votre mode de livraison</li>
                <li>Procéder au paiement sécurisé</li>
                <li>Confirmer votre commande</li>
              </ol>
              <p className="font-sans mt-4">
                Une confirmation de commande vous sera envoyée par email à l'adresse indiquée lors de 
                la commande.
              </p>

              <h3 className="text-xl font-semibold text-chocolate-dark mt-4 mb-2 font-serif">
                4.2. Validation de la commande
              </h3>
              <p className="font-sans">
                La vente ne sera définitive qu'après l'encaissement effectif du prix et la confirmation 
                de la commande par PATISSERIE BRUN CEDRIC. Nous nous réservons le droit de refuser toute 
                commande pour des motifs légitimes, notamment en cas d'indisponibilité des produits, 
                de problème de paiement ou de suspicion de fraude.
              </p>

              <h3 className="text-xl font-semibold text-chocolate-dark mt-4 mb-2 font-serif">
                4.3. Disponibilité des produits
              </h3>
              <p className="font-sans">
                Les produits sont proposés dans la limite des stocks disponibles. En cas d'indisponibilité 
                après passation de votre commande, nous vous en informerons dans les meilleurs délais et 
                vous proposerons soit un remboursement, soit un produit de remplacement équivalent.
              </p>
            </section>

            {/* 5. Prix et paiement */}
            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                5. Prix et paiement
              </h2>
              
              <h3 className="text-xl font-semibold text-chocolate-dark mt-4 mb-2 font-serif">
                5.1. Prix
              </h3>
              <p className="font-sans">
                Les prix de nos produits sont indiqués en euros (€) toutes taxes comprises (TTC), 
                TVA à 5,5% incluse (taux applicable aux produits alimentaires).
              </p>
              <p className="font-sans mt-4">
                Les prix affichés sur le site n'incluent pas les frais de livraison, qui sont calculés 
                et affichés avant la validation définitive de la commande.
              </p>
              <p className="font-sans mt-4">
                PATISSERIE BRUN CEDRIC se réserve le droit de modifier ses prix à tout moment. 
                Toutefois, les produits seront facturés au prix en vigueur au moment de la validation 
                de la commande.
              </p>

              <h3 className="text-xl font-semibold text-chocolate-dark mt-4 mb-2 font-serif">
                5.2. Paiement
              </h3>
              <p className="font-sans">
                Le paiement s'effectue en ligne par carte bancaire via notre solution de paiement 
                sécurisée (Stripe). Les cartes acceptées sont : Visa, Mastercard, American Express.
              </p>
              <p className="font-sans mt-4">
                Les données de paiement sont cryptées et sécurisées. PATISSERIE BRUN CEDRIC ne conserve 
                aucune donnée bancaire.
              </p>
              <p className="font-sans mt-4">
                Pour les commandes professionnelles importantes, un paiement par virement bancaire peut 
                être proposé sur devis. Dans ce cas, la commande ne sera traitée qu'après réception 
                effective du paiement.
              </p>

              <h3 className="text-xl font-semibold text-chocolate-dark mt-4 mb-2 font-serif">
                5.3. Facture
              </h3>
              <p className="font-sans">
                Une facture vous sera adressée par email lors de l'expédition de votre commande. 
                Vous pouvez également la télécharger depuis votre espace client.
              </p>
            </section>

            {/* 6. Livraison */}
            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                6. Livraison
              </h2>
              
              <p className="font-sans">
                Les modalités détaillées de livraison (zones, délais, frais de port, conditions) 
                sont consultables sur notre page dédiée :{' '}
                <Link
                  href="/livraison"
                  className="text-chocolate-dark hover:underline font-semibold"
                >
                  Livraison et frais de port
                </Link>.
              </p>

              <h3 className="text-xl font-semibold text-chocolate-dark mt-4 mb-2 font-serif">
                6.1. Principales informations
              </h3>
              <ul className="list-disc pl-6 space-y-2 mt-2 font-sans">
                <li>
                  <strong>Zone de livraison :</strong> France métropolitaine principalement. 
                  Contactez-nous pour les autres destinations.
                </li>
                <li>
                  <strong>Délai de préparation :</strong> 24h à 48h (du mercredi au vendredi)
                </li>
                <li>
                  <strong>Délai d'acheminement :</strong> 2 jours ouvrés via Colissimo
                </li>
                <li>
                  <strong>Livraison gratuite :</strong> À partir de 70€ en France métropolitaine
                </li>
                <li>
                  <strong>Suivi de colis :</strong> Numéro de suivi communiqué par email
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-chocolate-dark mt-4 mb-2 font-serif">
                6.2. Réception et vérification
              </h3>
              <p className="font-sans">
                Lors de la réception de votre colis, il est impératif de :
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2 font-sans">
                <li>Vérifier l'état du colis en présence du livreur</li>
                <li>Refuser le colis s'il est manifestement endommagé ou émettre des réserves précises et écrites sur le bon de livraison</li>
                <li>Nous contacter sous <strong>24 heures</strong> en cas de problème avec photos à l'appui</li>
              </ul>
              <p className="font-sans mt-4">
                Sans le respect de cette clause, aucune procédure de remboursement auprès du transporteur 
                ne pourra être entamée.
              </p>

              <h3 className="text-xl font-semibold text-chocolate-dark mt-4 mb-2 font-serif">
                6.3. Responsabilité du client
              </h3>
              <p className="font-sans">
                Le client est responsable :
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2 font-sans">
                <li>
                  De la précision et de l'exactitude de l'adresse de livraison (code porte, étage, téléphone, etc.)
                </li>
                <li>
                  De récupérer son colis dans les délais : sous 24h en cas d'avis de passage, 
                  ou dans les 10h si déposé en boîte aux lettres
                </li>
              </ul>
              <p className="font-sans mt-4">
                PATISSERIE BRUN CEDRIC ne pourra être tenue responsable d'un retour de livraison dû à 
                une erreur d'adresse ou à une impossibilité de livrer à l'adresse indiquée, ni de la 
                détérioration des produits due à un délai de récupération trop long.
              </p>

              <h3 className="text-xl font-semibold text-chocolate-dark mt-4 mb-2 font-serif">
                6.4. Conservation des produits
              </h3>
              <p className="font-sans">
                Nos napolitains en chocolat doivent être conservés dans un endroit frais et sec, 
                à l'abri de la lumière et de la chaleur (température idéale : 15-18°C). 
                La date limite de consommation est indiquée sur l'emballage.
              </p>
            </section>

            {/* 7. Droit de rétractation */}
            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                7. Droit de rétractation
              </h2>
              <p className="font-sans">
                Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation 
                ne peut être exercé pour les denrées alimentaires susceptibles de se détériorer ou de 
                se périmer rapidement.
              </p>
              <p className="font-sans mt-4">
                <strong>Les produits alimentaires, dont font partie nos napolitains en chocolat, 
                ne peuvent donc pas faire l'objet d'un droit de rétractation.</strong>
              </p>
              <p className="font-sans mt-4">
                Toutefois, en cas de produit défectueux, endommagé ou non conforme à votre commande, 
                nous nous engageons à trouver une solution satisfaisante (remplacement ou remboursement). 
                Contactez-nous dans les 48h suivant la réception.
              </p>
            </section>

            {/* 8. Garanties et responsabilité */}
            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                8. Garanties et responsabilité
              </h2>
              
              <h3 className="text-xl font-semibold text-chocolate-dark mt-4 mb-2 font-serif">
                8.1. Garantie de conformité
              </h3>
              <p className="font-sans">
                Nos produits bénéficient de la garantie légale de conformité prévue par les articles 
                L217-4 et suivants du Code de la consommation, ainsi que de la garantie contre les 
                vices cachés prévue par les articles 1641 et suivants du Code civil.
              </p>

              <h3 className="text-xl font-semibold text-chocolate-dark mt-4 mb-2 font-serif">
                8.2. Allergènes
              </h3>
              <p className="font-sans">
                Les informations sur les allergènes sont indiquées sur chaque fiche produit. 
                Nos produits sont fabriqués dans un atelier utilisant : LAIT, fruits à coque, gluten, 
                soja. Des traces de ces allergènes peuvent être présentes dans tous nos produits.
              </p>
              <p className="font-sans mt-4">
                <strong>Il est de la responsabilité du consommateur de vérifier la liste des ingrédients 
                et des allergènes avant toute consommation.</strong> En cas de doute, contactez-nous.
              </p>

              <h3 className="text-xl font-semibold text-chocolate-dark mt-4 mb-2 font-serif">
                8.3. Limitation de responsabilité
              </h3>
              <p className="font-sans">
                PATISSERIE BRUN CEDRIC ne saurait être tenue responsable en cas de :
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2 font-sans">
                <li>Force majeure ou cas fortuit</li>
                <li>Mauvaise utilisation ou conservation du produit</li>
                <li>Utilisation non conforme aux instructions</li>
                <li>Retard de livraison imputable au transporteur</li>
                <li>Impossibilité de livrer en raison d'une adresse erronée ou incomplète</li>
              </ul>
            </section>

            {/* 9. Propriété intellectuelle */}
            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                9. Propriété intellectuelle
              </h2>
              <p className="font-sans">
                L'ensemble des éléments du site cedric-brun.com (textes, images, graphismes, logo, 
                vidéos, sons, etc.) sont protégés par le droit d'auteur, le droit des marques et/ou 
                le droit des brevets.
              </p>
              <p className="font-sans mt-4">
                Toute reproduction, représentation, modification, publication, adaptation de tout ou 
                partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, 
                sauf autorisation écrite préalable de PATISSERIE BRUN CEDRIC.
              </p>
            </section>

            {/* 10. Données personnelles */}
            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                10. Protection des données personnelles
              </h2>
              <p className="font-sans">
                Les données personnelles collectées sur le site (identité, coordonnées, adresses, commandes) 
                font l&apos;objet d&apos;un traitement informatique destiné à la gestion des comptes, à l&apos;exécution 
                des commandes et à la relation client. Les données de paiement par carte sont traitées par Stripe ; 
                nous ne conservons pas les numéros de carte.
              </p>
              <p className="font-sans mt-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi 
                Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de 
                suppression, de limitation, de portabilité et d'opposition aux données vous concernant.
              </p>
              <p className="font-sans mt-4">
                Pour exercer ces droits ou pour toute question sur le traitement de vos données, 
                contactez-nous à :{' '}
                <a
                  href="mailto:patisseriebrun-25@orange.fr"
                  className="text-chocolate-dark hover:underline font-semibold"
                >
                  patisseriebrun-25@orange.fr
                </a>
              </p>
              <p className="font-sans mt-4">
                Pour plus d'informations, consultez notre{' '}
                <Link
                  href="/politique-confidentialite"
                  className="text-chocolate-dark hover:underline font-semibold"
                >
                  Politique de confidentialité
                </Link>.
              </p>
            </section>

            {/* 11. Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                11. Cookies
              </h2>
              <p className="font-sans">
                Le site utilise des cookies pour améliorer votre expérience de navigation et pour 
                des finalités statistiques. Pour plus d'informations sur les cookies utilisés et leur 
                gestion, consultez notre{' '}
                <Link
                  href="/politique-confidentialite"
                  className="text-chocolate-dark hover:underline font-semibold"
                >
                  Politique de confidentialité
                </Link>.
              </p>
            </section>

            {/* 12. Service client */}
            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                12. Service client et réclamations
              </h2>
              <p className="font-sans">
                Pour toute question, réclamation ou demande d'information concernant nos produits 
                ou une commande, notre service client est à votre disposition :
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 font-sans">
                <li>
                  Par email :{' '}
                  <a
                    href="mailto:patisseriebrun-25@orange.fr"
                    className="text-chocolate-dark hover:underline"
                  >
                    patisseriebrun-25@orange.fr
                  </a>
                </li>
                <li>
                  Par téléphone :{' '}
                  <a href="tel:+33381440736" className="text-chocolate-dark hover:underline">
                    03 81 44 07 36
                  </a>
                </li>
                <li>Par courrier : PATISSERIE BRUN CEDRIC - 2 rue du Chalet - 25140 Charquemont</li>
              </ul>
              <p className="font-sans mt-4">
                Nous nous engageons à répondre à vos demandes dans les meilleurs délais.
              </p>

              <h3 className="text-xl font-semibold text-chocolate-dark mt-4 mb-2 font-serif">
                Médiation de la consommation
              </h3>
              <p className="font-sans">
                Conformément à l'article L612-1 du Code de la consommation, en cas de litige, vous avez 
                le droit de recourir gratuitement à un médiateur de la consommation en vue de la résolution 
                amiable du litige.
              </p>
              <p className="font-sans mt-4">
                Coordonnées du médiateur : <br />
                <strong>Centre de Médiation et de Règlement Amiable des Huissiers (CNMH)</strong><br />
                Site web :{' '}
                <a
                  href="https://cm2c.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chocolate-dark hover:underline"
                >
                  cm2c.net
                </a>
              </p>
            </section>

            {/* 13. Modification des CGU */}
            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                13. Modification des CGU/CGV
              </h2>
              <p className="font-sans">
                PATISSERIE BRUN CEDRIC se réserve le droit de modifier les présentes CGU/CGV à tout moment. 
                Les conditions applicables sont celles en vigueur à la date de la commande.
              </p>
              <p className="font-sans mt-4">
                Les modifications éventuelles seront portées à la connaissance des utilisateurs par leur 
                mise en ligne sur le site.
              </p>
            </section>

            {/* 14. Droit applicable */}
            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                14. Droit applicable et juridiction compétente
              </h2>
              <p className="font-sans">
                Les présentes CGU/CGV sont soumises au droit français. En cas de litige et à défaut 
                d'accord amiable, le litige sera porté devant les tribunaux compétents du ressort du 
                siège social de PATISSERIE BRUN CEDRIC ou du domicile de l'acheteur, conformément aux 
                règles de compétence en vigueur.
              </p>
              <p className="font-sans mt-4">
                Pour les litiges avec des consommateurs, les tribunaux du lieu où demeure le consommateur 
                au moment de la conclusion du contrat ou de la survenance du fait dommageable sont 
                également compétents.
              </p>
            </section>

            {/* 15. Langue et acceptation */}
            <section>
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                15. Langue et acceptation
              </h2>
              <p className="font-sans">
                Les présentes CGU/CGV sont rédigées en langue française. En cas de traduction en une 
                ou plusieurs langues étrangères, seul le texte français fera foi en cas de litige.
              </p>
              <p className="font-sans mt-4">
                L'acceptation des présentes CGU/CGV est matérialisée par une case à cocher dans le 
                formulaire de commande. Cette acceptation ne peut être que pleine et entière. 
                Toute adhésion sous réserve est considérée comme nulle et non avenue.
              </p>
            </section>

            {/* Annexe - extraits du code de la consommation */}
            <section className="bg-chocolate-light/20 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                Annexe : Garanties légales
              </h2>
              
              <h3 className="text-lg font-semibold text-chocolate-dark mt-4 mb-2 font-sans">
                Article L217-4 du Code de la consommation
              </h3>
              <p className="text-sm font-sans italic">
                "Le vendeur livre un bien conforme au contrat et répond des défauts de conformité 
                existant lors de la délivrance. Il répond également des défauts de conformité résultant 
                de l'emballage, des instructions de montage ou de l'installation lorsque celle-ci a été 
                mise à sa charge par le contrat ou a été réalisée sous sa responsabilité."
              </p>

              <h3 className="text-lg font-semibold text-chocolate-dark mt-4 mb-2 font-sans">
                Article L217-5 du Code de la consommation
              </h3>
              <p className="text-sm font-sans italic">
                "Le bien est conforme au contrat : 1° S'il est propre à l'usage habituellement attendu 
                d'un bien semblable et, le cas échéant : - s'il correspond à la description donnée par 
                le vendeur et possède les qualités que celui-ci a présentées à l'acheteur sous forme 
                d'échantillon ou de modèle ; - s'il présente les qualités qu'un acheteur peut 
                légitimement attendre eu égard aux déclarations publiques faites par le vendeur, par le 
                producteur ou par son représentant, notamment dans la publicité ou l'étiquetage (...)."
              </p>

              <h3 className="text-lg font-semibold text-chocolate-dark mt-4 mb-2 font-sans">
                Article 1641 du Code civil
              </h3>
              <p className="text-sm font-sans italic">
                "Le vendeur est tenu de la garantie à raison des défauts cachés de la chose vendue qui 
                la rendent impropre à l'usage auquel on la destine, ou qui diminuent tellement cet usage, 
                que l'acheteur ne l'aurait pas acquise, ou n'en aurait donné qu'un moindre prix, s'il 
                les avait connus."
              </p>
            </section>

            {/* Date de mise à jour */}
            <section className="pt-4 border-t border-chocolate-light/50">
              <p className="text-sm text-chocolate-dark/60 font-sans">
                <strong>Date de dernière mise à jour :</strong>{' '}
                {new Date().toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-sm text-chocolate-dark/60 font-sans mt-2">
                Version 1.0
              </p>
            </section>

            {/* Liens utiles */}
            <section className="pt-6 border-t border-chocolate-light/50">
              <h3 className="text-lg font-semibold text-chocolate-dark mb-3 font-serif">
                Liens utiles
              </h3>
              <div className="flex flex-wrap gap-4 font-sans">
                <Link
                  href="/mentions-legales"
                  className="text-chocolate-dark hover:underline font-semibold"
                >
                  Mentions légales
                </Link>
                <Link
                  href="/politique-confidentialite"
                  className="text-chocolate-dark hover:underline font-semibold"
                >
                  Politique de confidentialité
                </Link>
                <Link
                  href="/livraison"
                  className="text-chocolate-dark hover:underline font-semibold"
                >
                  Livraison
                </Link>
                <Link
                  href="/contact"
                  className="text-chocolate-dark hover:underline font-semibold"
                >
                  Contact
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
