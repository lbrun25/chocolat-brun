/**
 * Email de confirmation de commande — template HTML professionnel
 * Utilisable avec Resend ou tout service d'envoi d'emails.
 */

export interface OrderItemEmail {
  product_name: string
  packaging: string
  quantity: number
  price_ttc: number
}

export interface OrderConfirmationData {
  customerFirstName: string
  customerLastName: string
  customerEmail: string
  customerPhone?: string
  customerCompany?: string
  /** Adresse de livraison sur une ligne */
  shippingAddressLine: string
  shippingCity: string
  shippingPostalCode: string
  shippingCountry: string
  deliveryNotes?: string
  orderItems: OrderItemEmail[]
  totalHT: number
  totalTTC: number
  shippingCost: number
  totalWithShipping: number
  /** Ex: cs_test_xxx ou numéro de commande court */
  orderReference: string
  /** Date de la commande (ex: 4 février 2026) */
  orderDate: string
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://chocolat-brun.vercel.app'
const FROM_EMAIL = process.env.EMAIL_FROM || 'Cédric Brun <noreply@chocolat-brun.fr>'
const FROM_NAME = 'Cédric Brun — Maître artisan pâtissier chocolatier'

/**
 * Génère le HTML de l'email de confirmation de commande.
 */
export function getOrderConfirmationEmailHtml(data: OrderConfirmationData): string {
  const fullAddress = [
    data.shippingAddressLine,
    [data.shippingPostalCode, data.shippingCity].filter(Boolean).join(' '),
    data.shippingCountry,
  ]
    .filter(Boolean)
    .join(', ')

  const rows = data.orderItems
    .map(
      (item) => `
    <tr>
      <td style="padding:12px 16px; border-bottom:1px solid #e8e0d8; color:#3d2914;">${escapeHtml(item.product_name)}</td>
      <td style="padding:12px 16px; border-bottom:1px solid #e8e0d8; color:#3d2914;">${escapeHtml(item.packaging)}</td>
      <td style="padding:12px 16px; border-bottom:1px solid #e8e0d8; color:#3d2914; text-align:center;">${item.quantity}</td>
      <td style="padding:12px 16px; border-bottom:1px solid #e8e0d8; color:#3d2914; text-align:right;">${(item.quantity * item.price_ttc).toFixed(2)} €</td>
    </tr>`
    )
    .join('')

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de commande — ${FROM_NAME}</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f0eb; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f5f0eb;">
    <tr>
      <td style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(61,41,20,0.08);">
          <!-- En-tête -->
          <tr>
            <td style="background:linear-gradient(135deg, #5c4033 0%, #3d2914 100%); padding:32px 40px; text-align:center;">
              <h1 style="margin:0; color:#f5e6d3; font-size:24px; font-weight:700; letter-spacing:0.02em;">Cédric Brun</h1>
              <p style="margin:8px 0 0; color:#e8d5c4; font-size:13px; letter-spacing:0.08em; text-transform:uppercase;">Maître artisan pâtissier chocolatier depuis 1999</p>
            </td>
          </tr>
          <!-- Titre -->
          <tr>
            <td style="padding:32px 40px 16px;">
              <h2 style="margin:0; color:#3d2914; font-size:22px; font-weight:600;">Confirmation de votre commande</h2>
              <p style="margin:12px 0 0; color:#6b5344; font-size:15px; line-height:1.5;">Bonjour ${escapeHtml(data.customerFirstName || '')} ${escapeHtml(data.customerLastName || '')},</p>
              <p style="margin:16px 0 0; color:#6b5344; font-size:15px; line-height:1.6;">Nous avons bien reçu votre commande et votre paiement. Merci pour votre confiance.</p>
            </td>
          </tr>
          <!-- Référence et date -->
          <tr>
            <td style="padding:0 40px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#faf6f2; border-radius:8px; border:1px solid #e8e0d8;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0; font-size:13px; color:#6b5344;"><strong>Référence :</strong> ${escapeHtml(data.orderReference)}</p>
                    <p style="margin:8px 0 0; font-size:13px; color:#6b5344;"><strong>Date :</strong> ${escapeHtml(data.orderDate)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Récap articles -->
          <tr>
            <td style="padding:0 40px 8px;">
              <h3 style="margin:0; color:#3d2914; font-size:16px; font-weight:600;">Récapitulatif de la commande</h3>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e8e0d8; border-radius:8px; overflow:hidden;">
                <thead>
                  <tr style="background-color:#faf6f2;">
                    <th style="padding:12px 16px; text-align:left; font-size:12px; color:#6b5344; text-transform:uppercase; letter-spacing:0.04em;">Article</th>
                    <th style="padding:12px 16px; text-align:left; font-size:12px; color:#6b5344; text-transform:uppercase; letter-spacing:0.04em;">Conditionnement</th>
                    <th style="padding:12px 16px; text-align:center; font-size:12px; color:#6b5344; text-transform:uppercase; letter-spacing:0.04em;">Qté</th>
                    <th style="padding:12px 16px; text-align:right; font-size:12px; color:#6b5344; text-transform:uppercase; letter-spacing:0.04em;">Total TTC</th>
                  </tr>
                </thead>
                <tbody>
                  ${rows}
                </tbody>
              </table>
            </td>
          </tr>
          <!-- Totaux -->
          <tr>
            <td style="padding:0 40px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr><td style="padding:4px 0; font-size:14px; color:#6b5344;">Sous-total TTC</td><td style="padding:4px 0; font-size:14px; color:#3d2914; text-align:right;">${data.totalTTC.toFixed(2)} €</td></tr>
                <tr><td style="padding:4px 0; font-size:14px; color:#6b5344;">Frais de livraison</td><td style="padding:4px 0; font-size:14px; color:#3d2914; text-align:right;">${data.shippingCost.toFixed(2)} €</td></tr>
                <tr><td style="padding:12px 0 4px; font-size:16px; font-weight:700; color:#3d2914;">Total</td><td style="padding:12px 0 4px; font-size:16px; font-weight:700; color:#3d2914; text-align:right;">${data.totalWithShipping.toFixed(2)} €</td></tr>
              </table>
            </td>
          </tr>
          <!-- Livraison -->
          <tr>
            <td style="padding:0 40px 24px;">
              <h3 style="margin:0; color:#3d2914; font-size:16px; font-weight:600;">Adresse de livraison</h3>
              <p style="margin:12px 0 0; font-size:14px; color:#6b5344; line-height:1.6;">${escapeHtml(fullAddress)}</p>
              ${data.deliveryNotes ? `<p style="margin:12px 0 0; font-size:14px; color:#6b5344; line-height:1.6;"><strong>Instructions :</strong> ${escapeHtml(data.deliveryNotes)}</p>` : ''}
            </td>
          </tr>
          <!-- Pied -->
          <tr>
            <td style="padding:24px 40px 32px; background-color:#faf6f2; border-top:1px solid #e8e0d8;">
              <p style="margin:0; font-size:14px; color:#6b5344; line-height:1.6;">Vous recevrez un email avec le numéro de suivi dès l'expédition de votre colis.</p>
              <p style="margin:16px 0 0; font-size:14px; color:#6b5344; line-height:1.6;">Pour toute question : <a href="mailto:patisseriebrun-25@orange.fr" style="color:#5c4033; font-weight:600; text-decoration:none;">patisseriebrun-25@orange.fr</a></p>
              <p style="margin:24px 0 0; font-size:13px; color:#8b7355;">— Cédric Brun, Maître artisan pâtissier chocolatier</p>
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

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return String(text).replace(/[&<>"']/g, (c) => map[c] ?? c)
}

/**
 * Version texte brut (fallback pour clients email).
 */
export function getOrderConfirmationEmailText(data: OrderConfirmationData): string {
  const fullAddress = [
    data.shippingAddressLine,
    [data.shippingPostalCode, data.shippingCity].filter(Boolean).join(' '),
    data.shippingCountry,
  ]
    .filter(Boolean)
    .join(', ')

  const lines = [
    'Cédric Brun — Maître artisan pâtissier chocolatier depuis 1999',
    '',
    'Confirmation de votre commande',
    `Bonjour ${data.customerFirstName} ${data.customerLastName},`,
    'Nous avons bien reçu votre commande et votre paiement. Merci pour votre confiance.',
    '',
    `Référence : ${data.orderReference}`,
    `Date : ${data.orderDate}`,
    '',
    'Récapitulatif de la commande',
    '—'.repeat(40),
    ...data.orderItems.map(
      (item) =>
        `${item.product_name} — ${item.packaging} × ${item.quantity} = ${(item.quantity * item.price_ttc).toFixed(2)} €`
    ),
    '—'.repeat(40),
    `Sous-total TTC : ${data.totalTTC.toFixed(2)} €`,
    `Frais de livraison : ${data.shippingCost.toFixed(2)} €`,
    `Total : ${data.totalWithShipping.toFixed(2)} €`,
    '',
    'Adresse de livraison',
    fullAddress,
    data.deliveryNotes ? `Instructions : ${data.deliveryNotes}` : '',
    '',
    "Vous recevrez un email avec le numéro de suivi dès l'expédition.",
    'Contact : patisseriebrun-25@orange.fr',
    '',
    '— Cédric Brun',
  ]
  return lines.join('\n')
}

/**
 * Envoie l'email de confirmation via Resend (si RESEND_API_KEY est défini).
 */
export async function sendOrderConfirmationEmail(
  data: OrderConfirmationData
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY non défini : email de confirmation non envoyé.')
    return { ok: false, error: 'RESEND_API_KEY non configuré' }
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.customerEmail,
      subject: `Confirmation de commande — ${data.orderReference} | Cédric Brun`,
      html: getOrderConfirmationEmailHtml(data),
      text: getOrderConfirmationEmailText(data),
    })

    if (error) {
      console.error('Erreur envoi email confirmation:', error)
      return { ok: false, error: String(error.message) }
    }
    return { ok: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Erreur envoi email confirmation:', message)
    return { ok: false, error: message }
  }
}
