'use client'

import { motion } from 'framer-motion'

const paragraphs = [
  'Depuis 1999, la pâtisserie fait partie de notre quotidien. Installés à Charquemont, nous exerçons ce métier avec passion, patience et amour du travail bien fait.',
  "Nous sommes Cédric et Mélanie BRUN, un couple de pâtissiers unis par la même envie : transmettre, à travers nos créations, des moments de gourmandise simples et sincères. Au fil des années, notre savoir-faire s'est construit autour de recettes authentiques, réalisées de manière artisanale, avec des ingrédients soigneusement sélectionnés.",
  "Le napolitain est un projet qui nous tenait à cœur depuis longtemps. Une idée née à la maison, longuement réfléchie, puis transformée en réalité grâce à notre expérience et à notre passion commune. Aujourd'hui, nous sommes fiers de proposer des napolitains faits avec le même soin que nos pâtisseries, dans le respect des traditions artisanales.",
  'Chaque napolitain est préparé dans notre laboratoire, avec générosité et simplicité.',
]

export default function HistoirePage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-chocolate-dark">
      {/* Bordures ondulées en haut et en bas (comme "Qu'est-ce qu'un napolitain") */}
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
            fill="white"
          />
        </svg>
      </div>

      <motion.div
        className="relative z-10 min-h-screen flex flex-col py-6 md:py-8 px-3 md:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex-1 w-full max-w-[1920px] mx-auto px-2 md:px-4">
          <div className="book-wrapper">
            {/* Feuillages décoratifs en bas du livre uniquement (sans les deux au-dessus) */}
            <div className="book-foliage" aria-hidden>
              <svg className="absolute -left-2 bottom-4 w-16 h-16 opacity-80" viewBox="0 0 32 32" fill="none">
                <path d="M8 28 Q16 16 24 28 Q16 20 8 28" fill="url(#leaf-warm)" />
                <defs>
                  <linearGradient id="leaf-warm" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffb74d" />
                    <stop offset="100%" stopColor="#e65100" />
                  </linearGradient>
                </defs>
              </svg>
              <svg className="absolute -right-2 bottom-6 w-20 h-20 opacity-80" viewBox="0 0 36 36" fill="none">
                <ellipse cx="18" cy="20" rx="10" ry="12" fill="url(#leaf-forest)" transform="rotate(15 18 20)" />
                <defs>
                  <linearGradient id="leaf-forest" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a5d6a7" />
                    <stop offset="100%" stopColor="#1b5e20" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Petite fleur orange/jaune (style image) */}
              <svg className="absolute -right-1 -top-1 w-10 h-10 opacity-95" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="#ffeb3b" />
                <ellipse cx="12" cy="8" rx="2.5" ry="4" fill="url(#petal)" />
                <ellipse cx="16" cy="12" rx="2.5" ry="4" fill="url(#petal)" transform="rotate(90 16 12)" />
                <ellipse cx="12" cy="16" rx="2.5" ry="4" fill="url(#petal)" transform="rotate(180 12 16)" />
                <ellipse cx="8" cy="12" rx="2.5" ry="4" fill="url(#petal)" transform="rotate(-90 8 12)" />
                <defs>
                  <linearGradient id="petal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffcc80" />
                    <stop offset="100%" stopColor="#ff9800" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Livre ouvert : style image (pages gris clair, reliure orange) */}
            <motion.article
              className="book-open"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="book-page-outer-left" aria-hidden />
              <div className="book-page-left" aria-hidden />
              <div className="book-spine" aria-hidden />
              <div className="book-page-right" aria-hidden />
              <div className="book-page-outer-right" aria-hidden />

              <div className="book-content">
                {/* Page gauche : titre uniquement */}
                <div className="book-content-inner flex flex-col justify-center">
                <motion.h1
                  className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-chocolate-dark font-serif leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                >
                  Une histoire de famille et de passion
                </motion.h1>
                <p className="mt-8 text-chocolate-dark/40 text-sm font-serif" aria-hidden>
                  * * *
                </p>
              </div>

              {/* Page droite : texte + marque-page rouge */}
              <div className="book-content-inner book-page-right-inner flex flex-col">
                <div className="book-bookmark" aria-hidden />
                <div className="space-y-5 text-chocolate-dark/90 font-serif text-[1rem] md:text-[1.05rem] lg:text-[1.1rem] leading-relaxed">
                  <motion.p
                    className="drop-cap"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
                  >
                    {paragraphs[0]}
                  </motion.p>

                  {paragraphs.slice(1, -1).map((text, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.45 + (i + 1) * 0.1,
                        ease: 'easeOut',
                      }}
                    >
                      {text}
                    </motion.p>
                  ))}

                  <motion.p
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.85, ease: 'easeOut' }}
                  >
                    {paragraphs[paragraphs.length - 1]}
                  </motion.p>

                  <motion.p
                    className="text-base font-semibold text-chocolate-dark mt-6 pt-5 border-t border-chocolate-dark/10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1, ease: 'easeOut' }}
                  >
                    Une nouvelle aventure pour nous, mais toujours la même passion : faire plaisir.
                  </motion.p>
                </div>

                <p className="mt-8 text-chocolate-dark/30 text-xl tracking-widest font-serif" aria-hidden>
                  * * *
                </p>
              </div>
            </div>
          </motion.article>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
