import { Encadre, Exergue } from '@/components/blog/ArticleBlocks'
import { CONTACT } from '@/lib/catalogue'

const COMMANDE_PAR_MAIL = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Commande de calendriers de l’Avent')}`

/** Texte de Mélanie (19/11/2026), publié tel quel (son sous-titre est l’extrait, affiché sous le titre) ; seule la commande par e-mail a été ajoutée, à sa demande. */
export default function CalendrierDeLAventChocolat() {
  return (
    <>
      <h2>Le plaisir d’attendre Noël</h2>
      <p>
        Décembre approche, et avec lui revient l’une des plus jolies traditions de Noël : le calendrier de l’Avent.
      </p>
      <p>
        Chaque matin, une nouvelle case à ouvrir, une petite surprise à découvrir et le plaisir de patienter jusqu’au
        réveillon.
      </p>
      <p>
        Chez <strong>Cédric Brun, Maître Artisan Pâtissier-Chocolatier à Charquemont</strong>, nous aimons faire de cette
        attente un moment de gourmandise et de partage.
      </p>

      <h2>Un calendrier aux couleurs de Noël</h2>
      <p>
        Avec son élégant décor bleu nuit, ses paysages enneigés, ses sapins et ses petits détails féeriques, notre
        calendrier de l’Avent invite à entrer dans la magie des fêtes.
      </p>
      <p>
        Ses <strong>24 petites fenêtres</strong> rythment les journées de décembre et réservent chaque jour le plaisir
        d’une surprise.
      </p>
      <p>Une jolie façon de faire patienter petits et grands jusqu’à Noël.</p>

      <h2>Une délicate attention à offrir</h2>
      <p>
        Le calendrier de l’Avent est bien plus qu’une tradition : c’est aussi une belle idée de cadeau pour faire
        plaisir dès les premiers jours de décembre.
      </p>
      <p>
        À offrir aux enfants, aux proches ou simplement à soi-même, pour retrouver chaque matin un peu de la magie de
        Noël.
      </p>

      <Encadre titre="Calendrier de l’Avent – 12 €" sombre>
        <p>
          <em>Disponible dans notre boutique à Charquemont</em>, {CONTACT.adresse}, {CONTACT.codePostal}{' '}
          {CONTACT.ville}.
        </p>
        <p>
          Vous pouvez aussi nous le commander par e-mail, à{' '}
          <a href={COMMANDE_PAR_MAIL} className="font-medium text-ivory underline decoration-brass-pale/70 underline-offset-[3px]">
            {CONTACT.email}
          </a>
          , en nous indiquant le nombre de calendriers souhaités.
        </p>
        <div className="pt-3">
          <a
            href={COMMANDE_PAR_MAIL}
            className="inline-flex h-12 items-center rounded-full bg-brass-pale px-6 text-[14.5px] font-medium text-ink transition-all hover:-translate-y-0.5 hover:bg-ivory"
          >
            Commander par e-mail
          </a>
        </div>
      </Encadre>

      <h2>La passion du chocolat depuis 1999</h2>
      <p>
        À l’approche des fêtes, notre pâtisserie se pare de ses plus belles gourmandises pour célébrer Noël et le plaisir
        d’offrir.
      </p>
      <p>
        <strong>Cédric Brun – Maître Artisan Pâtissier-Chocolatier</strong>
        <br />
        <em>Fabrication artisanale franc-comtoise – Charquemont</em>
      </p>

      <Exergue>« Le petit chocolat, le grand plaisir. »</Exergue>
    </>
  )
}
