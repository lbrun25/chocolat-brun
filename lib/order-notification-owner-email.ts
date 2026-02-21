/**
 * Email de notification au propriétaire — envoyé à patisseriebrun-25@orange.fr
 * quand un client passe une commande. Inclut infos client (livraison, facturation) et produits.
 */

import type { OrderConfirmationData } from './order-confirmation-email'

const FROM_EMAIL = process.env.EMAIL_FROM || 'Cédric Brun <noreply@cedric-brun.com>'
const TO_OWNER_EMAIL = process.env.ORDER_NOTIFICATION_EMAIL || 'patisseriebrun-25@orange.fr'

export interface OrderNotificationOwnerData extends OrderConfirmationData {
  /** Facturation — optionnel si identique à livraison */
  billingFirstName?: string
  billingLastName?: string
  billingEmail?: string
  billingPhone?: string
  billingAddress?: string
  billingCity?: string
  billingPostalCode?: string
  billingCountry?: string
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

function getOrderNotificationOwnerHtml(data: OrderNotificationOwnerData): string {
  const shippingAddress = [
    data.shippingAddressLine,
    [data.shippingPostalCode, data.shippingCity].filter(Boolean).join(' '),
    data.shippingCountry,
  ]
    .filter(Boolean)
    .join(', ')

  const hasBilling =
    (data.billingFirstName && data.billingFirstName.trim()) ||
    (data.billingLastName && data.billingLastName.trim()) ||
    (data.billingAddress && data.billingAddress.trim()) ||
    (data.billingCity && data.billingCity.trim()) ||
    (data.billingPostalCode && data.billingPostalCode.trim()) ||
    (data.billingEmail && data.billingEmail.trim()) ||
    (data.billingPhone && data.billingPhone.trim())

  const billingAddress = hasBilling
    ? [
        data.billingAddress,
        [data.billingPostalCode, data.billingCity].filter(Boolean).join(' '),
        data.billingCountry,
      ]
        .filter(Boolean)
        .join(', ') || '—'
    : null

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
  <title>Nouvelle commande — ${escapeHtml(data.orderReference)}</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f0eb; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f5f0eb;">
    <tr>
      <td style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(61,41,20,0.08);">
          <tr>
            <td style="background-color:#3B1E12; padding:24px 40px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:20px; font-weight:600;">Nouvelle commande reçue</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;">
              <p style="margin:0 0 16px; color:#6b5344; font-size:15px;">Une nouvelle commande a été passée sur le site.</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#faf6f2; border-radius:8px; border:1px solid #e8e0d8; margin-bottom:20px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0; font-size:13px; color:#6b5344;"><strong>Référence :</strong> ${escapeHtml(data.orderReference)}</p>
                    <p style="margin:8px 0 0; font-size:13px; color:#6b5344;"><strong>Date :</strong> ${escapeHtml(data.orderDate)}</p>
                  </td>
                </tr>
              </table>

              <h3 style="margin:0 0 12px; color:#3d2914; font-size:16px; font-weight:600;">Client</h3>
              <p style="margin:0 0 4px; font-size:14px; color:#6b5344;">${escapeHtml(data.customerFirstName)} ${escapeHtml(data.customerLastName)}</p>
              <p style="margin:0 0 4px; font-size:14px; color:#6b5344;">Email : <a href="mailto:${escapeHtml(data.customerEmail)}" style="color:#5c4033;">${escapeHtml(data.customerEmail)}</a></p>
              ${data.customerPhone ? `<p style="margin:0 0 4px; font-size:14px; color:#6b5344;">Tél : ${escapeHtml(data.customerPhone)}</p>` : ''}
              ${data.customerCompany ? `<p style="margin:0 0 8px; font-size:14px; color:#6b5344;">Société : ${escapeHtml(data.customerCompany)}</p>` : ''}

              <h3 style="margin:20px 0 12px; color:#3d2914; font-size:16px; font-weight:600;">Livraison</h3>
              <p style="margin:0 0 8px; font-size:14px; color:#6b5344; line-height:1.5;">${escapeHtml(shippingAddress)}</p>
              ${data.deliveryNotes ? `<p style="margin:0 0 8px; font-size:14px; color:#6b5344;"><strong>Instructions :</strong> ${escapeHtml(data.deliveryNotes)}</p>` : ''}

              ${hasBilling ? `
              <h3 style="margin:20px 0 12px; color:#3d2914; font-size:16px; font-weight:600;">Facturation</h3>
              <p style="margin:0 0 4px; font-size:14px; color:#6b5344;">${[data.billingFirstName, data.billingLastName].filter(Boolean).join(' ') || '—'}</p>
              ${data.billingEmail ? `<p style="margin:0 0 4px; font-size:14px; color:#6b5344;">Email : ${escapeHtml(data.billingEmail)}</p>` : ''}
              ${data.billingPhone ? `<p style="margin:0 0 4px; font-size:14px; color:#6b5344;">Tél : ${escapeHtml(data.billingPhone)}</p>` : ''}
              <p style="margin:0 0 8px; font-size:14px; color:#6b5344; line-height:1.5;">${escapeHtml(billingAddress || '')}</p>
              ` : ''}

              <h3 style="margin:20px 0 12px; color:#3d2914; font-size:16px; font-weight:600;">Produits commandés</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e8e0d8; border-radius:8px; overflow:hidden;">
                <thead>
                  <tr style="background-color:#faf6f2;">
                    <th style="padding:12px 16px; text-align:left; font-size:12px; color:#6b5344; text-transform:uppercase;">Article</th>
                    <th style="padding:12px 16px; text-align:left; font-size:12px; color:#6b5344; text-transform:uppercase;">Conditionnement</th>
                    <th style="padding:12px 16px; text-align:center; font-size:12px; color:#6b5344; text-transform:uppercase;">Qté</th>
                    <th style="padding:12px 16px; text-align:right; font-size:12px; color:#6b5344; text-transform:uppercase;">Total TTC</th>
                  </tr>
                </thead>
                <tbody>${rows}</tbody>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:16px;">
                <tr><td style="padding:4px 0; font-size:14px; color:#6b5344;">Sous-total TTC</td><td style="padding:4px 0; font-size:14px; color:#3d2914; text-align:right;">${data.totalTTC.toFixed(2)} €</td></tr>
                <tr><td style="padding:4px 0; font-size:14px; color:#6b5344;">Frais de livraison</td><td style="padding:4px 0; font-size:14px; color:#3d2914; text-align:right;">${data.shippingCost.toFixed(2)} €</td></tr>
                <tr><td style="padding:12px 0 4px; font-size:16px; font-weight:700; color:#3d2914;">Total</td><td style="padding:12px 0 4px; font-size:16px; font-weight:700; color:#3d2914; text-align:right;">${data.totalWithShipping.toFixed(2)} €</td></tr>
              </table>
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

/**
 * Envoie l'email de notification au propriétaire (patisseriebrun-25@orange.fr).
 */
export async function sendOrderNotificationToOwner(
  data: OrderNotificationOwnerData
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY non défini : notification propriétaire non envoyée.')
    return { ok: false, error: 'RESEND_API_KEY non configuré' }
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_OWNER_EMAIL,
      replyTo: data.customerEmail,
      subject: `Nouvelle commande — ${data.orderReference} | ${data.customerFirstName} ${data.customerLastName}`,
      html: getOrderNotificationOwnerHtml(data),
    })

    if (error) {
      console.error('Erreur envoi notification propriétaire:', error)
      return { ok: false, error: String(error.message) }
    }
    return { ok: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Erreur envoi notification propriétaire:', message)
    return { ok: false, error: message }
  }
}
