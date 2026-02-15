'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Building2, Coffee, Hotel, Briefcase, Truck, Sparkles, Sprout } from 'lucide-react'

const gouts = [
  'Chocolat noir au café',
  'Chocolat noir',
  'Chocolat au lait',
  'Chocolat blanc',
  'Chocolat Dulcey',
]

const avantagesPro = [
  {
    icon: <Coffee className="w-12 h-12 text-chocolate-dark" />,
    title: 'Pour les cafés et restaurants',
    description: 'Offrez à vos clients une pause gourmande avec nos napolitains artisanaux. Parfait pour accompagner vos boissons chaudes.',
  },
  {
    icon: <Hotel className="w-12 h-12 text-chocolate-dark" />,
    title: 'Pour les hôtels',
    description: 'Accueillez vos clients avec élégance. Nos napolitains font le parfait cadeau de bienvenue ou pour les chambres.',
  },
  {
    icon: <Briefcase className="w-12 h-12 text-chocolate-dark" />,
    title: 'Pour les entreprises',
    description: 'Cadeaux d\'affaires et pauses gourmandes pour vos équipes. Une touche d\'élégance artisanale pour vos événements professionnels.',
  },
  {
    icon: <Truck className="w-12 h-12 text-chocolate-dark" />,
    title: 'Livraison rapide',
    description: 'Service de livraison efficace pour répondre à vos besoins professionnels avec suivi et flexibilité des dates.',
  },
  {
    icon: <Sparkles className="w-12 h-12 text-chocolate-dark" />,
    title: 'Fabrication artisanale',
    description: 'Chaque napolitain est fabriqué à la main avec passion et savoir-faire traditionnel.',
  },
  {
    icon: <Sprout className="w-12 h-12 text-chocolate-dark" />,
    title: 'Ingrédients de qualité',
    description: 'Sélection rigoureuse de chocolats fins et d\'ingrédients naturels.',
  },
]

export default function ProPage() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    gouts: [] as string[],
    quantite: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('idle')

  const handleGoutChange = (gout: string) => {
    setFormData((prev) => ({
      ...prev,
      gouts: prev.gouts.includes(gout)
        ? prev.gouts.filter((g) => g !== gout)
        : [...prev.gouts, gout],
    }))
  }

  const handleSubmit = async (_e: FormEvent) => {
    _e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ nom: '', email: '', telephone: '', gouts: [], quantite: '', message: '' })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else setSubmitStatus('error')
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen artisan-texture">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-chocolate-dark via-chocolate-dark/95 to-chocolate-dark/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-chocolate-light/10 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Contenu texte */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-4"
              >
                <span className="text-sm md:text-base font-semibold text-chocolate-light/80 uppercase tracking-wider">
                  Solutions professionnelles
                </span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-chocolate-light mb-6 font-serif leading-tight">
                Napolitains artisanaux
                <br />
                <span className="text-chocolate-medium">pour professionnels</span>
              </h1>
              
              <p className="text-lg md:text-xl text-chocolate-light/90 mb-4 font-sans leading-relaxed">
          
              </p>
              
              <p className="text-base md:text-lg text-chocolate-light/80 font-sans mb-8">
                Qualité artisanale et service sur mesure : des napolitains pensés pour les professionnels qui veulent se démarquer.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#formulaire"
                  className="group inline-flex items-center justify-center bg-chocolate-light text-chocolate-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-light/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Passer une commande
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <Link
                  href="/prix"
                  className="inline-flex items-center justify-center bg-transparent border-2 border-chocolate-light text-chocolate-light px-8 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-light hover:text-chocolate-dark transition-all duration-300"
                >
                  Voir les tarifs
                </Link>
              </div>
            </motion.div>

            {/* Image du sachet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="relative h-[400px] md:h-[500px] lg:h-[600px]"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div 
                  className="absolute inset-0 rounded-full blur-3xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(245, 230, 200, 0.2) 0%, transparent 70%)'
                  }}
                />
                
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                  className="relative z-10 w-full h-full max-w-md md:max-w-lg lg:max-w-xl mx-auto"
                >
                  <div className="relative w-full h-full drop-shadow-2xl">
                    <Image
                      src="/images/chocolat_sachet_transparent_bg.png"
                      alt="Sachet de napolitains artisanaux Cédric BRUN"
                      fill
                      className="object-contain"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Avantages Pro */}
      <section className="py-16 md:py-20 relative overflow-hidden bg-chocolate-light/30">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-chocolate-dark mb-4 font-serif">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-lg md:text-xl text-chocolate-dark/70 font-sans max-w-2xl mx-auto">
              Découvrez les avantages de nos napolitains artisanaux. Des solutions adaptées à chaque secteur professionnel.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {avantagesPro.map((avantage, index) => (
              <motion.div
                key={avantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 hover:shadow-xl transition-all border border-chocolate-dark/10"
              >
                <div className="flex justify-center mb-4 text-chocolate-dark">{avantage.icon}</div>
                <h3 className="text-xl font-bold text-chocolate-dark mb-3 font-serif text-center">
                  {avantage.title}
                </h3>
                <p className="text-chocolate-dark/70 font-sans text-center">
                  {avantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Tarifs dégressifs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-chocolate-dark mb-4 font-serif">
                Tarifs professionnels
              </h2>
              <p className="text-lg md:text-xl text-chocolate-dark/70 font-sans">
                Des prix compétitifs pour vos commandes professionnelles
              </p>
              <Link
                href="/prix"
                className="inline-block mt-3 text-sm font-medium text-chocolate-dark/60 hover:text-chocolate-dark underline underline-offset-2 transition-colors font-sans"
              >
                Voir les tarifs
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-chocolate-light/40 via-chocolate-light/30 to-chocolate-light/40 rounded-2xl shadow-xl border border-chocolate-dark/10 p-8 md:p-10"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                    Conditionnements disponibles
                  </h3>
                  <ul className="space-y-3 text-chocolate-dark/80 font-sans">
                    <li className="flex items-start">
                      <span className="text-chocolate-medium mr-3 text-xl">•</span>
                      <span><strong className="text-chocolate-dark">100 pièces</strong> (500 g) - Parfait pour tester ou petites commandes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-chocolate-medium mr-3 text-xl">•</span>
                      <span><strong className="text-chocolate-dark">200 pièces</strong> (1000 g) - Idéal pour les commandes régulières</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-chocolate-dark/20">
                  <h3 className="text-2xl font-bold text-chocolate-dark mb-4 font-serif">
                    Services professionnels
                  </h3>

                  <ul className="space-y-3 text-chocolate-dark/80 font-sans">
                    <li className="flex items-start">
                      <span className="text-chocolate-medium mr-3 text-xl">•</span>
                      <span><strong className="text-chocolate-dark">Livraison professionnelle</strong> avec suivi et flexibilité des dates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-chocolate-medium mr-3 text-xl">•</span>
                      <span><strong className="text-chocolate-dark">Devis sur mesure</strong> selon vos quantités et le choix des saveurs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-chocolate-medium mr-3 text-xl">•</span>
                      <span><strong className="text-chocolate-dark">Facturation professionnelle</strong> avec devis et factures détaillées</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Formulaire */}
      <section id="formulaire" className="py-16 md:py-20 bg-chocolate-light/20 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-chocolate-dark mb-4 font-serif">
                Formulaire de demande de commande
              </h2>
              <p className="text-lg md:text-xl text-chocolate-dark/70 font-sans">
                Remplissez le formulaire ci-dessous. Nous vous recontacterons pour confirmer votre commande et convenir des modalités.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-10 space-y-6"
            >
              {/* Messages de statut */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-2 border-green-200 text-green-800 px-6 py-4 rounded-xl font-sans flex items-start gap-3"
                >
                  <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold mb-1">Demande de commande envoyée !</p>
                    <p className="text-sm">Nous vous recontacterons rapidement pour confirmer votre commande.</p>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50 border-2 border-red-200 text-red-800 px-6 py-4 rounded-xl font-sans flex items-start gap-3"
                >
                  <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold mb-1">Erreur lors de l'envoi</p>
                    <p className="text-sm">Veuillez réessayer ou nous contacter directement.</p>
                  </div>
                </motion.div>
              )}

              {/* Champs du formulaire */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="w-full px-4 py-3 border-2 border-chocolate-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-chocolate-dark focus:border-chocolate-dark transition-all font-sans"
                    placeholder="Votre nom"
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
                    className="w-full px-4 py-3 border-2 border-chocolate-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-chocolate-dark focus:border-chocolate-dark transition-all font-sans"
                    placeholder="votre@email.com"
                  />
                </div>
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
                  className="w-full px-4 py-3 border-2 border-chocolate-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-chocolate-dark focus:border-chocolate-dark transition-all font-sans"
                  placeholder="06 12 34 56 78"
                />
              </div>

              <div>
                <label className="block text-chocolate-dark font-semibold mb-3 font-sans">
                  Goûts souhaités <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {gouts.map((gout) => (
                    <motion.label
                      key={gout}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center space-x-3 cursor-pointer p-4 rounded-xl border-2 transition-all font-sans ${
                        formData.gouts.includes(gout)
                          ? 'border-chocolate-dark bg-chocolate-dark/5'
                          : 'border-chocolate-dark/20 hover:border-chocolate-dark/40'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.gouts.includes(gout)}
                        onChange={() => handleGoutChange(gout)}
                        className="w-5 h-5 text-chocolate-dark border-2 border-chocolate-dark/30 rounded focus:ring-2 focus:ring-chocolate-dark cursor-pointer"
                      />
                      <span className="text-chocolate-dark font-medium">{gout}</span>
                    </motion.label>
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
                  min={1}
                  value={formData.quantite}
                  onChange={(e) => setFormData({ ...formData, quantite: e.target.value })}
                  placeholder="Ex: 200 pièces"
                  className="w-full px-4 py-3 border-2 border-chocolate-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-chocolate-dark focus:border-chocolate-dark transition-all font-sans"
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
                  placeholder="Précisez vos besoins, dates de livraison souhaitées, événement, etc."
                  className="w-full px-4 py-3 border-2 border-chocolate-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-chocolate-dark focus:border-chocolate-dark transition-all resize-none font-sans"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || formData.gouts.length === 0}
                whileHover={{ scale: formData.gouts.length > 0 && !isSubmitting ? 1.02 : 1 }}
                whileTap={{ scale: formData.gouts.length > 0 && !isSubmitting ? 0.98 : 1 }}
                className="w-full bg-chocolate-dark text-chocolate-light px-8 py-4 rounded-xl text-lg font-semibold hover:bg-chocolate-dark/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-sans flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <span>Envoyer la demande de commande</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-chocolate-dark text-chocolate-light">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Building2 className="w-16 h-16 mx-auto mb-6 text-chocolate-medium" />
            <h2 className="text-4xl font-bold mb-6 font-serif">
              Prêt à passer commande ?
            </h2>
            <p className="text-xl mb-8 text-chocolate-light/90 font-sans max-w-2xl mx-auto">
              Passez commande via le formulaire. Nous vous recontacterons pour confirmer et organiser la livraison.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#formulaire"
                className="inline-block bg-chocolate-light text-chocolate-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-light/90 transition-colors shadow-lg hover:shadow-xl hover:scale-105"
              >
                Passer une commande
              </a>
              <Link
                href="/prix"
                className="inline-block bg-transparent border-2 border-chocolate-light text-chocolate-light px-8 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-light hover:text-chocolate-dark transition-all duration-300"
              >
                Voir les tarifs détaillés
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
