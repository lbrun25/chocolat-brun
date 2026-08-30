/**
 * Email de demande professionnelle (échantillon / devis / commande).
 * Envoyé à DEMANDE_COMMANDE_EMAIL ; replyTo = email du client : « Répondre » écrit directement au client.
 */

const FROM_EMAIL = process.env.EMAIL_FROM || 'Cédric Brun <noreply@cedric-brun.com>'
const TO_COMMANDE_EMAIL = process.env.DEMANDE_COMMANDE_EMAIL || 'contact@cedric-brun.com'

export type ObjetDemandeEmail = 'echantillon' | 'devis' | 'commande'

export interface DemandeCommandeData {
  nom: string
  email: string
  telephone: string
  /** Références / goûts souhaités */
  gouts: string[]
  quantite: string
  message: string
  /** Champs landing pro (optionnels pour compatibilité avec l’ancien formulaire /pro) */
  objet?: ObjetDemandeEmail
  etablissement?: string
  typeEtablissement?: string
}

const OBJET_LABEL: Record<ObjetDemandeEmail, string> = {
  echantillon: 'Demande d’échantillon',
  devis: 'Demande de devis',
  commande: 'Demande de commande',
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function nl2br(s: string): string {
  return escapeHtml(s).replace(/\r?\n/g, '<br />')
}

function row(label: string, valueHtml: string): string {
  return `<tr><td style="padding:10px 0; border-bottom:1px solid #e8e0d8; vertical-align:top; width:38%;"><strong>${label}</strong></td><td style="padding:10px 0; border-bottom:1px solid #e8e0d8; vertical-align:top;">${valueHtml}</td></tr>`
}

export function getDemandeSubject(data: DemandeCommandeData): string {
  const objet = data.objet ? OBJET_LABEL[data.objet] : 'Demande de commande'
  const qui = data.etablissement ? `${data.etablissement} (${data.nom})` : data.nom
  const qty = data.quantite ? ` – ${data.quantite}` : ''
  return `${objet} — ${qui}${qty} | Cédric Brun`
}

export function getDemandeCommandeEmailHtml(data: DemandeCommandeData): string {
  const objet = data.objet ? OBJET_LABEL[data.objet] : 'Nouvelle demande de commande (pro)'
  const goutsList = data.gouts.length
    ? `<ul style="margin:0; padding-left:20px;">${data.gouts.map((g) => `<li>${escapeHtml(g)}</li>`).join('')}</ul>`
    : '<em>Non précisé</em>'

  const rows = [
    data.etablissement ? row('Établissement', escapeHtml(data.etablissement)) : '',
    data.typeEtablissement ? row('Type d’établissement', escapeHtml(data.typeEtablissement)) : '',
    row('Contact', escapeHtml(data.nom)),
    row('Email', `<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>`),
    row('Téléphone', `<a href="tel:${escapeHtml(data.telephone.replace(/\s+/g, ''))}">${escapeHtml(data.telephone)}</a>`),
    row('Références souhaitées', goutsList),
    data.quantite ? row('Quantité estimée', escapeHtml(data.quantite)) : '',
    data.message ? row('Message', nl2br(data.message)) : '',
  ].join('')

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(objet)} — Cédric Brun</title>
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
            <td style="padding:24px 40px 0;">
              <p style="margin:0 0 6px; font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:#9A7537;">Site professionnel · Poissons en chocolat</p>
              <h2 style="margin:0; color:#3d2914; font-size:22px; font-weight:600;">${escapeHtml(objet)}</h2>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 32px; color:#3d2914;">
              <p style="margin:0 0 16px; font-size:14px; color:#6b5344; line-height:1.6;"><em>Utilisez « Répondre » pour contacter directement le client.</em></p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:8px; border-collapse:collapse; font-size:15px; line-height:1.5;">
                ${rows}
              </table>
              <p style="margin:24px 0 0; font-size:13px; color:#6b5344;">Reçu le ${new Date().toLocaleDateString('fr-FR', { dateStyle: 'full' })} à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim()
}

export async function sendDemandeCommandeEmail(
  data: DemandeCommandeData
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY non défini : email demande de commande non envoyé.')
    return { ok: false, error: 'RESEND_API_KEY non configuré' }
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_COMMANDE_EMAIL,
      replyTo: data.email,
      subject: getDemandeSubject(data),
      html: getDemandeCommandeEmailHtml(data),
    })

    if (error) {
      console.error('Erreur envoi email demande de commande:', error)
      return { ok: false, error: String(error.message) }
    }
    return { ok: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Erreur envoi email demande de commande:', message)
    return { ok: false, error: message }
  }
}
