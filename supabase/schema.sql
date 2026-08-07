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

create function rsvps_normalize_name()
returns trigger as $$
begin
  new.name := initcap(trim(new.name));
  return new;
end;
$$ language plpgsql;

create trigger rsvps_normalize_name_trigger
  before insert or update on rsvps
  for each row
  execute function rsvps_normalize_name();

create unique index rsvps_name_unique_idx on rsvps (lower(name));
