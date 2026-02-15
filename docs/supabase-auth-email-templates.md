# Templates emails Auth Supabase — Cédric Brun

À copier-coller dans **Supabase Dashboard → Authentication → Email Templates**.

Variables disponibles : `{{ .ConfirmationURL }}`, `{{ .Token }}` (code à 6 chiffres, utilisé notamment pour la réauthentification), `{{ .Email }}`, `{{ .SiteURL }}`, `{{ .RedirectTo }}`, `{{ .NewEmail }}` (changement d’email uniquement).

---

## 1. Confirm sign up (confirmation d’inscription)

### Sujet (Subject)
```
Confirmez votre inscription — Cédric Brun
```

### Corps (Message body — HTML)
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmez votre inscription</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f0eb; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f5f0eb;">
    <tr>
      <td style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(61,41,20,0.08);">
          <tr>
            <td style="background-color:#3B1E12; padding:32px 40px; text-align:center;">
              <img src="https://cedric-brun-web-fr.s3.eu-west-3.amazonaws.com/logo-cedric-brun.png" alt="Cédric Brun" width="220" height="46" style="display:block; margin:0 auto; max-width:100%; height:auto;" />
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <h2 style="margin:0; color:#3d2914; font-size:22px; font-weight:600;">Confirmez votre inscription</h2>
              <p style="margin:16px 0 0; color:#6b5344; font-size:15px; line-height:1.6;">Bonjour,</p>
              <p style="margin:12px 0 24px; color:#6b5344; font-size:15px; line-height:1.6;">Merci de vous être inscrit sur le site Cédric Brun. Cliquez sur le bouton ci-dessous pour confirmer votre adresse email et activer votre compte.</p>
              <p style="margin:0 0 24px; text-align:center;">
                <a href="{{ .ConfirmationURL }}" style="display:inline-block; padding:14px 28px; background:linear-gradient(135deg, #5c4033 0%, #3d2914 100%); color:#f5e6d3; font-size:15px; font-weight:600; text-decoration:none; border-radius:8px;">Confirmer mon email</a>
              </p>
              <p style="margin:0; font-size:13px; color:#8b7355;">Si le bouton ne s’affiche pas, copiez ce lien dans votre navigateur :</p>
              <p style="margin:8px 0 0; font-size:12px; color:#6b5344; word-break:break-all;">{{ .ConfirmationURL }}</p>
              <p style="margin:24px 0 0; font-size:13px; color:#8b7355;">— Cédric Brun, Maître artisan pâtissier chocolatier</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 2. Magic Link (connexion par lien)

### Sujet (Subject)
```
Votre lien de connexion — Cédric Brun
```

### Corps (Message body — HTML)
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lien de connexion</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f0eb; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f5f0eb;">
    <tr>
      <td style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(61,41,20,0.08);">
          <tr>
            <td style="background-color:#3B1E12; padding:32px 40px; text-align:center;">
              <img src="https://cedric-brun-web-fr.s3.eu-west-3.amazonaws.com/logo-cedric-brun.png" alt="Cédric Brun" width="220" height="46" style="display:block; margin:0 auto; max-width:100%; height:auto;" />
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <h2 style="margin:0; color:#3d2914; font-size:22px; font-weight:600;">Connexion à votre compte</h2>
              <p style="margin:16px 0 0; color:#6b5344; font-size:15px; line-height:1.6;">Bonjour,</p>
              <p style="margin:12px 0 24px; color:#6b5344; font-size:15px; line-height:1.6;">Cliquez sur le bouton ci-dessous pour vous connecter à votre compte Cédric Brun. Ce lien est valable une seule fois.</p>
              <p style="margin:0 0 24px; text-align:center;">
                <a href="{{ .ConfirmationURL }}" style="display:inline-block; padding:14px 28px; background:linear-gradient(135deg, #5c4033 0%, #3d2914 100%); color:#f5e6d3; font-size:15px; font-weight:600; text-decoration:none; border-radius:8px;">Se connecter</a>
              </p>
              <p style="margin:0; font-size:13px; color:#8b7355;">Si vous n’êtes pas à l’origine de cette demande, vous pouvez ignorer cet email.</p>
              <p style="margin:24px 0 0; font-size:13px; color:#8b7355;">— Cédric Brun, Maître artisan pâtissier chocolatier</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 3. Reset password (réinitialisation du mot de passe)

### Sujet (Subject)
```
Réinitialisation de votre mot de passe — Cédric Brun
```

### Corps (Message body — HTML)
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Réinitialisation du mot de passe</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f0eb; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f5f0eb;">
    <tr>
      <td style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(61,41,20,0.08);">
          <tr>
            <td style="background-color:#3B1E12; padding:32px 40px; text-align:center;">
              <img src="https://cedric-brun-web-fr.s3.eu-west-3.amazonaws.com/logo-cedric-brun.png" alt="Cédric Brun" width="220" height="46" style="display:block; margin:0 auto; max-width:100%; height:auto;" />
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <h2 style="margin:0; color:#3d2914; font-size:22px; font-weight:600;">Réinitialisation du mot de passe</h2>
              <p style="margin:16px 0 0; color:#6b5344; font-size:15px; line-height:1.6;">Bonjour,</p>
              <p style="margin:12px 0 24px; color:#6b5344; font-size:15px; line-height:1.6;">Vous avez demandé à réinitialiser le mot de passe de votre compte. Cliquez sur le bouton ci-dessous pour en définir un nouveau. Ce lien est valable un temps limité.</p>
              <p style="margin:0 0 24px; text-align:center;">
                <a href="{{ .ConfirmationURL }}" style="display:inline-block; padding:14px 28px; background:linear-gradient(135deg, #5c4033 0%, #3d2914 100%); color:#f5e6d3; font-size:15px; font-weight:600; text-decoration:none; border-radius:8px;">Choisir un nouveau mot de passe</a>
              </p>
              <p style="margin:0; font-size:13px; color:#8b7355;">Si vous n’êtes pas à l’origine de cette demande, ignorez cet email ; votre mot de passe ne sera pas modifié.</p>
              <p style="margin:24px 0 0; font-size:13px; color:#8b7355;">— Cédric Brun, Maître artisan pâtissier chocolatier</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 4. Change email address (changement d’adresse email)

### Sujet (Subject)
```
Confirmez votre nouvelle adresse email — Cédric Brun
```

### Corps (Message body — HTML)
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation du changement d’email</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f0eb; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f5f0eb;">
    <tr>
      <td style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(61,41,20,0.08);">
          <tr>
            <td style="background-color:#3B1E12; padding:32px 40px; text-align:center;">
              <img src="https://cedric-brun-web-fr.s3.eu-west-3.amazonaws.com/logo-cedric-brun.png" alt="Cédric Brun" width="220" height="46" style="display:block; margin:0 auto; max-width:100%; height:auto;" />
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <h2 style="margin:0; color:#3d2914; font-size:22px; font-weight:600;">Changement d’adresse email</h2>
              <p style="margin:16px 0 0; color:#6b5344; font-size:15px; line-height:1.6;">Bonjour,</p>
              <p style="margin:12px 0 24px; color:#6b5344; font-size:15px; line-height:1.6;">Vous avez demandé à associer votre compte à la nouvelle adresse <strong>{{ .NewEmail }}</strong>. Cliquez sur le bouton ci-dessous pour confirmer ce changement.</p>
              <p style="margin:0 0 24px; text-align:center;">
                <a href="{{ .ConfirmationURL }}" style="display:inline-block; padding:14px 28px; background:linear-gradient(135deg, #5c4033 0%, #3d2914 100%); color:#f5e6d3; font-size:15px; font-weight:600; text-decoration:none; border-radius:8px;">Confirmer la nouvelle adresse</a>
              </p>
              <p style="margin:0; font-size:13px; color:#8b7355;">Si vous n’êtes pas à l’origine de cette demande, ignorez cet email.</p>
              <p style="margin:24px 0 0; font-size:13px; color:#8b7355;">— Cédric Brun, Maître artisan pâtissier chocolatier</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 5. Reauthentication (réauthentification)

Utilisé quand l’utilisateur doit confirmer son identité avant une action sensible (ex. changement de mot de passe, suppression de compte). Supabase envoie un code à usage unique.

### Sujet (Subject)
```
Confirmez votre identité — Cédric Brun
```

### Corps (Message body — HTML)
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de votre identité</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f0eb; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f5f0eb;">
    <tr>
      <td style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(61,41,20,0.08);">
          <tr>
            <td style="background-color:#3B1E12; padding:32px 40px; text-align:center;">
              <img src="https://cedric-brun-web-fr.s3.eu-west-3.amazonaws.com/logo-cedric-brun.png" alt="Cédric Brun" width="220" height="46" style="display:block; margin:0 auto; max-width:100%; height:auto;" />
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <h2 style="margin:0; color:#3d2914; font-size:22px; font-weight:600;">Confirmez votre identité</h2>
              <p style="margin:16px 0 0; color:#6b5344; font-size:15px; line-height:1.6;">Bonjour,</p>
              <p style="margin:12px 0 24px; color:#6b5344; font-size:15px; line-height:1.6;">Vous effectuez une action qui nécessite de confirmer votre identité. Saisissez le code ci-dessous sur le site pour continuer.</p>
              <p style="margin:0 0 24px; text-align:center;">
                <span style="display:inline-block; padding:16px 32px; background-color:#faf6f2; border:2px solid #e8e0d8; border-radius:8px; font-size:28px; font-weight:700; letter-spacing:0.2em; color:#3d2914;">{{ .Token }}</span>
              </p>
              <p style="margin:0; font-size:13px; color:#8b7355;">Ce code est valable un temps limité. Si vous n’êtes pas à l’origine de cette demande, ignorez cet email.</p>
              <p style="margin:24px 0 0; font-size:13px; color:#8b7355;">— Cédric Brun, Maître artisan pâtissier chocolatier</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 6. Invite user (invitation)

### Sujet (Subject)
```
Vous êtes invité — Cédric Brun
```

### Corps (Message body — HTML)
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invitation</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f0eb; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f5f0eb;">
    <tr>
      <td style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(61,41,20,0.08);">
          <tr>
            <td style="background-color:#3B1E12; padding:32px 40px; text-align:center;">
              <img src="https://cedric-brun-web-fr.s3.eu-west-3.amazonaws.com/logo-cedric-brun.png" alt="Cédric Brun" width="220" height="46" style="display:block; margin:0 auto; max-width:100%; height:auto;" />
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <h2 style="margin:0; color:#3d2914; font-size:22px; font-weight:600;">Vous êtes invité</h2>
              <p style="margin:16px 0 0; color:#6b5344; font-size:15px; line-height:1.6;">Bonjour,</p>
              <p style="margin:12px 0 24px; color:#6b5344; font-size:15px; line-height:1.6;">Vous avez été invité à rejoindre Cédric Brun. Cliquez sur le bouton ci-dessous pour accepter l’invitation et créer votre compte.</p>
              <p style="margin:0 0 24px; text-align:center;">
                <a href="{{ .ConfirmationURL }}" style="display:inline-block; padding:14px 28px; background:linear-gradient(135deg, #5c4033 0%, #3d2914 100%); color:#f5e6d3; font-size:15px; font-weight:600; text-decoration:none; border-radius:8px;">Accepter l’invitation</a>
              </p>
              <p style="margin:24px 0 0; font-size:13px; color:#8b7355;">— Cédric Brun, Maître artisan pâtissier chocolatier</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## Où les coller dans Supabase

1. **Supabase Dashboard** → **Authentication** → **Email Templates**.
2. Pour chaque type (Confirm sign up, Invite user, Magic link, Change email address, Reset password, Reauthentication) :
   - **Subject** : copier le **Sujet** ci-dessus.
   - **Message** (ou **Body**) : coller tout le bloc **HTML** correspondant (sans les balises ` ```html ` et ` ``` `).

Les variables `{{ .ConfirmationURL }}`, `{{ .Token }}`, `{{ .Email }}`, `{{ .NewEmail }}` sont remplacées automatiquement par Supabase ; ne pas les modifier.
