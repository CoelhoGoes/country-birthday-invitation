# Last Rodeo — Convite de Aniversário 🤠

Convite virtual para festa de aniversário com tema country/western, no
estilo colagem/scrapbook digital. Reúne a página do convite, confirmação
de presença (RSVP), uma área administrativa para gestão dos confirmados
e efeitos sonoros temáticos, com deploy no Vercel.

Consulte a pasta [`docs/`](docs/) para o contexto completo do projeto
(stack, schema do banco, identidade visual) e o [`CLAUDE.md`](CLAUDE.md)
na raiz para as regras gerais.

## Funcionalidades

- **Página do convite** — responsiva (mobile-first), com identidade visual
  de colagem/scrapbook: stickers PNG sobre fundo com textura de papel.
- **RSVP** — visitante informa nome e confirma presença; as respostas ficam
  registradas no banco.
- **Área administrativa (`/admin`)** — protegida por senha, lista as
  confirmações recebidas e permite exportar a lista para `.xlsx`.
- **Efeitos sonoros** — tocam em interações-chave (RSVP, hover em botões),
  com controle de mute persistente.
- **Lista de presentes** — seção com as sugestões de presente e download do
  PDF correspondente.

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
  schema.sql                    → SQL da tabela `rsvps` e das políticas de RLS

public/
  sounds/                       → arquivos de áudio (.mp3) usados pelo SoundButton

docs/                           → contexto do projeto (stack, schema, design)
```

## Configuração

Variáveis de ambiente (ver [`.env.example`](.env.example)):

| Variável | Descrição |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL do Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon public key do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key do Supabase (server-only) |
| `ADMIN_PASSWORD` | Senha única para acessar `/admin` e exportar |

Scripts npm disponíveis:

| Comando         | Descrição                            |
| --------------- | ------------------------------------ |
| `npm run dev`   | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção             |
| `npm run start` | Sobe o build de produção localmente  |
| `npm run lint`  | Roda o ESLint                        |
