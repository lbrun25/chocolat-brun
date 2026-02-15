'use client'

import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform, useAnimation } from 'framer-motion'
import NapolitainCard from '@/components/NapolitainCard'
import SafeImage from '@/components/SafeImage'
import FloatingChocolates from '@/components/FloatingChocolates'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { products } from '@/lib/products'
import ProductCarousel from '@/components/ProductCarousel'

function ChocolateSachet() {
  const ref = useRef<HTMLDivElement>(null)

  // Motion values pour les rotations fluides
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 15 })
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 15 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const deltaX = e.clientX - centerX
        const deltaY = e.clientY - centerY
        const maxRotation = 15
        
        // Calculer les rotations normalisées
        const normalizedX = Math.max(-1, Math.min(1, deltaX / (rect.width / 2)))
        const normalizedY = Math.max(-1, Math.min(1, deltaY / (rect.height / 2)))
        
        rotateX.set(normalizedY * -maxRotation)
        rotateY.set(normalizedX * maxRotation)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [rotateX, rotateY])

  return (
    <div 
      ref={ref}
      className="relative w-full max-w-xs md:max-w-md lg:max-w-lg h-[200px] md:h-[300px] lg:h-[400px]"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        className="w-full h-full"
      >
        <Image
          src="/images/chocolat_sachet_transparent_bg.png"
          alt="Sachet de napolitains artisanaux Cédric BRUN"
          fill
          className="object-contain drop-shadow-2xl"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
        />
      </motion.div>
    </div>
  )
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(true)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsHovering(true)
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Vérifier si la souris quitte vraiment la fenêtre
      if (!e.relatedTarget && e.clientY <= 0) {
        setIsHovering(false)
      }
    }

    // Initialiser avec la position actuelle de la souris
    const handleMouseEnter = () => {
      setIsHovering(true)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  return (
    <div className="artisan-texture">
      {/* Section 1 : Le chocolat, c'est le bonheur */}
      <section className="relative flex items-center justify-center overflow-hidden bg-white">
        {/* Deux grandes images de chocolat - gauche et droite - masquées sur mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          {/* Chocolat à gauche */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -35 }}
            animate={{ opacity: 1, scale: 1, rotate: -30 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-64 md:w-80 lg:w-96 xl:w-[500px]"
          >
            <Image
              src="/images/chocolate_transparent/chocolat_noir_ia_transparent.png"
              alt="Chocolat noir artisanal"
              width={500}
              height={500}
              className="object-contain drop-shadow-2xl"
              priority
              quality={90}
              sizes="(max-width: 768px) 0px, (max-width: 1024px) 320px, (max-width: 1280px) 384px, 500px"
            />
          </motion.div>

          {/* Chocolat à droite */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 35 }}
            animate={{ opacity: 1, scale: 1, rotate: 30 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-64 md:w-80 lg:w-96 xl:w-[500px]"
          >
            <Image
              src="/images/chocolate_transparent/chocolat_lait_ia_transparent.png"
              alt="Chocolat lait artisanal"
              width={500}
              height={500}
              className="object-contain drop-shadow-2xl"
              priority
              quality={90}
              sizes="(max-width: 768px) 0px, (max-width: 1024px) 320px, (max-width: 1280px) 384px, 500px"
            />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-4"
              >
                <span className="text-sm md:text-base font-semibold text-chocolate-dark/70 uppercase tracking-wider">
                  Artisan Chocolatier depuis 1999
                </span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-chocolate-dark mb-6 font-serif leading-tight">
                Napolitains
                <br />
                <span className="text-chocolate-medium">Artisanaux</span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-6xl text-chocolate-dark/80 mb-6 font-great-vibes leading-relaxed">
            
                Fabrication artisanale à Charquemont dans le Haut-Doubs
              </p>
              
              <p className="text-base md:text-lg text-chocolate-dark/70 mb-8 font-sans max-w-xl mx-auto">
                Des petits carrés de chocolat de 5 grammes, parfaits pour accompagner votre café ou votre thé. 
                L'idéal pour vos pauses gourmandes et pour offrir à vos proches.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  href="/produits"
                  className="group inline-flex items-center justify-center bg-chocolate-dark text-chocolate-light px-8 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-dark/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Voir nos produits
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/produits/chocolat-noir-cafe"
                  className="inline-flex items-center justify-center bg-transparent border-2 border-chocolate-dark text-chocolate-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-dark hover:text-chocolate-light transition-all duration-300"
                >
                  Commander
                </Link>
              </div>

              {/* Image du sachet de chocolat */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                className="flex justify-center"
              >
                <ChocolateSachet />
              </motion.div>

              {/* Phrase d'accroche améliorée */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
              >
                <div className="relative">
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-chocolate-dark/30 to-transparent" />
                  <p className="text-lg md:text-xl lg:text-2xl text-chocolate-dark leading-relaxed font-medium italic relative px-4 md:px-8 mt-8 font-serif">
                    <span className="text-chocolate-dark/50 text-xl md:text-2xl mr-3">✦</span>
                    Parce que le plaisir se partage, nos napolitains artisanaux subliment vos pauses, 
                    créent des sourires et donnent à chaque moment du quotidien une saveur unique et réconfortante.
                    <span className="text-chocolate-dark/50 text-xl md:text-2xl ml-3">✦</span>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2 : Le chocolat, c'est comme un câlin de l'intérieur */}
      <section className="relative py-40 md:py-40 bg-chocolate-dark text-white overflow-x-hidden">
        {/* Bordure ondulée en haut */}
        <div className="absolute top-0 left-0 w-full h-24 md:h-40 overflow-hidden pointer-events-none z-0">
          <svg
            className="absolute top-0 w-full h-full"
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,80 C180,20 360,140 540,80 C720,20 900,140 1080,80 C1260,20 1320,140 1440,80 L1440,160 L0,160 Z"
              fill="#3B1E12"
            />
            <path
              d="M0,80 C180,140 360,20 540,80 C720,140 900,20 1080,80 C1260,140 1320,20 1440,80 L1440,0 L0,0 Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Bordure ondulée en bas - transition vers la couleur de la section Nos goûts */}
        <div className="absolute bottom-0 left-0 w-full h-24 md:h-40 overflow-hidden pointer-events-none z-0">
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: 'scaleY(-1)' }}
          >
            <path
              d="M0,80 C180,20 360,140 540,80 C720,20 900,140 1080,80 C1260,20 1320,140 1440,80 L1440,160 L0,160 Z"
              fill="#3B1E12"
            />
            <path
              d="M0,80 C180,140 360,20 540,80 C720,140 900,20 1080,80 C1260,140 1320,20 1440,80 L1440,0 L0,0 Z"
              fill="#F5E6C8"
            />
          </svg>
        </div>

        {/* Images de chocolat transparentes avec mouvement libre */}
        <FloatingChocolates />

        <div className="container mx-auto px-4 relative z-10 pt-24 pb-24 md:pt-32 md:pb-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6 font-serif">
              Qu'est-ce qu'un napolitain ?
            </h2>
            <div className="space-y-4 text-lg text-white/90 font-sans">
              <p>
                Le napolitain est un petit carré de chocolat de <strong>5 grammes</strong>, 
                parfait pour accompagner votre café ou votre thé.
              </p>
              <p>
                Parfait pour vos <strong>pauses gourmandes</strong>, pour accompagner votre café ou votre thé, 
                ou comme <strong>cadeau gourmand</strong>, nos napolitains sont fabriqués 
                artisanalement avec une sélection rigoureuse de chocolats fins.
              </p>
              <p>
                Chaque pièce est le fruit d'un savoir-faire traditionnel, pour vous offrir une expérience gustative unique.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section : Nos goûts disponibles */}
      <section id="nos-gouts" className="py-20 bg-chocolate-light/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-chocolate-dark mb-4 font-serif">
              Nos goûts disponibles
            </h2>
            <p className="text-xl text-chocolate-dark/70 font-sans">
              Découvrez notre gamme de napolitains artisanaux
            </p>
            <Link
              href="/produits"
              className="group mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-chocolate-dark/25 bg-white/60 backdrop-blur-sm text-chocolate-dark/80 hover:text-chocolate-dark hover:border-chocolate-dark/50 hover:bg-chocolate-light/80 transition-all duration-300 shadow-sm hover:shadow-md font-serif text-sm tracking-wide"
            >
              <svg className="w-4 h-4 text-chocolate-medium/70 group-hover:text-chocolate-medium transition-colors flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                {/* Grille 4×3 carrés de chocolat */}
                {[0, 1, 2].map((row) =>
                  [0, 1, 2, 3].map((col) => (
                    <rect key={`${row}-${col}`} x={1.5 + col * 5.5} y={2 + row * 6} width="5" height="5" rx="0.5" />
                  ))
                )}
              </svg>
              Voir nos produits
              <svg className="w-4 h-4 opacity-60 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          {/* Carousel avec produits réorganisés : chocolat noir café en premier, chocolat noir en dernier */}
          <div className="max-w-7xl mx-auto">
            <ProductCarousel
              products={[
                products.find(p => p.id === 'chocolat-noir-cafe')!,
                products.find(p => p.id === 'chocolat-lait')!,
                products.find(p => p.id === 'chocolat-blanc')!,
                products.find(p => p.id === 'chocolat-dulcey')!,
                products.find(p => p.id === 'chocolat-noir')!,
              ].filter(Boolean)}
            />
          </div>
        </div>
      </section>

      {/* Section Vous êtes pro ? */}
      <section className="py-16 md:py-20 bg-chocolate-light/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-chocolate-dark mb-4 font-serif">
              Vous êtes professionnel ?
            </h2>
            <p className="text-lg md:text-xl text-chocolate-dark/70 mb-8 font-sans">
              Cafés, restaurants, hôtels, entreprises... Découvrez nos solutions professionnelles 
              avec emballages personnalisés et tarifs dégressifs.
            </p>
            <Link
              href="/pro"
              className="inline-flex items-center justify-center bg-chocolate-dark text-chocolate-light px-8 py-4 rounded-lg text-lg font-semibold hover:bg-chocolate-dark/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Découvrir nos solutions Pro
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

