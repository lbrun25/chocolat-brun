# Cédric BRUN - Site Vitrine

Site vitrine pour la société Cédric BRUN, spécialisée dans la fabrication artisanale de napolitains à Charquemont (25140).

## 🍫 Structure du site (refonte août 2026)

Trois pages, volontairement visuelles et peu bavardes :

| Page | Public | Fichier |
|---|---|---|
| `/` — Les Belles Comtoises | Particuliers | `app/page.tsx` |
| `/poissons` — Les petits poissons | Professionnels | `app/poissons/page.tsx` |
| `/petits-beurres` — Les biscuits petits beurres | Professionnels | `app/petits-beurres/page.tsx` |

Ossature commune : `components/site/SiteHeader.tsx`, `SiteFooter.tsx`, `GammePro.tsx` (les deux pages pros
partagent le même composant), `Reveal.tsx`.

### Données

- `lib/catalogue.ts` — les deux gammes pros (poissons 4 g, petits beurres 6 g), prix HT officiels,
  conditionnement 200 pièces, **port 14 € HT**, **franco 290 € HT**, TVA 5,5 % (`TVA_RATE`).
  `CONTACT.signature` porte la signature de la maison : « Maître Artisan Chocolatier depuis 1999 ».
- `lib/belles-comtoises.ts` — les 4 recettes et les 4 coffrets grand public (prix TTC officiels :
  6 → 12 €, 12 → 18 €, 20 → 26 €, 30 → 35 €). `PRIX_PROVISOIRES = false` ; repasser à `true` afficherait
  un bandeau « tarifs provisoires » si la grille venait à changer.
  ⚠️ Le dossier client ne fournit aucune photo du coffret de 30 : une autre prise de vue de grand coffret
  est utilisée en attendant.

### Compte professionnel (accès aux tarifs)

Les tarifs pros sont masqués tant que le visiteur n'a pas de compte avec **SIRET vérifié auprès de l'INSEE**.

- Inscription : `/espace-pro/inscription` → `app/api/pro/inscription/route.ts`
  (vérifie le SIRET via `/api/siret/validate`, puis crée le compte Supabase et le profil).
- Connexion : `/espace-pro/connexion`. Le garde-fou d'affichage est `hooks/useProAccess.ts`.
- Migration à appliquer : `supabase/migrations/20260828000000_add_siret_to_profiles.sql`
  (colonnes `siret`, `raison_sociale`, `type_etablissement`, `siret_verified_at`).
- Variable requise : `INSEE_SIRENE_API_TOKEN` (en-tête `X-INSEE-Api-Key-Integration`).

### Paiement (carte bancaire uniquement)

Deux tunnels Stripe, chacun recalculant **tous les prix côté serveur** :

| Tunnel | Panier | Route | Page |
|---|---|---|---|
| Professionnels (HT + ligne TVA) | `contexts/ProCartContext.tsx` | `app/api/pro/checkout/route.ts` | `/commander` |
| Belles Comtoises (TTC) | `contexts/ComtoisesCartContext.tsx` | `app/api/boutique/checkout/route.ts` | `/panier-comtoises` |

Les metadata Stripe respectent le contrat du tunnel historique : commande, `order_items` Supabase et emails
fonctionnent sans modification. Le JSON des lignes est découpé sur plusieurs clés (limite Stripe de
500 caractères) — voir `lib/order-items-metadata.ts`.

### Pages conservées mais délistées

- `/napolitains` : ancienne page d'accueil « Napolitains artisanaux » (`noindex`, hors sitemap, aucun lien entrant).
- `/produits`, `/panier`, `/checkout`, `/compte`, `/prix`, `/pro` : boutique historique, dans `app/(site)/`.

## 🛠️ Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Lancer en production
npm start
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📄 Pages

### Page d'accueil (`/`)
- Hero section avec titre et CTA
- Section "Qu'est-ce qu'un napolitain ?"
- Section "Nos goûts disponibles" avec cartes produits
- CTA vers la page Pro

### Page Prix (`/prix`)
- Tableaux de prix pour tous les goûts
- Informations sur les conditionnements (100 ou 150 pièces)
- Informations légales (TVA, dates de validité)

### Page Galerie (`/galerie`)
- Grille responsive d'illustrations
- Effets de zoom au survol
- Style artisanal avec textures

### Page Pro (`/pro`)
- Solutions professionnelles pour cafés, hôtels, entreprises
- Formulaire de demande de commande
- Tarifs professionnels
- Envoi via API route (`/api/devis`)

## 🔍 SEO

- Meta tags optimisés
- OpenGraph pour les réseaux sociaux
- JSON-LD (LocalBusiness Schema)
- Sitemap (à générer)
- Robots.txt (à ajouter)

## 🔐 Mot de passe oublié

La réinitialisation du mot de passe envoie un email via Supabase. Pour que le lien fonctionne, ajoutez dans **Supabase** → **Authentication** → **URL Configuration** → **Redirect URLs** :

- En dev : `http://localhost:3000/compte/reinitialiser-mot-de-passe`
- En prod : `https://votre-domaine.com/compte/reinitialiser-mot-de-passe`

Pensez à vérifier les **spams** si l’email n’arrive pas.

## 📝 API Route

L'API route `/api/devis` reçoit les données du formulaire de commande pro (page /pro) et envoie un email. Pour la production :

- Ajouter l'envoi d'email (Resend, SendGrid, etc.)
- Sauvegarder en base de données
- Ajouter des notifications

## 🖼️ Images

Les images sont actuellement des placeholders SVG. Remplacez-les par vos vraies images dans `/public/images/` :

- `napolitain-placeholder.svg` → Image principale pour OpenGraph
- `napolitain-tasse.svg` → Hero section
- `napolitain-*.svg` → Cartes produits
- `croquis-*.svg` → Galerie
- `emballage-*.svg` → Galerie
- `logo-cacao.svg` → Galerie

