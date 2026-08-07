# Schema do Banco de Dados (Supabase / Postgres)

## Tabela: `rsvps`

| Coluna       | Tipo        | Descrição                                      |
|--------------|-------------|-------------------------------------------------|
| `id`         | `uuid`      | Chave primária, `default gen_random_uuid()`      |
| `name`       | `text`      | Nome informado pelo convidado (obrigatório)      |
| `confirmed`  | `boolean`   | `true` = vai / `false` = não vai                 |
| `created_at` | `timestamptz` | `default now()` — data/hora do registro       |

### SQL de criação

```sql
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

-- Normaliza o nome (trim + Title Case) antes de inserir/atualizar.
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

-- Bloqueia nomes duplicados (case-insensitive).
create unique index rsvps_name_unique_idx on rsvps (lower(name));
```

## Regras de dados

- **Normalização**: todo `name` é salvo em Title Case (`initcap`) e sem
  espaços nas pontas, via trigger — vale tanto para o INSERT público quanto
  para UPDATE feito pelo admin.
- **Duplicidade**: nomes duplicados (case-insensitive) são rejeitados pelo
  índice único `rsvps_name_unique_idx`. Uma tentativa de INSERT/UPDATE que
  viole isso retorna o erro Postgres `23505` (`unique_violation`), que as
  rotas em `app/api/rsvp/**` traduzem para uma resposta `409` amigável.
- **Ordenação alfabética**: não é uma propriedade armazenada da tabela —
  é responsabilidade de cada query de leitura usar `order by name asc`
  (ver `app/api/rsvp/route.ts` e `app/api/rsvp/public/route.ts`).
- Não há UPDATE/DELETE pelo convidado no formulário público — essas
  operações só existem via `/admin` (rotas protegidas por senha).
