Quero que você configure do zero um projeto Next.js (App Router + TypeScript)
para um site de convite de aniversário com tema country/western, incluindo
formulário de RSVP, área admin para exportar a lista de confirmados, e
efeitos sonoros temáticos.

Antes de escrever qualquer código, leia os arquivos de contexto que já
preparei na pasta `docs/` deste repositório (especialmente `CLAUDE.md` na
raiz, `docs/tech-stack.md`, `docs/database-schema.md` e
`docs/design-reference.md`) — eles têm o stack já decidido, o schema do
banco, a identidade visual e as regras do projeto. Siga exatamente o que
está definido lá, não troque tecnologias.

Passos que eu quero que você siga, nessa ordem:

1. Inicialize o projeto Next.js com TypeScript e Tailwind CSS já configurados.
2. Configure a integração com Supabase (`@supabase/supabase-js`), criando o
   client em `/lib/supabase.ts` e um `.env.example` com as variáveis
   necessárias (não preencha valores reais).
3. Gere o SQL de criação da tabela `rsvps` conforme `docs/database-schema.md`
   num arquivo `supabase/schema.sql`, para eu rodar manualmente no painel do
   Supabase.
4. Implemente a página principal do convite (`/app/page.tsx`) com layout
   responsivo mobile-first, usando a paleta e direção de estilo descritas em
   `docs/design-reference.md`. Onde houver dados marcados como `TODO`
   (data, local, texto do convite), use placeholders visíveis e claros — não
   invente informações definitivas.
5. Implemente o formulário de RSVP (`/components/RsvpForm.tsx` + rota
   `/api/rsvp`) que insere nome e confirmação (booleano) na tabela `rsvps`.
6. Implemente a área `/admin` protegida por senha única via variável de
   ambiente, com listagem das confirmações e botão de exportação
   (`/api/export`) gerando `.xlsx` (usando a lib `xlsx`).
7. Adicione um componente reutilizável de botão com efeito sonoro
   (`/components/SoundButton.tsx`) usando Howler.js, com placeholders de
   caminho de arquivo de áudio em `/public/sounds/` (vou adicionar os
   arquivos reais depois, com base nas sugestões de fontes gratuitas em
   `docs/design-reference.md`).
8. Ao final, me dê um resumo do que falta preencher manualmente antes do
   deploy (variáveis de ambiente, arquivos de áudio, textos do convite) e
   um passo a passo simples para eu conectar o repositório ao Vercel.

Se qualquer coisa não estiver clara nos arquivos de contexto, me pergunte
antes de assumir.
