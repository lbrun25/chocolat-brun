# Configuration Stripe

Ce guide vous explique comment configurer Stripe pour le système de paiement.

## 1. Créer un compte Stripe

1. Allez sur [https://stripe.com](https://stripe.com)
2. Créez un compte (gratuit)
3. Accédez au tableau de bord Stripe

## 2. Récupérer les clés API

### Mode Test (Développement)

1. Dans le tableau de bord Stripe, allez dans **Developers** > **API keys**
2. Copiez la **Publishable key** (commence par `pk_test_...`)
3. Copiez la **Secret key** (commence par `sk_test_...`)

### Mode Production

1. Basculez en mode **Live** dans le tableau de bord
2. Récupérez les clés de production (commencent par `pk_live_...` et `sk_live_...`)

## 3. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec :

```env
# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Stripe - Mode Test
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_publique
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete
STRIPE_WEBHOOK_SECRET=whsec_votre_secret_webhook
```

Pour la production, remplacez par les clés `live` et mettez à jour `NEXT_PUBLIC_SITE_URL` avec votre URL de production.

## 4. Configurer le Webhook Stripe

### En développement (avec Stripe CLI)

1. Installez la [Stripe CLI](https://stripe.com/docs/stripe-cli)
2. Connectez-vous : `stripe login`
3. Redirigez les webhooks vers votre serveur local :
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```
4. Copiez le secret du webhook affiché (commence par `whsec_...`) dans votre `.env.local`

### En production

1. Dans le tableau de bord Stripe, allez dans **Developers** > **Webhooks**
2. Cliquez sur **Add endpoint**
3. URL : `https://votre-domaine.com/api/webhook`
4. Sélectionnez les événements :
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copiez le **Signing secret** (commence par `whsec_...`) dans vos variables d'environnement

## 5. Tester le paiement

1. Utilisez les cartes de test Stripe :
   - **Succès** : `4242 4242 4242 4242`
   - **Échec** : `4000 0000 0000 0002`
   - Date d'expiration : n'importe quelle date future
   - CVC : n'importe quel 3 chiffres

2. Testez le flux complet :
   - Ajouter des produits au panier
   - Aller au panier
   - Remplir le formulaire de checkout
   - Procéder au paiement avec une carte de test

## 6. Activer le mode Production

Une fois prêt pour la production :

1. Mettez à jour vos variables d'environnement avec les clés `live`
2. Configurez le webhook en production
3. Testez avec de vraies cartes en mode test d'abord
4. Activez les paiements réels

## Ressources

- [Documentation Stripe](https://stripe.com/docs)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Webhooks Stripe](https://stripe.com/docs/webhooks)
