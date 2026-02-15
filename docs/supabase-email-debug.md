# Debug des emails Supabase (confirmation d'inscription)

Ce guide permet de diagnostiquer pourquoi les emails de confirmation ne sont pas reçus.

## 1. Vérifications dans le Dashboard Supabase

### Auth → Providers → Email
- **Confirm email** : doit être activé pour envoyer des emails de confirmation
- Vérifiez que le provider Email est bien activé

### Auth → Email Templates
- Allez dans **Authentication → Email Templates**
- Vérifiez que le template **Confirm sign up** est configuré
- Le contenu doit inclure `{{ .ConfirmationURL }}` pour le lien de confirmation
- Voir `docs/supabase-auth-email-templates.md` pour les templates personnalisés

### Auth → URL Configuration
- **Site URL** : doit pointer vers votre site (ex: `https://votresite.com`)
- **Redirect URLs** : ajoutez l’URL vers laquelle l’utilisateur est redirigé après confirmation (ex: `https://votresite.com/compte`)

## 2. Logs Supabase

Dans **Logs → Auth** du Dashboard Supabase :
- Vérifiez les requêtes `POST /signup` : status 200 = inscription réussie
- Recherchez des erreurs liées à l’envoi d’email
- Les logs ne montrent pas toujours si l’email a été envoyé ou non, mais les erreurs y apparaissent

## 3. Causes courantes

### Emails en spam
- Vérifier le dossier **Spam / Courrier indésirable**
- Ajouter l’expéditeur à vos contacts
- Avec l’email par défaut Supabase (`@supabase.co` ou `@resend.com`), les fournisseurs filtrent parfois les messages

### Limites d’envoi (rate limit)
- Supabase limite le nombre d’emails par heure
- En cas de trop de tentatives : attendre puis réessayer
- Plan gratuit : environ 4 emails/heure par destinataire

### Configuration SMTP / Custom SMTP
Par défaut Supabase utilise son propre service d’envoi. Pour plus de fiabilité en production :

1. **Project Settings → Auth → SMTP Settings**
2. Configurer un serveur SMTP (Gmail, SendGrid, Mailgun, Resend, etc.)
3. Avantages : meilleure délivrabilité, moins de spam, domaines personnalisés

Exemple avec Resend (gratuit jusqu’à 3000 emails/mois) :
- Créer un compte sur [resend.com](https://resend.com)
- Récupérer la clé API
- Dans Supabase : SMTP host `smtp.resend.com`, port 465, utiliser la clé API comme mot de passe

## 4. Tester l’envoi d’email

### Inscription de test
1. Utiliser une adresse email fiable (Gmail, Outlook, etc.)
2. Éviter les emails jetables ou peu connus
3. Pour Gmail : tester avec `votreemail+test@gmail.com` (alias)

### Vérifier le destinataire
- Confirmer que l’email saisi est correct
- Pas d’espace avant/après l’adresse

## 5. Configuration recommandée en production

1. **SMTP personnalisé** : utiliser Resend, SendGrid ou Mailgun
2. **Domaine personnalisé** : envoyer depuis `noreply@votredomaine.com`
3. **SPF/DKIM** : configurer les enregistrements DNS pour réduire le passage en spam

## 6. En cas de blocage

Si les emails ne partent toujours pas :
1. Désactiver temporairement "Confirm email" pour tester le flux complet
2. Ou configurer un SMTP externe et réessayer

## Références

- [Supabase Auth - Email](https://supabase.com/docs/guides/auth/auth-email)
- [Supabase SMTP Configuration](https://supabase.com/docs/guides/auth/auth-smtp)
