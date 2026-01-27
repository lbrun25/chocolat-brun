# Chocolat BRUN - Site Vitrine

Site vitrine pour la société Chocolat BRUN, spécialisée dans la fabrication artisanale de napolitains à Charquemont (25140).

## 🚀 Technologies

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Framer Motion** (animations)
- **Next/Image** (optimisation des images)

## 📁 Structure du projet

```
/app
  /page.tsx              # Page d'accueil
  /prix/page.tsx         # Page Prix & Conditionnements
  /galerie/page.tsx      # Page Galerie
  /devis/page.tsx        # Page Demande de devis
  /api/devis/route.ts    # API route pour le formulaire de devis
  /layout.tsx            # Layout principal avec SEO
  /globals.css           # Styles globaux
/components
  /Header.tsx            # Header avec navigation sticky
  /Footer.tsx            # Footer avec informations de contact
  /NapolitainCard.tsx    # Carte produit napolitain
  /PriceTable.tsx        # Tableau de prix
  /IllustrationCard.tsx  # Carte illustration pour la galerie
/public/images           # Images placeholder (SVG)
```

## 🎨 Identité visuelle

- **Couleurs principales** :
  - Brun foncé : `#3B1E12`
  - Beige/Doré : `#F5E6C8`
  - Tons chauds et textures naturelles

- **Ambiance** : Artisanale, traditionnelle, haut de gamme

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
- CTA vers la demande de devis

### Page Prix (`/prix`)
- Tableaux de prix pour tous les goûts
- Informations sur les conditionnements (100 ou 150 pièces)
- Informations légales (TVA, dates de validité)

### Page Galerie (`/galerie`)
- Grille responsive d'illustrations
- Effets de zoom au survol
- Style artisanal avec textures

### Page Devis (`/devis`)
- Formulaire complet de demande de devis
- Validation côté client
- Envoi via API route (`/api/devis`)

## 🔍 SEO

- Meta tags optimisés
- OpenGraph pour les réseaux sociaux
- JSON-LD (LocalBusiness Schema)
- Sitemap (à générer)
- Robots.txt (à ajouter)

## 📝 API Route

L'API route `/api/devis` reçoit les données du formulaire et les affiche dans la console. Pour la production, vous pouvez :

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

## 📞 Contact

**Chocolat BRUN**
- Adresse : 2 rue du Chalet, 25140 Charquemont
- Téléphone : 03 81 44 07 36
- Email : patisseriebrun-25@orange.fr

## 📅 Licence

Tous droits réservés - Chocolat BRUN
