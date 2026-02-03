import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-chocolate-dark text-chocolate-light mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Cédric BRUN</h3>
            <p className="text-chocolate-light/80">
              Maître Artisan Pâtissier Chocolatier Depuis 1999 - Fabrication artisanale
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <address className="text-chocolate-light/80 not-italic">
              <p>2 rue du Chalet</p>
              <p>25140 Charquemont</p>
              <p className="mt-2">
                <a href="tel:+33381440736" className="hover:text-chocolate-light transition-colors">
                  03 81 44 07 36
                </a>
              </p>
              <p>
                <a href="mailto:patisseriebrun-25@orange.fr" className="hover:text-chocolate-light transition-colors">
                  patisseriebrun-25@orange.fr
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-chocolate-light/80 hover:text-chocolate-light transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/prix" className="text-chocolate-light/80 hover:text-chocolate-light transition-colors">
                  Prix & Conditionnements
                </Link>
              </li>
              <li>
                <Link href="/pro" className="text-chocolate-light/80 hover:text-chocolate-light transition-colors">
                  Pro
                </Link>
              </li>
              <li>
                <Link href="/galerie" className="text-chocolate-light/80 hover:text-chocolate-light transition-colors">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/devis" className="text-chocolate-light/80 hover:text-chocolate-light transition-colors">
                  Demande de devis
                </Link>
              </li>
              <li>
                <Link href="/livraison" className="text-chocolate-light/80 hover:text-chocolate-light transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/histoire" className="text-chocolate-light/80 hover:text-chocolate-light transition-colors">
                  Histoire
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-chocolate-light/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-chocolate-light/60">
            <p>&copy; {new Date().getFullYear()} PATISSERIE BRUN CEDRIC. Tous droits réservés.</p>
            <div className="flex gap-4 text-sm">
              <Link href="/mentions-legales" className="hover:text-chocolate-light transition-colors">
                Mentions légales
              </Link>
              <span className="text-chocolate-light/40">|</span>
              <Link href="/politique-confidentialite" className="hover:text-chocolate-light transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}



