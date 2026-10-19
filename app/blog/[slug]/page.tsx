import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import ArticleCard from '@/components/blog/ArticleCard'
import JsonLd from '@/components/JsonLd'
import { contenus } from '@/content/blog'
import {
  AUTEUR,
  SITE_NAME,
  absoluteUrl,
  articles,
  articlesLies,
  formatDateArticle,
  getArticle,
  type ArticleMeta,
} from '@/lib/blog'
import { CONTACT } from '@/lib/catalogue'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}

  const url = `/blog/${article.slug}`
  const image = article.ogImage
    ? { url: article.ogImage, width: 1200, height: 630, alt: article.image.alt }
    : { url: article.image.src, width: article.image.width, height: article.image.height, alt: article.image.alt }

  return {
    title: article.titreSeo,
    description: article.description,
    keywords: article.motsCles,
    authors: [{ name: AUTEUR.nom }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: article.titre,
      description: article.description,
      locale: 'fr_FR',
      siteName: SITE_NAME,
      publishedTime: article.datePublication,
      modifiedTime: article.dateMiseAJour ?? article.datePublication,
      authors: [AUTEUR.nom],
      section: article.categorie,
      tags: article.motsCles,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.titre,
      description: article.description,
      images: [image.url],
    },
  }
}

function donneesStructurees(article: ArticleMeta, faq: Array<{ question: string; reponse: string }> | undefined) {
  const url = absoluteUrl(`/blog/${article.slug}`)
  const organisation = {
    '@type': 'Organization',
    '@id': absoluteUrl('/#organisation'),
    name: SITE_NAME,
    url: absoluteUrl('/'),
    logo: { '@type': 'ImageObject', url: absoluteUrl('/images/logo.png') },
  }

  const data: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      url,
      headline: article.titre,
      description: article.description,
      image: [absoluteUrl(article.image.src), ...(article.ogImage ? [absoluteUrl(article.ogImage)] : [])],
      datePublished: article.datePublication,
      dateModified: article.dateMiseAJour ?? article.datePublication,
      inLanguage: 'fr-FR',
      articleSection: article.categorie,
      keywords: article.motsCles.join(', '),
      author: [
        { '@type': 'Person', name: 'Cédric Brun', jobTitle: 'Maître Artisan Pâtissier Chocolatier', url: absoluteUrl('/histoire') },
        { '@type': 'Person', name: 'Mélanie Brun', url: absoluteUrl('/histoire') },
      ],
      publisher: organisation,
      isPartOf: { '@type': 'Blog', '@id': absoluteUrl('/blog#blog'), url: absoluteUrl('/blog') },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
        { '@type': 'ListItem', position: 3, name: article.titre, item: url },
      ],
    },
  ]

  if (faq?.length) {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: { '@type': 'Answer', text: q.reponse },
      })),
    })
  }

  if (article.evenement) {
    const e = article.evenement
    data.push({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: e.nom,
      startDate: e.date,
      endDate: e.date,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: e.lieu,
        address: { '@type': 'PostalAddress', addressLocality: e.ville, postalCode: e.codePostal, addressCountry: 'FR' },
      },
      image: [absoluteUrl(article.image.src)],
      description: article.description,
      url,
      performer: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
    })
  }

  return data
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  const contenu = contenus[slug]
  if (!article || !contenu) notFound()

  const { Corps, faq } = contenu
  const lies = articlesLies(article)
  const portrait = article.image.height > article.image.width

  return (
    <div className="landing bg-ivory font-sans text-ink">
      <JsonLd data={donneesStructurees(article, faq)} />
      <SiteHeader />

      <main>
        <article>
          {/* En-tête de l'article */}
          <header className="grain relative isolate overflow-hidden bg-cream pt-24 md:pt-32">
            <div className="mx-auto max-w-7xl px-5 pb-12 md:px-8 md:pb-16">
              <nav aria-label="Fil d’Ariane">
                <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-bark">
                  <li>
                    <Link href="/" className="hover:text-ink">
                      Accueil
                    </Link>
                  </li>
                  <li aria-hidden>
                    <ChevronRight className="h-3.5 w-3.5 text-brass-deep" strokeWidth={1.75} />
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-ink">
                      Blog
                    </Link>
                  </li>
                  <li aria-hidden>
                    <ChevronRight className="h-3.5 w-3.5 text-brass-deep" strokeWidth={1.75} />
                  </li>
                  <li aria-current="page" className="text-ink">
                    {article.categorie}
                  </li>
                </ol>
              </nav>

              <div
                className={`mt-8 grid items-center gap-10 md:mt-10 ${
                  portrait ? 'lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16' : 'lg:grid-cols-2 lg:gap-14'
                }`}
              >
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">
                    {article.categorie} ·{' '}
                    <time dateTime={article.datePublication}>{formatDateArticle(article.datePublication)}</time> ·{' '}
                    {article.tempsLectureMin} min de lecture
                  </p>
                  <h1 className="font-display mt-5 text-[2.2rem] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[2.8rem] md:text-[3.4rem]">
                    {article.titre}
                  </h1>
                  <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-bark md:text-[18px]">{article.extrait}</p>
                  <p className="mt-6 text-[13.5px] text-bark">
                    Par <span className="font-medium text-ink">{AUTEUR.nom}</span>, {AUTEUR.role}
                  </p>
                </div>

                <div className="overflow-hidden rounded-2xl shadow-xl shadow-ink/10">
                  <Image
                    src={article.image.src}
                    alt={article.image.alt}
                    width={article.image.width}
                    height={article.image.height}
                    priority
                    sizes={portrait ? '(max-width: 1024px) 100vw, 380px' : '(max-width: 1024px) 100vw, 50vw'}
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Corps */}
          <div className="bg-ivory py-14 md:py-20">
            <div className="article-prose mx-auto max-w-[720px] px-5 md:px-0">
              <Corps />
            </div>

            {faq && faq.length > 0 && (
              <section className="mx-auto mt-16 max-w-[720px] px-5 md:px-0" aria-labelledby="faq-titre">
                <h2 id="faq-titre" className="font-display text-[1.8rem] leading-tight text-ink md:text-[2.1rem]">
                  Questions fréquentes
                </h2>
                <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
                  {faq.map((q) => (
                    <details key={q.question} className="group py-5">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-ink [&::-webkit-details-marker]:hidden">
                        <h3 className="text-[16.5px] leading-snug">{q.question}</h3>
                        <span
                          aria-hidden
                          className="mt-0.5 text-xl leading-none text-brass-deep transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-[15.5px] leading-relaxed text-bark">{q.reponse}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Les auteurs */}
            <div className="px-5 md:px-0">
              <aside className="mx-auto mt-16 flex max-w-[720px] items-center gap-5 rounded-2xl border border-ink/[0.08] bg-paper p-5 md:p-6">
                <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src="/images/comtoises/melanie-cedric.jpg"
                    alt="Mélanie et Cédric Brun"
                    fill
                    sizes="64px"
                    className="object-cover object-top"
                  />
                </span>
                <div>
                  <p className="font-display text-[1.2rem] leading-tight text-ink">{AUTEUR.nom}</p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-bark">
                    {CONTACT.signature}, à {CONTACT.ville} dans le Haut-Doubs.{' '}
                    <Link href="/histoire" className="font-medium text-cacao underline decoration-brass/70 underline-offset-[3px]">
                      Notre histoire
                    </Link>
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </article>

        {lies.length > 0 && (
          <section className="bg-cream py-14 md:py-20" aria-labelledby="a-lire-aussi">
            <div className="mx-auto max-w-5xl px-5 md:px-8">
              <h2 id="a-lire-aussi" className="font-display text-center text-[2rem] leading-tight text-ink md:text-[2.4rem]">
                À lire aussi
              </h2>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {lies.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
              <p className="mt-10 text-center">
                <Link
                  href="/blog"
                  className="text-[14px] font-medium text-cacao underline decoration-brass/70 underline-offset-[3px] hover:decoration-cacao"
                >
                  Tous les articles du blog
                </Link>
              </p>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
