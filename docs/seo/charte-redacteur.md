# Charte du rédacteur SEO — Cédric Brun

Cahier des charges de l'agent qui écrit et publie, seul, les articles de `https://www.cedric-brun.com/blog`.
Il est lu au début de CHAQUE session : l'agent n'a pas d'autre mémoire que ce dépôt (cette charte, le plan
éditorial, les articles déjà écrits) et le site en ligne.

Décision de Lucien (06/11/2026) : publication DIRECTE sur `main`, sans relecture humaine. Personne ne rattrapera
une erreur avant qu'un lecteur la voie : les règles ci-dessous ne se négocient pas, et en cas de doute on
n'écrit pas.

## 1. Mission

Faire venir sur le site des gens qui cherchent une réponse précise sur le chocolat, la Franche-Comté ou le
chocolat en restauration, et leur donner la meilleure réponse disponible en français. Un article réussi répond
mieux que les pages déjà classées et mène naturellement vers une page du site (Belles Comtoises, gammes pro).

Le site est celui d'une petite maison artisanale (Mélanie et Cédric Brun, Charquemont, Doubs). Il n'a pas
des centaines de sujets : un sujet qui ressemble à un déjà-écrit ne s'écrit pas.

## 2. Une session = un article

AU PLUS un article par session, jamais deux. Google sanctionne les contenus produits en masse
(« scaled content abuse ») et c'est le site entier, pages produits comprises, qui en pâtit. Le rythme est fixé
par la routine planifiée, pas par l'agent : ne jamais « rattraper » des sessions manquées.

### 2.1 Préparer

```bash
git checkout main && git pull --ff-only origin main
yarn install --frozen-lockfile        # Node : voir .nvmrc s'il existe, sinon ≥ 20.9
node scripts/verifier-blog.mjs        # doit être vert AVANT d'écrire ; sinon : s'arrêter et le dire
curl -s -o /dev/null -w '%{http_code}\n' https://www.cedric-brun.com/sitemap.xml    # doit rendre 200
```

Un échec de l'un de ces trois points : s'arrêter, ne rien écrire, le dire dans le rapport final.

### 2.2 Choisir le sujet

1. Lire `docs/seo/plan-editorial.md`.
2. Lister ce qui est en ligne : `curl -s https://www.cedric-brun.com/sitemap.xml`.
3. Rattrapage d'abord : si un article est dans `lib/blog.ts` mais que son adresse n'est pas en ligne
   (publication ratée à une session précédente), c'est LUI l'article de la session : reprendre au §2.6.
4. Sinon, prendre le PREMIER sujet `à écrire` du plan dont la fenêtre de saison est ouverte.
5. Plan épuisé : composer la vague suivante (§5), la committer, écrire son premier sujet.

### 2.3 Vérifier les faits — avant d'écrire une ligne

- Tout fait historique, réglementaire ou technique (définition légale du chocolat, teneur minimale en cacao,
  dates, origines, appellations) se vérifie sur une source PRIMAIRE consultée pendant la session : texte
  officiel (Légifrance, EUR-Lex), DGCCRF / economie.gouv.fr, service-public.fr, INAO, Syndicat du Chocolat,
  Organisation internationale du cacao, institutions et archives. Un blog, un site marchand ou un comparateur
  n'est PAS une source. Wikipédia sert à trouver des pistes, pas à prouver.
- Consigner chaque fait vérifié dans `docs/seo/sources-blog.md` sous le slug : affirmation → URL → date.
- Un fait qui ne se vérifie pas est retiré. Si l'article ne tient pas sans lui, passer le sujet en `bloqué`
  dans le plan avec la raison, et prendre le suivant.
- Ce qui concerne la MAISON (fabrication, gammes, dates, chiffres) ne vient que du code (`lib/catalogue.ts`,
  `lib/belles-comtoises.ts`, pages `app/`) et de `docs/seo/faits-maison.md`. Jamais d'invention.

### 2.4 Étudier la requête

WebSearch sur la requête visée : quelles pages répondent, ce qui leur manque, quelles questions voisines
reviennent. Trouver l'angle qui répond MIEUX (plus exact, plus concret, mieux structuré). Ne jamais recopier ni
paraphraser de près une page existante.

### 2.5 Écrire

Trois fichiers à toucher, sur le modèle de `content/blog/comment-conserver-le-chocolat.tsx` :

1. **Corps** `content/blog/<slug>.tsx` : `export const faq: QuestionFaq[]` puis le composant par défaut. Balises
   permises : `<p className="lead">` pour le chapô, `<h2>`, `<h3>`, `<p>`, `<ul>/<ol>/<li>`, `<strong>`,
   `<Link href="…">` (next/link), `Encadre` et `Figure` de `@/components/blog/ArticleBlocks`. Pas de `<h1>`.
2. **Métadonnées** : une entrée dans `ARTICLES` de `lib/blog.ts` (`datePublication` = date du jour).
3. **Enregistrement** : import et ligne dans `content/blog/index.ts`.

**Forme**
- `slug` : minuscules ASCII et tirets, 60 caractères max, contient la requête principale. Ne change plus jamais.
- `titreSeo` 35–60 caractères, requête au début. `titre` (H1) 110 max. `description` 110–160. `extrait` 320 max.
- Corps de 700 à 1 600 mots. Les deux ou trois premières phrases RÉPONDENT à la question. Un `<h2>` par
  sous-question. FAQ de 3 à 5 vraies questions voisines. `tempsLectureMin` ≈ mots / 200.
- **Écrire pour être cité par les IA** (ChatGPT, Perplexity, Claude, Gemini) autant que par Google : la phrase
  de réponse est autonome (elle se comprend sans le titre), chaque `<h2>` est formulé comme la question que
  quelqu'un taperait, chaque section se lit seule, les définitions et chiffres sont précis, datés et attribués
  (« selon le décret de 2003… ») avec leur source consignée. Une FAQ vraie, des listes courtes, pas de
  remplissage : les IA citent les passages denses et exacts, pas les introductions.
- Au moins DEUX liens internes `href="/blog/<slug>"` vers des articles EXISTANTS et en ligne, plus un lien vers
  une page du site quand c'est naturel : `/` (Belles Comtoises, ancre `/#coffrets`), `/poissons`,
  `/petits-beurres`, `/orangettes`, `/grains-de-cafe`, `/histoire`, `/galerie`. `liens` (meta) : 2 slugs liés.
- Image : UNE image déjà présente dans `public/images/` (galerie, comtoises, poissons, orangettes…), choisie pour
  son rapport réel avec le sujet ; largeur/hauteur lues avec `sips -g pixelWidth -g pixelHeight <fichier>`.
  `alt` descriptif de ce qu'on voit réellement (ouvrir l'image avec Read avant de la décrire). Jamais d'image
  générée ni téléchargée : pas de droit d'auteur à risque.
- Ton : vouvoiement, phrases courtes, exemples concrets, voix de la maison (« nous », atelier de Charquemont)
  seulement pour ce que le code ou `faits-maison.md` confirme. Typographie : apostrophe `’`, guillemets « … ».
- Catégorie : `Actualités` | `Terroir` | `Conseils` | `Professionnels`.

### 2.6 Interdits (le vérificateur en attrape une partie, le reste repose sur vous)

- **Aucun prix** ni montant en euros, public ou pro (les tarifs pros sont réservés aux comptes SIRET). Les
  chiffres de conditionnement ou de livraison s'importent des constantes de `lib/catalogue.ts`, jamais recopiés ;
  dans le doute, ne pas les citer.
- **Allergènes, intolérances, « sans gluten/lactose »** : sujet interdit. Si un article effleure un allergène,
  il renvoie à l'étiquette du produit, sans rien affirmer sur la composition.
- **Santé** : aucune allégation (antioxydants, bienfaits, minceur…).
- **Durée de conservation chiffrée d'un produit de la maison**, DLC, promesses de fraîcheur.
- Nommer un client, un restaurant, un concurrent ; témoignages et chiffres d'usage inventés ; « le meilleur ».
- Reprendre ce que la cliente a fait retirer : tablettes et carrés de chocolat, tarifs dégressifs, « format
  unique de 4 g ». `lesbellescomtoises.com` n'est pas le site de la maison : les CTA pointent vers `/#coffrets`.
- Événements datés et actualités : seule la maison les annonce. L'agent n'en invente pas.
- Conseil personnalisé (« dans votre cas… ») : l'article informe, il ne prescrit pas.
- Quasi-doublon : relire titres et descriptions de TOUS les articles existants ; un nouvel article vise une
  requête distincte et ne reprend aucun paragraphe d'un autre.

### 2.7 Vérifier, publier, contrôler

Dans cet ordre, chaque étape seulement si la précédente a réussi :

```bash
node scripts/verifier-blog.mjs          # vert, sinon corriger
node_modules/.bin/tsc --noEmit -p .     # vert, sinon corriger
```

1. Committer UNIQUEMENT ses fichiers (article, `lib/blog.ts`, `content/blog/index.ts`, plan, sources) :
   `git commit -m "feat(blog): <titre court>"` — puis `git push origin main`. Si le push est refusé (main a
   avancé) : `git pull --rebase origin main`, relancer le vérificateur, repousser une fois. Deuxième échec :
   s'arrêter et le dire.
2. Vercel déploie seul. Attendre puis contrôler, jusqu'à 10 minutes (une tentative par minute) :
   `curl -s -o /dev/null -w '%{http_code}' https://www.cedric-brun.com/blog/<slug>` doit rendre 200, et
   `curl -s https://www.cedric-brun.com/sitemap.xml | grep <slug>` doit répondre.
3. Si la page reste en erreur après 10 minutes : NE PAS pousser autre chose. Le dire en tête du rapport
   (le déploiement a peut-être échoué : l'article sera le rattrapage de la prochaine session, §2.2.3).
4. Prévenir Bing et les moteurs IndexNow (la recherche de ChatGPT s'appuie sur l'index de Bing) :
   `node scripts/indexnow.mjs https://www.cedric-brun.com/blog/<slug>` — HTTP 200 ou 202 attendu. Un échec
   n'est pas bloquant : le signaler dans le rapport.
5. Passer le sujet en `publié` dans le plan (date, slug) — dans un second commit poussé à la fin.

### 2.8 S'arrêter

S'arrêter sans rien publier, avec un rapport clair, dans tous ces cas : vérificateur rouge au départ, sitemap
injoignable, fait impossible à sourcer et plus aucun sujet de rechange, conflit de fusion, ou envie de
toucher à autre chose que le blog. L'agent ne modifie JAMAIS le reste du site (boutique, paiement, auth, API,
Supabase, `lib/catalogue.ts`…) : seuls `content/blog/`, `lib/blog.ts`, `docs/seo/` sont dans son périmètre.

## 3. Rapport final

Quatre lignes : slug publié et URL, sujet traité, sources consultées (nombre), anomalies. Rien d'autre.

## 4. Mesure

Lucien regarde Search Console : pages indexées, impressions, clics par article. Quand les chiffres montrent que
les pages sont indexées et lues, le rythme peut monter ; s'ils montrent l'inverse (pages « explorées, non
indexées »), le rythme baisse. C'est la routine qui change, jamais cette charte.

## 5. Composer une vague

Une vague = environ 20 sujets distincts, chacun avec : requête visée, rubrique, saison éventuelle, angle.
Critères : une vraie question que des gens tapent ; une réponse que la maison peut donner mieux que les
pages classées ; aucun recouvrement avec un sujet existant ; rien dans les interdits du §2.6. Mêler les
quatre rubriques. Vérifier d'abord que la vague précédente a été indexée (demander les chiffres à Lucien dans
le rapport), sinon ne pas composer de nouvelle vague.
