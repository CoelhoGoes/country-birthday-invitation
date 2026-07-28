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
```

## Observações
- Não há necessidade de UPDATE/DELETE pelo convidado no escopo atual. Se
  no futuro quiser permitir que a pessoa corrija o próprio RSVP, considerar
  adicionar um campo de identificação (ex: e-mail) e políticas adicionais.
- Nomes duplicados são permitidos por padrão (duas pessoas podem ter o
  mesmo nome). Se quiser evitar duplicados exatos, avaliar com o usuário
  antes de adicionar constraint `unique`.
