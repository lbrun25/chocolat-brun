'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import type { Order } from '@/lib/order-utils'
import { getShippingAddressLines, getBillingAddressLines, hasShippingAddress, hasBillingAddress } from '@/lib/order-utils'

interface Props {
  orders: Order[]
}

export default function ProfileSection({ orders }: Props) {
  const { user, profile, refreshProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ first_name: '', last_name: '', phone: '', company: '' })

  if (!user || !profile) return null

  const lastShippingOrder = orders.find(o => o.status === 'paid' && hasShippingAddress(o))
  const lastBillingOrder = orders.find(o => o.status === 'paid' && hasBillingAddress(o))
  const hasPaidOrder = orders.some(o => o.status === 'paid')

  const startEditing = () => {
    setForm({
      first_name: profile.first_name ?? '',
      last_name: profile.last_name ?? '',
      phone: profile.phone ?? '',
      company: profile.company ?? '',
    })
    setError(null)
    setEditing(true)
  }

  const save = async () => {
    setSaving(true)
    setError(null)
    try {
      const { error: err } = await supabase
        .from('profiles')
        .update({
          first_name: form.first_name.trim() || null,
          last_name: form.last_name.trim() || null,
          phone: form.phone.trim() || null,
          company: form.company.trim() || null,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
      if (err) throw err
      await refreshProfile()
      setEditing(false)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur lors de l\'enregistrement')
    } finally {
      setSaving(false)
    }
  }

  const cancel = () => { setEditing(false); setError(null) }

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white rounded-2xl shadow-lg border border-chocolate-light/50 p-6 md:p-8 mb-8"
    >
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-chocolate-dark font-serif">Mes informations</h2>
        {!editing ? (
          <button type="button" onClick={startEditing} className="px-4 py-2 bg-chocolate-dark text-chocolate-light rounded-lg font-semibold hover:bg-chocolate-dark/90 transition-colors">
            Modifier
          </button>
        ) : (
          <div className="flex gap-2">
            <button type="button" onClick={cancel} className="px-4 py-2 bg-chocolate-dark/10 text-chocolate-dark rounded-lg font-semibold hover:bg-chocolate-dark/20 transition-colors">
              Annuler
            </button>
            <button type="button" onClick={save} disabled={saving} className="px-4 py-2 bg-chocolate-dark text-chocolate-light rounded-lg font-semibold hover:bg-chocolate-dark/90 transition-colors disabled:opacity-50">
              {saving ? 'Enregistrement…' : 'Enregistrer'}
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <EditForm form={form} setForm={setForm} error={error} />
      ) : (
        <ReadView
          profile={profile}
          capitalize={capitalize}
          lastShippingOrder={lastShippingOrder}
          lastBillingOrder={lastBillingOrder}
          hasPaidOrder={hasPaidOrder}
        />
      )}
    </motion.div>
  )
}

function EditForm({ form, setForm, error }: {
  form: { first_name: string; last_name: string; phone: string; company: string }
  setForm: React.Dispatch<React.SetStateAction<typeof form>>
  error: string | null
}) {
  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [field]: e.target.value }))

  return (
    <div className="space-y-6">
      <p className="text-sm text-chocolate-dark/70">
        Ces informations sont utilisées pour pré-remplir le formulaire lors de vos prochaines commandes.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Field id="compte-last_name" label="Nom" value={form.last_name} onChange={update('last_name')} placeholder="Votre nom" />
        <Field id="compte-first_name" label="Prénom" value={form.first_name} onChange={update('first_name')} placeholder="Votre prénom" />
        <Field id="compte-phone" label="Téléphone" value={form.phone} onChange={update('phone')} placeholder="06 12 34 56 78" type="tel" />
      </div>
      <Field id="compte-company" label="Entreprise (optionnel)" value={form.company} onChange={update('company')} placeholder="Nom de l'entreprise" />
      <p className="text-sm text-chocolate-dark/60">
        L&apos;adresse de livraison est renseignée à chaque commande au checkout.
      </p>
      {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
    </div>
  )
}

function Field({ id, label, value, onChange, placeholder, type = 'text' }: {
  id: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; type?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-chocolate-dark/70 mb-1">{label}</label>
      <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border-2 border-chocolate-dark/30 focus:outline-none focus:border-chocolate-dark" />
    </div>
  )
}

function ReadView({ profile, capitalize, lastShippingOrder, lastBillingOrder, hasPaidOrder }: {
  profile: { first_name: string | null; last_name: string | null; phone: string | null; company: string | null; is_guest: boolean }
  capitalize: (s: string) => string
  lastShippingOrder?: Order
  lastBillingOrder?: Order
  hasPaidOrder: boolean
}) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-chocolate-dark/70 mb-6">
        Ces informations sont utilisées pour pré-remplir le formulaire lors de vos prochaines commandes.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-8 md:gap-x-12 gap-y-4 md:gap-y-5">
        <InfoRow label="Nom" value={profile.last_name ? profile.last_name.toUpperCase() : 'Non renseigné'} />
        <InfoRow label="Prénom" value={profile.first_name ? capitalize(profile.first_name) : 'Non renseigné'} />
        <InfoRow label="Numéro de téléphone" value={profile.phone || 'Non renseigné'} />

        <p className="text-sm text-chocolate-dark/70 md:py-0.5">Adresse de livraison</p>
        <div className="font-semibold text-chocolate-dark md:py-0.5">
          {lastShippingOrder ? (
            <ShippingAddressBlock order={lastShippingOrder} />
          ) : (
            <p>Renseignée à chaque commande</p>
          )}
        </div>

        {hasPaidOrder && (
          <>
            <p className="text-sm text-chocolate-dark/70 md:py-0.5">Adresse de facturation</p>
            <div className="font-semibold text-chocolate-dark md:py-0.5">
              {lastBillingOrder ? (
                <BillingAddressBlock order={lastBillingOrder} />
              ) : (
                <p className="text-chocolate-dark/80">Non enregistrée pour vos commandes payées.</p>
              )}
            </div>
          </>
        )}

        <InfoRow label="Entreprise" value={profile.company || 'Non renseigné'} />
      </div>

      {profile.is_guest && (
        <div className="bg-chocolate-light/30 rounded-lg p-4">
          <p className="text-sm text-chocolate-dark/70 mb-2">
            Vous avez commandé en mode invité. Créez un mot de passe pour retrouver facilement vos commandes la prochaine fois.
          </p>
          <Link href="/compte/creer-mot-de-passe" className="inline-block bg-chocolate-dark text-chocolate-light px-4 py-2 rounded-lg text-sm font-semibold hover:bg-chocolate-dark/90 transition-colors">
            Créer un mot de passe
          </Link>
        </div>
      )}
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <p className="text-sm text-chocolate-dark/70 md:py-0.5">{label}</p>
      <p className="font-semibold text-chocolate-dark md:py-0.5">{value}</p>
    </>
  )
}

function ShippingAddressBlock({ order }: { order: Order }) {
  const { line1, line2, line3 } = getShippingAddressLines(order)
  const name = [order.customer_first_name, order.customer_last_name].filter(Boolean).join(' ')
  return (
    <>
      <div className="space-y-0.5">
        {name && <p>{name}</p>}
        {line1 && <p>{line1}</p>}
        {line2 && <p>{line2}</p>}
        {line3 && <p>{line3}</p>}
        {!line1 && !line2 && !line3 && !name && <p>—</p>}
      </div>
      <p className="text-xs font-normal text-chocolate-dark/60 mt-2">
        Dernière adresse utilisée (commande du {new Date(order.created_at).toLocaleDateString('fr-FR')})
      </p>
    </>
  )
}

function BillingAddressBlock({ order }: { order: Order }) {
  const { line1, line2, line3 } = getBillingAddressLines(order)
  const name = [order.billing_first_name, order.billing_last_name].filter(Boolean).join(' ')
  return (
    <>
      <p className="text-xs font-normal text-chocolate-dark/60 mb-1.5">Enregistrée pour la facture, non modifiable.</p>
      <div className="space-y-0.5">
        {name && <p>{name}</p>}
        {line1 && <p>{line1}</p>}
        {(line2 || line3) && <p>{[line2, line3].filter(Boolean).join(' — ')}</p>}
        {order.billing_phone && <p className="text-chocolate-dark/80">{order.billing_phone}</p>}
        {order.billing_email && <p className="text-chocolate-dark/80">{order.billing_email}</p>}
      </div>
      <p className="text-xs font-normal text-chocolate-dark/60 mt-2">
        Dernière adresse utilisée (commande du {new Date(order.created_at).toLocaleDateString('fr-FR')})
      </p>
    </>
  )
}
