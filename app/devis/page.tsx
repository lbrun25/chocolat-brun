'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'

const gouts = [
  'Chocolat noir au café',
  'Chocolat noir',
  'Chocolat au lait',
  'Chocolat blanc',
  'Chocolat Dulcey',
]

export default function DevisPage() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    gouts: [] as string[],
    quantite: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleGoutChange = (gout: string) => {
    setFormData((prev) => ({
      ...prev,
      gouts: prev.gouts.includes(gout)
        ? prev.gouts.filter((g) => g !== gout)
        : [...prev.gouts, gout],
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          nom: '',
          email: '',
          telephone: '',
          gouts: [],
          quantite: '',
          message: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-chocolate-light/30 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-chocolate-dark mb-4 font-serif">
              Demande de devis
            </h1>
            <p className="text-xl text-chocolate-dark/70 font-sans">
              Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-8 space-y-6"
          >
            <div>
              <label htmlFor="nom" className="block text-chocolate-dark font-semibold mb-2 font-sans">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nom"
                required
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="w-full px-4 py-2 border border-chocolate-dark/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-dark font-sans"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-chocolate-dark font-semibold mb-2 font-sans">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-chocolate-dark/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-dark font-sans"
              />
            </div>

            <div>
              <label htmlFor="telephone" className="block text-chocolate-dark font-semibold mb-2 font-sans">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="telephone"
                required
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                className="w-full px-4 py-2 border border-chocolate-dark/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-dark font-sans"
              />
            </div>

            <div>
              <label className="block text-chocolate-dark font-semibold mb-2 font-sans">
                Goûts souhaités <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {gouts.map((gout) => (
                  <label key={gout} className="flex items-center space-x-2 cursor-pointer font-sans">
                    <input
                      type="checkbox"
                      checked={formData.gouts.includes(gout)}
                      onChange={() => handleGoutChange(gout)}
                      className="w-4 h-4 text-chocolate-dark border-chocolate-dark/30 rounded focus:ring-chocolate-dark"
                    />
                    <span className="text-chocolate-dark">{gout}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="quantite" className="block text-chocolate-dark font-semibold mb-2 font-sans">
                Quantité souhaitée <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="quantite"
                required
                min="1"
                value={formData.quantite}
                onChange={(e) => setFormData({ ...formData, quantite: e.target.value })}
                placeholder="Ex: 200 pièces"
                className="w-full px-4 py-2 border border-chocolate-dark/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-dark font-sans"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-chocolate-dark font-semibold mb-2 font-sans">
                Message libre
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Précisez vos besoins, dates de livraison souhaitées, etc."
                className="w-full px-4 py-2 border border-chocolate-dark/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-dark font-sans"
              />
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded font-sans">
                Votre demande de devis a été envoyée avec succès ! Nous vous répondrons dans les plus brefs délais.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded font-sans">
                Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter directement.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || formData.gouts.length === 0}
              className="w-full bg-chocolate-dark text-chocolate-light px-8 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-dark/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-sans"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande de devis'}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  )
}

