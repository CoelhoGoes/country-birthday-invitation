# Last Rodeo — Convite de Aniversário 🤠

Convite virtual para festa de aniversário com tema country/western, com
formulário de RSVP, área administrativa para exportar a lista de
confirmados e efeitos sonoros temáticos.

Consulte a pasta [`docs/`](docs/) para o contexto completo do projeto
(stack, schema do banco, identidade visual) e o [`CLAUDE.md`](CLAUDE.md)
na raiz para as regras gerais.

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS**
- **Supabase** (Postgres) — via `@supabase/supabase-js`
- **Howler.js** — efeitos sonoros
- **xlsx** (SheetJS) — exportação de planilha
- Deploy: **Vercel**

## Estrutura do projeto

```text
app/
  page.tsx                    → página principal do convite
  layout.tsx                  → layout raiz (fontes, SoundProvider, MuteToggle)
  globals.css                 → estilos globais / Tailwind
  admin/
    page.tsx                  → área administrativa (server component,
                                 decide entre login e dashboard via cookie)
  api/
    rsvp/route.ts              → POST público (criar RSVP) / GET protegido (listar)
    export/route.ts            → GET protegido, gera e retorna .xlsx
    admin/login/route.ts       → POST (login) / DELETE (logout) — seta/limpa
                                  o cookie de sessão admin

components/
  RsvpForm.tsx                 → formulário de confirmação de presença
  SoundButton.tsx               → botão com efeitos sonoros (Howler.js)
  SoundProvider.tsx             → contexto global de mute (persistido em localStorage)
  MuteToggle.tsx                → botão fixo de ligar/desligar som
  AdminLoginForm.tsx            → formulário de senha da área admin
  AdminDashboard.tsx            → listagem de confirmações + botão de exportar

lib/
  supabase.ts                   → client público (anon key) — usado para o INSERT do RSVP
  supabaseAdmin.ts               → client server-only (service role key) — nunca
                                  importado em componentes client-side
  adminAuth.ts                   → validação da senha de admin / nome do cookie

supabase/
  schema.sql                    → SQL para criar a tabela `rsvps` e as políticas de RLS
                                  (rodar manualmente no SQL Editor do Supabase)

public/
  sounds/                       → arquivos de áudio (.mp3) usados pelo SoundButton
                                  (ver public/sounds/README.md)

docs/                           → contexto do projeto (stack, schema, design)
```

## Como rodar localmente

### Pré-requisitos

- Node.js 18+ (recomendado via [nvm](https://github.com/nvm-sh/nvm))
- Uma conta/projeto no [Supabase](https://supabase.com) (plano free é suficiente)

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No **SQL Editor** do painel, rode o conteúdo de [`supabase/schema.sql`](supabase/schema.sql)
   para criar a tabela `rsvps` e as políticas de RLS.
3. Em **Project Settings → API**, copie a `Project URL`, a `anon public key`
   e a `service_role key`.

### 3. Configurar variáveis de ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env.local
```

Preencha `.env.local` com:

```env
NEXT_PUBLIC_SUPABASE_URL=          # Project URL do Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=     # anon public key do Supabase
SUPABASE_SERVICE_ROLE_KEY=         # service_role key do Supabase (nunca expor no client)
ADMIN_PASSWORD=                    # senha única para acessar /admin e exportar a lista
```

### 4. Rodar o servidor de desenvolvimento

```bash
npm run dev
```

Acesse:

- [http://localhost:3000](http://localhost:3000) — página do convite
- [http://localhost:3000/admin](http://localhost:3000/admin) — área administrativa (pede a `ADMIN_PASSWORD`)

### 5. (Opcional) Adicionar os efeitos sonoros

Coloque os arquivos `.mp3` em `public/sounds/` seguindo os nomes esperados
em [`public/sounds/README.md`](public/sounds/README.md). Sem eles o site
funciona normalmente, só que sem som.

## Scripts disponíveis

| Comando         | Descrição                            |
| --------------- | ------------------------------------ |
| `npm run dev`   | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção             |
| `npm run start` | Sobe o build de produção localmente  |
| `npm run lint`  | Roda o ESLint                        |

## Pendências de conteúdo

Antes do deploy final, substitua os placeholders `TODO` em
[`app/page.tsx`](app/page.tsx): nome do(a) aniversariante, data/horário,
local e o texto do convite.

## Deploy no Vercel

1. Suba o repositório para o GitHub.
2. Em [vercel.com](https://vercel.com) → **Add New Project** → importe o repositório.
3. Configure as mesmas 4 variáveis de ambiente do `.env.local` no painel do Vercel.
4. Deploy — pushes na branch principal geram deploy automático.
