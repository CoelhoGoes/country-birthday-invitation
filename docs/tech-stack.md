# Stack Tecnológico — Detalhes

## Frontend: Next.js + Tailwind CSS
- Integração nativa com Vercel (mesmo criador) — deploy é conectar o repo
  do GitHub e pronto, sem configuração extra.
- App Router (não usar Pages Router).
- Tailwind CSS para responsividade mobile-first e customização rápida do
  tema visual (fontes western, texturas, paleta de cores).

## Banco de dados: Supabase (Postgres)
- Plano free é suficiente para este projeto (baixo volume de dados).
- Painel visual (Table Editor) já dá ao dono do projeto uma forma de ver a
  lista de confirmações sem depender só da exportação — serve como backup
  de visualização.
- Usar o client oficial `@supabase/supabase-js`.
- Autenticação com o banco: usar a **anon key** apenas para operações
  permitidas por RLS (Row Level Security) no client, e a **service role
  key** apenas em Route Handlers server-side (nunca exposta ao browser).

## Exportação de confirmações: PDF via `jsPDF` (client-side)

- Gerado direto no navegador a partir dos dados já carregados na tela do
  admin (`AdminDashboard`), sem rota de API dedicada — evita manter uma
  dependência extra (`xlsx`/SheetJS) só para isso.
- Conteúdo do PDF: apenas nome e status de confirmação (Sim/Não) de cada
  convidado, seguindo o mesmo padrão de `lib/giftListPdf.ts`.
- Implementado em `lib/rsvpPdf.ts` (`downloadRsvpPdf`).

## Efeitos sonoros: Howler.js
- Mais confiável que `<audio>` puro em navegadores mobile (lida melhor com
  autoplay policies e múltiplos sons simultâneos).
- Uso básico:
  ```ts
  import { Howl } from 'howler';
  const clickSound = new Howl({ src: ['/sounds/spur-click.mp3'] });
  clickSound.play();
  ```
- Sempre carregar os sons sob demanda ou com `preload: true` apenas para
  os sons críticos (não travar o carregamento inicial da página).

## Deploy: Vercel
- Conectar repositório do GitHub → deploy automático a cada push na
  branch principal.
- Variáveis de ambiente (Supabase URL/keys, senha de admin) configuradas
  no painel do Vercel, não no código.
