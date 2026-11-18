# Faits sur la maison que les articles peuvent citer

Seule source, avec le code, de ce que l'agent rédacteur peut affirmer sur la maison. Tout autre fait sur la
maison est interdit. Compléter ce fichier (par Lucien ou une session principale) pour élargir ce qui peut se dire.

- Maison : Mélanie et Cédric Brun, atelier à Charquemont (Doubs, Haut-Doubs), maître artisan chocolatier depuis 1999.
- Fabrication : moulage, enrobage et emballage dans l'atelier de Charquemont.
- Le site a deux espaces, présentés sur l'accueil (`/`) : particuliers (`/particuliers`) et professionnels
  (`/professionnels`).
- Particuliers : Les Belles Comtoises, vaches montbéliardes en chocolat pur beurre de cacao praliné noisette,
  coffrets de 6, 12, 20 et 30 (page `/belles-comtoises`, ancre `/belles-comtoises#coffrets`). Quatre recettes :
  lait, noir, blanc, caramel.
- Professionnels (tarifs réservés aux comptes SIRET vérifiés) : petits poissons (`/poissons`), petits beurres en
  chocolat (`/petits-beurres`), orangettes enrobées de chocolat noir (`/orangettes`), grains de café enrobés de
  chocolat noir en sachet de 3 grains (`/grains-de-cafe`), tous emballés individuellement.
- Photos de l'atelier : `/galerie`. Histoire de la maison : `/histoire`.
- Les quatre recettes des Belles Comtoises et leur note (`recettes` de `lib/belles-comtoises.ts`) : lait « fondant
  et lacté », noir « intense et cacaoté », blanc « doux et vanillé », caramel « biscuité et caramélisé ».
- Formats (`coffrets` de `lib/belles-comtoises.ts`) : réglette de 6 (petit format), boîte de 12 (format découverte),
  boîte de 20 (grand format), boîte de 30 (très grand format).
- Commande et livraison des Belles Comtoises : paiement par carte sur le site, livraison en France métropolitaine.
  L'adresse de livraison (avec le nom du destinataire) est saisie au paiement : on peut faire livrer le coffret
  directement chez la personne à qui on l'offre. Frais de port et seuil de livraison offerte : constantes de
  `lib/shipping.ts`, jamais recopiées en euros dans le texte (la vitrine de fin d'article les affiche).
- Pas d'emballage cadeau en option, pas de message personnalisé, pas de date limite de commande pour Noël
  communiquée : n'en rien dire.
