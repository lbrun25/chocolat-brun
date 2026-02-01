'use client'

import Image from 'next/image'

export default function BrandLogo() {
  return (
    <div className="flex flex-row items-center gap-3 md:gap-4">
      {/* 1. Logo à gauche */}
      <div className="relative flex-shrink-0 w-[4.5rem] h-[4.5rem] md:w-[5.5rem] md:h-[5.5rem] lg:w-[6.5rem] lg:h-[6.5rem] overflow-hidden">
        <Image
          src="/images/logo.png"
          alt="Logo Cédric Brun"
          width={96}
          height={96}
          className="absolute inset-0 object-contain object-center w-full h-full"
          priority
        />
      </div>
      {/* 2. Textes à droite */}
      <div className="flex flex-col md:flex-col justify-center md:justify-start">
        <div className="flex items-center md:items-start flex-wrap">
          <span className="text-chocolate-light font-great-vibes text-xl md:text-2xl lg:text-3xl leading-[0.9]">
            Cédric Brun
          </span>
          <span className="hidden md:inline text-chocolate-light text-[10px] md:text-xs lg:text-sm font-cinzel uppercase tracking-wider whitespace-nowrap ml-2 md:ml-3 pt-1 md:pt-1.5">
            MAÎTRE ARTISAN
          </span>
        </div>
        <p className="hidden md:block text-chocolate-light text-[10px] md:text-xs lg:text-sm font-cinzel uppercase tracking-wider">
          PÂTISSIER CHOCOLATIER DEPUIS 1999
        </p>
      </div>
    </div>
  )
}
