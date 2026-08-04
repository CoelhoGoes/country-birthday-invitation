create table rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  confirmed boolean not null,
  created_at timestamptz not null default now()
);

alter table rsvps enable row level security;

create policy "Permitir insercao publica"
  on rsvps for insert
  to anon
  with check (true);