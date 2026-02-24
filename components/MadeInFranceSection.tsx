import Image from 'next/image'

export default function MadeInFranceSection() {
  return (
    <section
      className="relative bg-white py-10 md:py-14 overflow-hidden"
      aria-labelledby="artisanat-heading"
    >
      {/* Légère texture / profondeur */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="mb-8 md:mb-10">
            <Image
              src="/images/made_in_france.jpg"
              alt="Fabriqué ici, par nous !"
              width={340}
              height={140}
              className="h-auto w-full max-w-[280px] sm:max-w-[340px] object-contain drop-shadow-sm"
              priority={false}
            />
          </div>
          <p
            id="artisanat-heading"
            className="text-chocolate-dark/90 text-lg sm:text-xl md:text-2xl font-medium tracking-tight leading-relaxed font-cinzel"
          >
            Chaque carré naît ici, façonné à la main avec passion.
          </p>
          <p className="mt-3 text-chocolate-dark/70 text-sm sm:text-base max-w-md">
            Fabriqué dans le Haut-Doubs.
          </p>
        </div>
      </div>
    </section>
  )
}
