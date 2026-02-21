# Migrations Supabase

## Appliquer la migration des colonnes de facturation

Si vous voyez l'erreur `Could not find the 'billing_address' column of 'orders'` :

1. Ouvrez le **Supabase Dashboard** → **SQL Editor**
2. Créez une nouvelle requête
3. Copiez-collez le contenu de `migrations/20250221000000_add_billing_columns_to_orders.sql`
4. Exécutez la requête
