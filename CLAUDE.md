# Projeto: Convite de Aniversário — Tema Country/Western

## Visão geral
Site de convite virtual para festa de aniversário com tema country/western
("Last Rodeo"), com formulário de confirmação de presença (RSVP), área
administrativa protegida para exportar a lista de confirmados, e efeitos
sonoros temáticos. Deploy final no Vercel.

Público-alvo: convidados acessando majoritariamente pelo celular. A prioridade
de design #1 é responsividade mobile-first.

Consulte sempre os arquivos em `docs/` antes de tomar decisões de arquitetura,
schema ou estilo — eles têm as especificações completas.

## Stack tecnológico (já decidido — não trocar sem confirmar com o usuário)
- **Framework:** Next.js (App Router) + TypeScript
- **Estilização:** Tailwind CSS
- **Banco de dados:** Supabase (Postgres)
- **Animação de áudio:** Howler.js
- **Exportação de confirmações:** PDF client-side com `jsPDF`
- **Deploy:** Vercel

Detalhes e justificativas completas em `docs/tech-stack.md`.

## Funcionalidades obrigatórias
1. **Página do convite** — responsiva, com a identidade visual descrita em
   `docs/design-reference.md`.
2. **Formulário de RSVP** — visitante informa nome e confirma presença
   (sim/não). CRUD básico: criar e listar confirmações (não precisa de
   editar/deletar pelo visitante).
3. **Área admin (`/admin`)** — protegida por senha única (variável de
   ambiente, NÃO hardcoded). Lista todas as confirmações e permite exportar
   um PDF (nome + status de confirmação) com um clique.
4. **Efeitos sonoros** — tocam em interações-chave (ex: clique no botão de
   confirmar, hover em botões). Ver `docs/design-reference.md` para
   sugestões de sons e fontes gratuitas. Sempre com opção de mute — nunca
   tocar áudio alto automaticamente sem interação do usuário.
5. **Lista de presentes** — seção na própria página com as sugestões de
   presente (mantendo o estilo de colagem), com um botão de download do
   PDF correspondente. Detalhes e texto completo em
   `docs/design-reference.md`.

## Estrutura de projeto esperada
```
/app
  /page.tsx              → página principal do convite
  /admin/page.tsx         → área administrativa (protegida)
  /api/rsvp/route.ts      → POST (criar confirmação) / GET (listar, uso admin)
/components
  /RsvpForm.tsx
  /SoundButton.tsx        → wrapper reutilizável para botões com efeito sonoro
/lib
  /supabase.ts            → client do Supabase
/public
  /sounds/                → arquivos de áudio
  /downloads/             → PDF da lista de presentes (ver public-assets/)
/docs                     → esta pasta de contexto (manter no repo é opcional)
```

## Convenções de código
- TypeScript estrito, sem `any` sem justificativa.
- Componentes funcionais, hooks do React.
- Variáveis de ambiente sempre via `.env.local` (nunca commitadas) — criar
  um `.env.example` com os nomes das chaves necessárias.
- Commits pequenos e descritivos.

## O que NÃO fazer
- Não expor a senha de admin ou chaves do Supabase no código-fonte ou no
  client-side além do necessário (usar Route Handlers do Next.js, nunca
  chamar o Supabase com a service key direto do browser).
- Não usar bibliotecas de UI pesadas (Material UI, Ant Design, etc.) — o
  projeto é pequeno, Tailwind puro é suficiente.
- Não adicionar autenticação de usuário completa (login de convidado) — não
  faz parte do escopo, apenas nome + confirmação.

## Dados do evento (confirmados)
- Evento: **Welly's Last Rodeo!**
- Data e horário: **Sexta, 14 Agosto — 20h**
- Local: **Torre Solazzo, Trav. Humaitá, 1301**
- Frase de destaque: "Somente Cowgirls e Cowboys Entram!"
- Paleta de cores: rosa, marrom, dourado/prata (sem laranja — ver
  `docs/design-reference.md` para detalhes)
- Estilo visual definitivo: **colagem/scrapbook digital** (stickers PNG
  transparentes sobre fundo com textura de papel), não a ilustração
  line-art simples. Ver `docs/design-reference.md` para especificação
  completa do componente de sticker, fontes e responsividade.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
