-- Rybičkové akvárium: databáze pro Supabase
-- Spusť jednou v Supabase → SQL Editor → New query → Run.

-- Jedna řádka = jedna rodina = jeden přihlášený rodič.
-- Celý stav hry (PIN rodiče, profily dětí, úkoly, rybky, perličky) je v sloupci state jako JSON.
create table if not exists public.families (
  owner      uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  state      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint families_state_size check (pg_column_size(state) < 500000)
);

-- Bezpečnost: každý rodič vidí a mění jen svou rodinu.
alter table public.families enable row level security;

drop policy if exists "families_select_own" on public.families;
drop policy if exists "families_insert_own" on public.families;
drop policy if exists "families_update_own" on public.families;
drop policy if exists "families_delete_own" on public.families;

create policy "families_select_own" on public.families
  for select to authenticated using (owner = (select auth.uid()));
create policy "families_insert_own" on public.families
  for insert to authenticated with check (owner = (select auth.uid()));
create policy "families_update_own" on public.families
  for update to authenticated using (owner = (select auth.uid())) with check (owner = (select auth.uid()));
create policy "families_delete_own" on public.families
  for delete to authenticated using (owner = (select auth.uid()));

-- Živá synchronizace mezi tabletem a mobilem (Realtime).
do $$
begin
  alter publication supabase_realtime add table public.families;
exception when duplicate_object then null;
end $$;
