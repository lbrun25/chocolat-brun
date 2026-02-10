/**
 * Email de demande de commande (pro) — envoi au commerce et copie au client.
 */

const FROM_EMAIL = process.env.EMAIL_FROM || 'Cédric Brun <noreply@chocolat-brun.fr>'
const TO_COMMANDE_EMAIL = process.env.DEMANDE_COMMANDE_EMAIL || 'patisseriebrun-25@orange.fr'

export interface DemandeCommandeData {
  nom: string
  email: string
  telephone: string
  gouts: string[]
  quantite: string
  message: string
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function getDemandeCommandeEmailHtml(data: DemandeCommandeData): string {
  const goutsList = data.gouts.length ? data.gouts.map((g) => `<li>${escapeHtml(g)}</li>`).join('') : '<li>Aucun goût indiqué</li>'
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Demande de commande — Cédric Brun</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f0eb; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f5f0eb;">
    <tr>
      <td style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(61,41,20,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg, #5c4033 0%, #3d2914 100%); padding:24px 40px; text-align:center;">
              <h1 style="margin:0; color:#f5e6d3; font-size:22px; font-weight:700;">Nouvelle demande de commande (pro)</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px; color:#3d2914;">
              <p style="margin:0 0 16px; font-size:15px; line-height:1.6;">Un professionnel souhaite passer commande via le formulaire du site.</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:24px; border-collapse:collapse;">
                <tr><td style="padding:8px 0; border-bottom:1px solid #e8e0d8;"><strong>Nom</strong></td><td style="padding:8px 0; border-bottom:1px solid #e8e0d8;">${escapeHtml(data.nom)}</td></tr>
                <tr><td style="padding:8px 0; border-bottom:1px solid #e8e0d8;"><strong>Email</strong></td><td style="padding:8px 0; border-bottom:1px solid #e8e0d8;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
                <tr><td style="padding:8px 0; border-bottom:1px solid #e8e0d8;"><strong>Téléphone</strong></td><td style="padding:8px 0; border-bottom:1px solid #e8e0d8;">${escapeHtml(data.telephone)}</td></tr>
                <tr><td style="padding:8px 0; border-bottom:1px solid #e8e0d8;"><strong>Goûts souhaités</strong></td><td style="padding:8px 0; border-bottom:1px solid #e8e0d8;"><ul style="margin:0; padding-left:20px;">${goutsList}</ul></td></tr>
                <tr><td style="padding:8px 0; border-bottom:1px solid #e8e0d8;"><strong>Quantité</strong></td><td style="padding:8px 0; border-bottom:1px solid #e8e0d8;">${escapeHtml(data.quantite)}</td></tr>
                ${data.message ? `<tr><td style="padding:8px 0; border-bottom:1px solid #e8e0d8;"><strong>Message</strong></td><td style="padding:8px 0; border-bottom:1px solid #e8e0d8;">${escapeHtml(data.message)}</td></tr>` : ''}
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
      subject: `Demande de commande — ${data.nom} (${data.quantite}) | Cédric Brun`,
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
