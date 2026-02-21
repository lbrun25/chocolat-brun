-- Ajoute les colonnes d'adresse de facturation à la table orders
-- À exécuter dans Supabase SQL Editor : Dashboard > SQL Editor > New query

ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_first_name TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_last_name TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_phone TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_email TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_address TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_city TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_postal_code TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_country TEXT;
