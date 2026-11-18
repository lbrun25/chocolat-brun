-- Les lignes des commandes Belles Comtoises (packaging « 20 pièces », etc.) étaient refusées
-- par une contrainte héritée des anciens formats : la commande était créée sans ses articles
-- (constaté le 18/11/2026 sur la commande du 14/11). Le format est validé par l'application.
alter table public.order_items drop constraint if exists order_items_packaging_check;
