import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { formatDateArticle, type ArticleMeta } from '@/lib/blog'

interface ArticleCardProps {
  article: ArticleMeta
  /** Carte large, image à gauche (article mis en avant) */
  vedette?: boolean
  /** Niveau du titre selon la page qui accueille la carte */
  titreNiveau?: 'h2' | 'h3'
}

export default function ArticleCard({ article, vedette = false, titreNiveau = 'h3' }: ArticleCardProps) {
  const Titre = titreNiveau
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/[0.08] bg-paper transition-all hover:-translate-y-0.5 hover:border-brass/60 ${
        vedette ? 'md:grid md:grid-cols-2' : ''
      }`}
    >
      <div className={`relative overflow-hidden bg-cream ${vedette ? 'aspect-[4/3] md:aspect-auto md:min-h-[420px]' : 'aspect-[4/3]'}`}>
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes={vedette ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          style={article.image.cadrage ? { objectPosition: article.image.cadrage } : undefined}
        />
      </div>
      <div className={`flex flex-1 flex-col ${vedette ? 'p-6 md:p-10' : 'p-5 md:p-6'}`}>
        <p className="text-[11px] font-medium uppercase tracking-eyebrow text-brass-deep">
          {article.categorie} · <time dateTime={article.datePublication}>{formatDateArticle(article.datePublication)}</time>
        </p>
        <Titre
          className={`font-display mt-3 leading-tight text-ink ${
            vedette ? 'text-[1.8rem] md:text-[2.3rem]' : 'text-[1.35rem]'
          }`}
        >
          <Link href={`/blog/${article.slug}`} className="after:absolute after:inset-0">
            {article.titre}
          </Link>
        </Titre>
        <p className={`mt-3 leading-relaxed text-bark ${vedette ? 'text-[16px]' : 'text-[14.5px]'}`}>{article.extrait}</p>
        <p className="mt-auto flex items-center gap-2 pt-5 text-[13px] font-medium text-cacao">
          Lire l’article · {article.tempsLectureMin} min
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
        </p>
      </div>
    </article>
  )
}
