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

## Exportação de planilha: lib `xlsx` (SheetJS)
- Gera arquivo `.xlsx` real (abre direto no Excel/Google Sheets) a partir
  de um array de objetos JS.
- Alternativa mais simples se preferir: gerar `.csv` puro (sem
  dependências), já que o requisito também aceita "txt simples".
- Rota `/api/export` deve:
  1. Validar a senha de admin (header ou query param).
  2. Buscar todos os registros no Supabase.
  3. Montar a planilha e retornar como download (`Content-Disposition:
     attachment`).

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
