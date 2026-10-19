import type { Metadata } from 'next'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import ArticleCard from '@/components/blog/ArticleCard'
import JsonLd from '@/components/JsonLd'
import { AUTEUR, SITE_NAME, absoluteUrl, articles } from '@/lib/blog'
import { CONTACT } from '@/lib/catalogue'

const TITRE = 'Le blog de la chocolaterie : actualités, terroir et conseils'
const DESCRIPTION =
  'Actualités, terroir franc-comtois et conseils de Mélanie et Cédric Brun, artisans chocolatiers à Charquemont, créateurs des Belles Comtoises.'

export const metadata: Metadata = {
  title: 'Blog du chocolatier : actualités et conseils',
  description: DESCRIPTION,
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    url: '/blog',
    title: TITRE,
    description: DESCRIPTION,
    locale: 'fr_FR',
    siteName: SITE_NAME,
    images: [{ url: '/images/og-comtoises.jpg', width: 1200, height: 630, alt: 'Les Belles Comtoises, vaches en chocolat' }],
  },
}

export default function BlogPage() {
  const [vedette, ...autres] = articles

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': absoluteUrl('/blog#blog'),
      url: absoluteUrl('/blog'),
      name: `Le blog ${CONTACT.marque}`,
      description: DESCRIPTION,
      inLanguage: 'fr-FR',
      publisher: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
      blogPost: articles.map((a) => ({
        '@type': 'BlogPosting',
        headline: a.titre,
        url: absoluteUrl(`/blog/${a.slug}`),
        datePublished: a.datePublication,
        dateModified: a.dateMiseAJour ?? a.datePublication,
        image: absoluteUrl(a.image.src),
        author: { '@type': 'Person', name: AUTEUR.nom },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
      ],
    },
  ]

  return (
    <div className="landing bg-ivory font-sans text-ink">
      <JsonLd data={jsonLd} />
      <SiteHeader />

      <main>
        <section className="grain relative isolate overflow-hidden bg-cream pt-28 md:pt-36">
          <div className="mx-auto max-w-7xl px-5 pb-14 md:px-8 md:pb-20">
            <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">
              <span aria-hidden className="hairline w-12" />
              Actualités · Terroir · Conseils
            </p>
            <h1 className="font-display mt-5 text-[2.8rem] leading-[0.95] tracking-[-0.02em] text-ink sm:text-[3.8rem] md:text-[5.2rem]">
              Le <em className="font-light italic text-cacao">blog</em>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-bark md:text-[18px]">
              Nos actualités, nos rendez-vous en Franche-Comté et nos conseils d’artisans chocolatiers, depuis notre
              atelier de {CONTACT.ville}.
            </p>
          </div>
        </section>

        <section className="bg-ivory py-14 md:py-20" aria-label="Articles">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            {vedette && <ArticleCard article={vedette} vedette titreNiveau="h2" />}

            {autres.length > 0 && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {autres.map((a) => (
                  <ArticleCard key={a.slug} article={a} titreNiveau="h2" />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
