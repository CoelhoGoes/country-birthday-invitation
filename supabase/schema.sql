-- Rode este script manualmente no SQL Editor do painel do Supabase.
-- Fonte: docs/database-schema.md

create table rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  confirmed boolean not null,
  created_at timestamptz not null default now()
);

-- Row Level Security: permitir apenas INSERT público (via anon key)
alter table rsvps enable row level security;

create policy "Permitir insercao publica"
  on rsvps for insert
  to anon
  with check (true);

-- SELECT completo (para listagem/exportação) só deve acontecer via
-- service role key, em rota server-side protegida por senha — não criar
-- policy de SELECT para o role "anon".
