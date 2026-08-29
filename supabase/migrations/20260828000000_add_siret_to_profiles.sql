-- Compte professionnel : SIRET vérifié via l'API Sirene (INSEE).
-- Un profil avec `siret_verified_at` non nul donne accès aux tarifs professionnels.

alter table public.profiles
  add column if not exists siret text,
  add column if not exists raison_sociale text,
  add column if not exists type_etablissement text,
  add column if not exists siret_verified_at timestamptz;

-- Un même établissement ne peut être rattaché qu'à un seul compte.
create unique index if not exists profiles_siret_key
  on public.profiles (siret)
  where siret is not null;

comment on column public.profiles.siret is 'SIRET à 14 chiffres, vérifié auprès du répertoire Sirene (INSEE)';
comment on column public.profiles.siret_verified_at is 'Date de vérification INSEE ; non nul = accès aux tarifs pros';
