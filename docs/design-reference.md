# Referência de Design — Tema Country/Western

## Origem
Baseado no convite de referência: "Brown And Beige Vintage Western
Illustrative Last Rodeo" (convite virtual, estilo country/pop, com
ilustração vintage western).

## Paleta de cores (DEFINITIVA)
- **Marrom** (tons de destaque, títulos, botão Confirmar/Baixar)
- **Rosa** (frase de destaque, card de aviso, botão Copiar)
- **Prata** (acentos, elementos metálicos como bola de espelho e balão)

Laranja foi **descartado** — não usar.

## Direção de estilo (definida a partir do convite real — ver `convite.pdf`)
O convite final tem 2 abordagens visuais diferentes; o site deve seguir a
**segunda**, que é a que o usuário confirmou como referência:

1. *(Não usar como base)* Ilustração line-art vintage western simples.
2. **Colagem/scrapbook digital** — estilo escolhido para o site. Elementos
   como bola de espelho, chapéu de cowboy rosa, bota com laço rosa, vaquinha
   com bubblegum e uma foto pessoal com moldura branca (tipo polaroid),
   todos "colados" sobre um fundo com textura de papel kraft/bege, cada um
   levemente rotacionado e se sobrepondo uns aos outros, com sombra sutil
   por baixo (dá sensação de profundidade/colado fisicamente).

### Características do estilo colagem
- **Fundo:** textura de papel kraft/bege (não branco liso).
- **Stickers:** imagens PNG com fundo transparente, cada uma com leve
  rotação (ex: -8°, 5°, 12°) e `drop-shadow` sutil, posicionadas de forma
  assimétrica e espalhada, mas sem cobrir o texto principal.
- **Tipografia (DEFINITIVA — fontes reais usadas no Figma/convite):**
  Todas estão disponíveis no Google Fonts (carregar via `next/font/google`
  em `app/layout.tsx`, expondo cada uma como CSS variable):
  - **Dr Sugiyama** → destaques em script: o título "Welly's Last Rodeo!"
    e a frase "Somente Cowgirls e Cowboys Entram!". (variable sugerida:
    `--font-script`)
  - **Miltonian Tattoo** → outros títulos que precisam priorizar
    legibilidade: "Confirme sua presença", "Lista de Presentes", e os
    títulos de categoria da lista (Maquiagem, Roupa, etc.). (variable:
    `--font-display`)
  - **Delius** → subtítulos e texto comum: tagline "Junte-se para
    celebrar", data/local, labels e itens de lista, textos dos botões.
    (variable: `--font-body`)
  - Remover as fontes antigas que o Claude Code tinha escolhido por conta
    própria (Bilbo, Caveat, Poppins, Rye) — elas causaram inconsistência e
    não correspondem ao Figma.
- **Paleta:** rosa + marrom + dourado/prata, com bastante respiro entre
  elementos — mesmo com vários stickers, o layout não deve parecer poluído.
- Manter contraste suficiente entre rosa/marrom/prata para acessibilidade
  em telas pequenas.

### Componente de sticker (React) — padrão a ser usado no projeto
```tsx
// components/CollageSticker.tsx
type Props = {
  src: string;
  alt: string;
  rotate?: number;      // graus, ex: -8, 5, 12
  top: string;          // posição em %, ex: "5%" — usar % para escalar em mobile
  left: string;
  width: string;        // ex: "35%"
  zIndex?: number;
};

export function CollageSticker({ src, alt, rotate = 0, top, left, width, zIndex = 1 }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        position: 'absolute',
        top, left, width,
        transform: `rotate(${rotate}deg)`,
        filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.15))',
        zIndex,
      }}
    />
  );
}
```
O container principal da seção deve ser `position: relative` para servir
de âncora aos stickers posicionados em `absolute`.

### Responsividade do layout de colagem
Em telas pequenas, muitos stickers sobrepostos podem cobrir o texto ou
ficar poluído. Regras a seguir:
- O texto principal (título, data, local) tem **sempre prioridade de
  legibilidade** — nunca pode ficar coberto por um sticker.
- Abaixo de um breakpoint mobile (`sm`, ~640px), reduzir a quantidade de
  stickers visíveis simultaneamente e/ou diminuir seu tamanho/opacidade.
- Testar sempre em viewport de celular real (não só redimensionando o
  navegador), já que é o principal meio de acesso dos convidados.

### Fontes de imagens para os stickers (buscar como PNG transparente)
O usuário já vai garimpar imagens no Pinterest, mas a orientação de busca é:
- Priorizar resultados com "png transparent" ou "clipart" na descrição, não
  fotos com fundo branco/sólido (evita ter que recortar manualmente).
- Resolução mínima recomendada: 500–800px no lado maior, para não pixelizar
  em telas grandes.
- Manter um estilo visual consistente entre os stickers escolhidos (ex:
  todos com contorno/sombra parecidos), evitando misturar fontes de imagem
  muito diferentes entre si.
- Fontes sugeridas: Pinterest (principal), PNGTree, Vecteezy, Freepik
  (atenção a exigência de atribuição em alguns casos).

## Efeitos sonoros — sugestões e fontes gratuitas
Ideias de sons para usar nas interações da página:
- Tilintar de esporas ao passar o mouse/tocar em botões.
- Som de laço (rope swoosh) ao confirmar presença com sucesso.
- Trecho curto de banjo/violão como música de fundo opcional (com botão de
  mute visível — nunca autoplay sem controle do usuário).

Fontes gratuitas e livres de direitos:
- **Freesound.org** — buscar "cowboy", "spurs", "boots", "lasso", "banjo"
  (filtrar por licença Creative Commons).
- **Pixabay Sound Effects** (pixabay.com/sound-effects) — licença simples,
  sem necessidade de atribuição.
- **Zapsplat.com** — categoria Western/Country (requer cadastro gratuito).
- **Mixkit.co/free-sound-effects** — coleção menor, boa qualidade, uso livre.

## Dados do evento (confirmados a partir de `convite.pdf`)
- Título/evento: **Welly's Last Rodeo!**
- Chamada: "Junte-se para celebrar"
- Data e horário: **Sexta, 14 Agosto — 20h**
- Local: **Torre Solazzo — Trav. Humaitá, 1301**
- Frase de destaque: "Somente Cowgirls e Cowboys Entram!"

## Seção de Lista de Presentes (confirmada como parte do site)
A 3ª página do convite original (`convite.pdf`) tem sugestões de presentes
(maquiagem, roupa, sapato, acessórios, cosméticos). Essa seção **entra no
site como conteúdo real renderizado em HTML** — não é apenas um PDF
embutido ou linkado. O texto completo e definitivo está em
`docs/gift-list-content.md`; usar exatamente esse conteúdo, não placeholder.

Requisitos:

- Exibida como uma seção própria na página (mantendo o estilo de colagem —
  pode usar cards/blocos com a mesma textura de papel e tipografia
  manuscrita das outras seções, sem precisar replicar o layout exato do
  PDF), com uma lista/categoria por bloco (Maquiagem, Roupa, Sapato,
  Acessórios, Cosméticos, Outras ideias).
- Incluir a frase de aviso do próprio convite no topo da seção (texto exato
  em `docs/gift-list-content.md`).
- **Duas formas de exportar a lista**, ambas disponíveis na própria seção:
  1. **Baixar como PDF** — arquivo já pronto em
     `public-assets/downloads/lista-presentes-wellys-last-rodeo.pdf`, deve
     ser movido para `/public/downloads/` do projeto Next.js e linkado com
     `<a href="/downloads/lista-presentes-wellys-last-rodeo.pdf" download>`.
  2. **Copiar como texto** — botão "Copiar lista" que usa
     `navigator.clipboard.writeText(...)` para copiar o conteúdo formatado
     em texto simples (categorias + itens, sem markdown/HTML), com um
     feedback visual rápido (ex: texto do botão muda para "Copiado!" por
     alguns segundos).
- O PDF de download tem ~4,9 MB (é uma página só, mas com imagem de fundo
  em alta resolução) — aceitável para um link de download sob demanda, mas
  não deve ser carregado automaticamente/embutido na página (evitar
  impacto na performance mobile). O conteúdo em texto/HTML da seção em si
  é leve e não depende do PDF para ser exibido.

## Revisão pós-implementação — correções obrigatórias do layout de colagem
Uma primeira versão foi implementada, mas a estética de colagem não ficou
correta. Os problemas identificados e as correções obrigatórias estão
abaixo — **substituem/detalham** as regras gerais das seções anteriores
onde houver conflito.

### 1. Hero em full-bleed (largura total), não cartão estreito
A seção hero **não deve** ficar dentro de um container `max-w-md` nem
ter uma moldura retangular (`border` + `rounded-lg`) ao redor. Ela deve
ocupar 100% da largura da viewport (full-bleed), com os stickers se
espalhando de fato pela tela — a sensação deve ser de uma colagem numa
mesa/parede, não de um cartão emoldurado flutuando no vazio. Apenas o
texto principal (título, data, RSVP, lista de presentes) pode manter uma
largura de leitura confortável (`max-w-xl`/`max-w-2xl` centralizado)
dentro dessa seção full-bleed.

### 2. Textura de papel via imagem real (SUBSTITUI a versão CSS anterior)
O usuário forneceu a imagem real da textura de fundo, em
`public/images/background.png` (referência salva em
`docs/textura-fundo-referencia.png`). **Usar essa imagem** em vez da
textura CSS via `feTurbulence` — a versão CSS ficou escura/acinzentada e
"sujou" a página. A textura real é um papel bege claro (off-white) com
grão sutil.

Substituir a regra `.bg-paper` em `app/globals.css` por algo como:
```css
.bg-paper {
  background-color: #efe4d0; /* fallback ~ kraft.light */
  background-image: url("/images/background.png");
  background-size: cover;      /* ou "auto" com repeat, testar qual fica melhor */
  background-position: center top;
  background-attachment: scroll;
}
```
Remover completamente o `::before` com o SVG base64 de ruído. A cor de
fundo real da imagem é clara (bege/off-white), então textos marrom e rosa
mantêm bom contraste. Se a imagem for muito curta para páginas longas,
usar `background-repeat: repeat` com um `background-size` fixo em vez de
`cover`.

### 3. Zonas de exclusão de texto (evitar colisões como a da foto com "Torre Solazzo")
Definir mentalmente a seção hero em 3 faixas verticais:
- **Faixa central (~30%–70% da largura)**: reservada para o bloco de
  texto (tagline, título, data/local, frase de destaque). Nenhum sticker
  deve ter seu centro dentro dessa faixa na mesma altura vertical do
  texto.
- **Faixas laterais (0–30% e 70–100%)**: onde os stickers devem se
  concentrar, em todas as alturas.
- A foto estilo polaroid deve ficar deslocada para uma lateral (ex: canto
  inferior direito) em vez de atrás/perto do bloco de texto central.

### 4. Mobile: reduzir e reposicionar, nunca esconder
Nenhum sticker deve usar `hidden sm:block` ou equivalente — isso remove a
colagem inteira no celular, que é o principal meio de acesso. Em vez
disso, cada sticker deve ter posição/tamanho próprios para mobile (menor
e reposicionado para não colidir com texto em tela estreita), usando
classes responsivas do Tailwind (ex: `top-[4%] sm:top-[6%] w-[26%]
sm:w-[18%]`) ao invés de simplesmente ocultar o elemento.

### 5. Usar todos os stickers já disponíveis (evitar vazio)
Há stickers já preparados em `/public/stickers/` que não foram usados e
deixam a composição com espaço morto: `sheriff-star.png`,
`wanted-poster.png`, `21-balloon.png`, `cow.png` (segunda vaca, distinta
de `cow-bubblegum.png`), `disco-ball-2.png`, `pink-ribbon-2.png`,
`pink-ribbon-3.png`, `pink-ribbon-4.png`. Distribuir esses elementos
adicionais no espaço vazio entre o hero e a seção "Lista de Presentes",
e/ou como acentos pequenos espalhados (ex: laços e estrela do xerife em
tamanho reduzido, como "confete") para aumentar a densidade visual sem
comprometer a legibilidade.

### 6. Espaço morto entre seções
Reduzir o espaçamento vertical excessivo entre o hero e "Lista de
Presentes" — hoje há um vão grande e vazio. Preencher com os stickers
adicionais do item 5 e/ou reduzir o `gap`/`min-height` da seção hero para
um valor mais compacto e proporcional ao conteúdo real.

## Revisão 2 — reconciliar full-bleed com fidelidade ao convite original
A primeira correção deixou o fundo full-bleed correto, mas a composição
"esticou" para os 4 cantos da tela, perdendo a proximidade entre stickers
e texto que existe no convite original (`docs/original-reference.md` /
`convite.png`). Além disso, os stickers extras (item 5 da revisão
anterior) foram colocados numa única fileira horizontal, parecendo uma
prateleira, não uma colagem espalhada. Correções obrigatórias:

### 1. Card de composição com largura limitada, centralizado sobre o fundo full-bleed
O **fundo** (textura de papel) continua ocupando 100% da viewport. Mas o
**conteúdo do hero** (tagline, título, data/local, frase de destaque, e os
5 stickers principais — bola de espelho, chapéu rosa, bota, vaquinha,
foto) deve ficar dentro de um container centralizado de largura limitada
(ex: `max-w-2xl`, ~672px — ajustar conforme necessário para reproduzir as
proporções do convite original). As posições em % dos stickers principais
devem ser recalculadas **relativas a esse container menor**, não à
viewport inteira, para recriar a proximidade/sobreposição do convite
original: chapéu quase tocando o título, bota se sobrepondo levemente à
vaquinha, foto próxima (mas não sobre) do texto de endereço — igual à
imagem de referência `convite.png`.

### 2. Distribuir os stickers extras em pelo menos 3 zonas ao longo da página (nunca em fileira única)
Os 8 stickers extras (`sheriff-star`, `wanted-poster`, `21-balloon`,
`cow`, `disco-ball-2`, `pink-ribbon-2/3/4`) devem ser divididos em grupos
pequenos (2–3 cada) e espalhados em zonas diferentes da página, com
rotações/tamanhos variados — não enfileirados horizontalmente no mesmo
ponto de scroll. Sugestão de distribuição:
- **Zona A — logo abaixo do hero, antes do RSVP:** `sheriff-star` +
  `wanted-poster`, pequenos, um de cada lado da margem (não no centro).
- **Zona B — ao redor do título "Lista de Presentes":** `21-balloon` +
  `disco-ball-2`, um de cada lado do heading, tamanho reduzido.
- **Zona C — entre as categorias da lista de presentes ou no rodapé:**
  `cow` + as variações de `pink-ribbon`, como acentos pequenos nas margens
  laterais dessa seção (não sobre o texto).
Cada zona deve ter espaçamento vertical suficiente entre si (nada de
todos consecutivos na mesma faixa de scroll).

### 3. Mobile segue a mesma lógica
No mobile, o hero mantém proximidade sticker-texto (adaptada para tela
estreita, sem cobrir texto). Os extras das Zonas A/B/C continuam
existindo, só que reposicionados/reduzidos para a largura da tela — nunca
removidos, e nunca todos amontoados na mesma faixa vertical (hoje aparecem
todos numa fileira só, logo acima de "Lista de Presentes" — corrigir).

## Revisão 3 — Especificação definitiva mobile-first (baseada no protótipo)
O usuário fez um protótipo no Figma (exportado como PDF, salvo aqui como
`docs/prototipo-mobile.png`) que define o layout mobile de forma precisa.
**Esta seção define a implementação mobile (breakpoint base, sem prefixo
`sm:`/`md:`/`lg:`) e substitui, só pra mobile, a abordagem de colagem
espalhada em posições absolutas das Revisões 1 e 2.** O desktop (telas
`sm:` pra cima) continua usando a lógica de colagem full-bleed já
documentada — não mexer no desktop nesta rodada, só no mobile.

### Estratégia de breakpoints
1. **Construir primeiro o mobile** (classes Tailwind sem prefixo = base),
   seguindo exatamente `docs/prototipo-mobile.png`, sem se preocupar com
   desktop nesta etapa.
2. Só depois, numa etapa separada, expandir com `sm:`/`md:`/`lg:` para o
   layout desktop (que já existe e não deve quebrar).
3. Isso evita ter que fazer tudo funcionar ao mesmo tempo em todas as
   telas — reduz a complexidade de debugar responsividade.

### Técnica: stickers "sangrando" pelas bordas (corner-bleed)
No protótipo, a bola de espelho, o laço rosa, o balão "21" e o chapéu
ficam parcialmente cortados pela borda superior da tela — como se
estivessem "espiando" de fora. Isso é diferente da técnica de colagem
espalhada (Revisões 1/2). Implementação:
```css
/* seção hero no mobile */
.hero-mobile {
  position: relative;
  overflow: hidden; /* corta o que sair da seção */
}
```
```tsx
// sticker de canto, parcialmente fora da viewport
<CollageSticker
  src="/stickers/disco-ball.png"
  top="-6%"
  left="-8%"
  width="42%"
  rotate={-5}
/>
```
Usar `top`/`left` negativos posiciona o sticker parcialmente fora da
seção; o `overflow: hidden` do container corta a parte excedente,
criando o efeito de "sangria" visto no protótipo.

### Estrutura do mobile, seção por seção

**1. Hero**
- Canto superior esquerdo: bola de espelho + laço rosa, sangrando pela
  borda superior/esquerda.
- Canto superior direito: balão "21" + chapéu rosa, sangrando pela borda
  superior/direita.
- Texto central: "Junte-se para celebrar" → título "Welly's Last Rodeo!"
  (fonte script) → "Sexta, 14 Agosto / 20H / Torre Solazzo / Trav.
  Humaitá, 1301" → **"Somente Cowgirls e Cowboys Entram!"** (cor de
  destaque rosa, mantida — não remover).
- Abaixo do texto: bota com laço (esquerda) e vaquinha com bubblegum
  (centro-esquerda) como acentos, e a foto polaroid à direita, todos numa
  faixa entre o texto e o card de RSVP, sem cobrir o texto.

**2. Card de RSVP ("Confirme sua presença")**
Card com fundo cream/branco, borda arredondada, sombra sutil:
- Título "Confirme sua presença" (fonte bold, não script)
- Label "Seu nome" + input de texto com placeholder "Digite seu nome e
  sobrenome"
- Label "Vai participar da festa?"
- Dois botões tipo pílula lado a lado, com estado selecionado visível:
  "Sim, vou!" e "Não vou" (usar como os dois valores do campo boolean de
  confirmação, não um checkbox tradicional)
- Botão "Confirmar" em largura total, fundo marrom escuro sólido

**3. Lista de Presentes**
- Heading "Lista de Presentes" (fonte script) com a vaquinha (`cow.png`)
  no canto esquerdo e a estrela do xerife (`sheriff-star.png`) no canto
  direito, ambos sobrepondo levemente as bordas do heading.
- Card rosa com o texto de aviso exato (`docs/gift-list-content.md`).
- Cards brancos/cream com cantos arredondados, um pequeno laço
  (`pink-ribbon-*.png`) sangrando de um dos cantos superiores de cada
  card, título da categoria em negrito, lista com marcadores.
- **Quantidade de cards:** o protótipo mostra 3 como exemplo, mas o
  conteúdo real tem 6 categorias (Maquiagem, Roupa, Sapato, Acessórios,
  Cosméticos, Outras ideias) — decidir o agrupamento que ficar mais
  equilibrado visualmente (pode ser 1 card por categoria ou agrupar
  categorias menores, como "Outras ideias" com outra).

**4. Ações de exportação**
Dois botões empilhados, largura total, exatamente como no protótipo:
- "Baixar em Pdf" — fundo marrom escuro sólido (texto exato, com "Pdf"
  minúsculo como no protótipo)
- "Copiar Lista" — fundo rosa sólido
(Funcionalidade já especificada nas seções anteriores: download do PDF e
`navigator.clipboard.writeText`.)

## Revisão 4 — Correções críticas de composição (erros da implementação mobile)
A implementação mobile da Revisão 3 interpretou errado dois conceitos e
misturou-os. Esta seção corrige. **Referência visual autoritativa:
`docs/prototipo-mobile.png`.**

### Conceito A vs Conceito B — são DUAS técnicas diferentes, não uma
O erro central foi tratar "elementos na borda" como uma coisa só. São duas:

**Conceito A — Adjacência no hero (elementos encostados, NÃO empilhados).**
No hero do protótipo, os stickers do topo ficam *lado a lado, encostados
um no limite do outro*, formando uma "moldura" ao longo da borda superior
— eles NÃO se sobrepõem uns aos outros. No canto superior esquerdo: bola
de espelho + estrela + laço, próximos mas distintos. No canto superior
direito: balão "21" + chapéu rosa, próximos mas distintos. A implementação
atual empilhou tudo com `width` grande (46%, 56%, 42%) e posições que se
cruzam, virando uma pilha confusa. **Correção:** reduzir os tamanhos
(~20-28% cada), dar a cada sticker seu próprio espaço encostado no
vizinho, sem overlap significativo. Pensar em "peças de uma borda
decorada", não "pilha de figurinhas".

**Conceito B — Sticker transbordando um card (overflow VISÍVEL).**
Nos cards da lista de presentes, o laço deve ficar *por cima e por fora* da
borda do card, inteiro e visível, como se estivesse preso/pregado na
quina. A implementação atual colocou `overflow-hidden` no card, o que
**corta** o laço na borda e o faz parecer parte do fundo — exatamente o
efeito errado. **Correção:**
- O card NÃO pode ter `overflow: hidden`.
- O laço deve ser posicionado com `position: absolute` relativo ao card,
  com valores que o façam transbordar (ex: `top: -12px; right: -8px`), e
  `z-index` acima do card, para ficar visivelmente por cima da borda.
- Estrutura sugerida: um wrapper `position: relative` em volta do card;
  o card com seu `bg-white`/borda; e o laço como irmão absoluto DEPOIS do
  card no DOM (ou dentro, mas sem overflow-hidden), com z-index maior.

### Destaque da foto polaroid (está pequena/apagada demais)
No protótipo a foto do aniversariante (`polaroid-photo.png`) tem destaque:
fica à direita, em tamanho considerável, como um dos elementos âncora do
hero — não um acento pequeno perdido. **Correção:** aumentar o tamanho da
foto no hero mobile e posicioná-la com prioridade visual (à direita,
sobreposta levemente à faixa entre o texto e o card de RSVP), sem cobrir
texto. Ela deve "competir" em presença com o chapéu e a bola de espelho,
não sumir.

### Paleta correta (o Claude Code errou as cores do Figma)
As cores atuais em `tailwind.config.ts` não batem com o Figma. Ajustar
para a paleta DEFINITIVA (marrom, rosa, prata — sem laranja). Comparar os
tons diretamente com `docs/prototipo-mobile.png` e
`docs/convite-referencia.png` e ajustar os valores hex de `rosa`,
`marrom` e adicionar/ajustar `prata` conforme necessário para
corresponder ao que aparece nessas referências (o rosa do card de aviso, o
marrom dos botões, etc.).

### Resumo do que reimplementar no mobile
1. Hero: aplicar Conceito A (adjacência, sem empilhar; tamanhos menores).
2. Foto polaroid: aumentar e dar destaque.
3. Cards da lista: remover `overflow-hidden`, laço transbordando visível
   (Conceito B).
4. Textura: trocar CSS por `public/images/background.png`.
5. Fontes: Dr Sugiyama / Miltonian Tattoo / Delius (ver seção de
   tipografia).
6. Paleta: corrigir hex em `tailwind.config.ts` conforme referências.

## Revisão 5 — Bugs críticos de responsividade no hero mobile
Após a Revisão 4, o hero ficou bom em telas mobile maiores (~425px) mas
quebra em telas menores (320-375px). Analisando o `app/page.tsx` atual,
há dois bugs de layout (não é só questão de escala). **Piso de suporte
alvo: 360px** (Android moderno). Não é necessário otimizar abaixo de
360px, mas nada deve estourar visualmente.

### Bug 1 — Foto polaroid com `width="150%"` (CRÍTICO)
No bloco de acentos do hero mobile, a `polaroid-photo.png` está com
`width="150%"`, o que a torna 1,5× mais larga que a tela inteira. Como é
`position: absolute` a partir de `left="25%"`, ela estoura a borda direita
e é cortada pelo `overflow-x-hidden` do `<main>` — por isso aparece
gigante e cortada. **Correção:** reduzir para um valor coerente com o
protótipo (~42-46%), reposicionando `left`/`top` para que a foto fique à
direita, com destaque (âncora visual), mas inteira e sem cobrir texto.

### Bug 2 — `-mt-20` fixo causando colisão texto × stickers
O bloco de texto do hero usa `-mt-20` (margem negativa fixa de 80px) para
subir e encostar na moldura de stickers do topo. Como é um valor absoluto,
funciona em ~425px mas em telas menores (onde os stickers já estão mais
baixos/menores) puxa o texto para cima demais, fazendo a tagline/título
colidir com a bola de espelho e o balão "21". **Correção:** substituir o
`-mt-20` fixo por margens responsivas por breakpoint (ex: `-mt-12
xs:-mt-16 sm:-mt-20`), ou reestruturar para que o espaçamento entre a
moldura de stickers e o texto seja proporcional e não colida em nenhuma
largura ≥360px.

### Breakpoint intermediário `xs`
O Tailwind padrão só tem `sm:` (640px) como primeiro breakpoint, deixando
toda a faixa 320-640px com um único conjunto de valores — insuficiente,
porque a razão texto/sticker muda muito entre 360 e 640. Adicionar um
breakpoint custom em `tailwind.config.ts`:
```ts
theme: {
  extend: {
    screens: {
      xs: "400px",
    },
    // ...resto
  },
}
```
Isso permite dois conjuntos de ajustes na faixa mobile: base (360-399px) e
`xs:` (400-639px), antes do `sm:` (desktop). Aplicar principalmente aos
valores que hoje são fixos: margens negativas do texto e, se necessário,
tamanhos de fonte do título/tagline.

### Escopo desta rodada (incremental)
Corrigir **apenas os Bugs 1 e 2** (foto e colisão do texto) + adicionar o
breakpoint `xs` para viabilizá-los. Não refinar tamanhos de fonte ou
reposicionar outros stickers nesta rodada — validar esses dois primeiro,
refinar o resto depois.

## Revisão 6 — Refinamento de tipografia e espaçamento por breakpoint (hero mobile)
Os bugs críticos da Revisão 5 foram resolvidos (sem colisão, foto inteira).
Agora, refinamento fino do hero mobile. **Escopo: apenas tamanho de fonte
do texto do hero e espaçamentos verticais. NÃO reposicionar nem
redimensionar stickers nesta rodada.** Piso 360px, breakpoint `xs` (400px)
já disponível.

### 1. Escalonar o tamanho do título e da tagline por breakpoint
Hoje o título usa `text-6xl` fixo e a tagline `text-2xl` fixo. Em telas
pequenas (320-375px) o título fica grande demais, desequilibrado com o
resto. Escalonar por breakpoint, do menor (base) ao maior:
- Título (`h1`, fonte script Dr Sugiyama): algo como `text-4xl xs:text-5xl
  sm:text-6xl` — ajustar os degraus até ficar proporcional em 360/390/425.
- Tagline e frase de destaque: reduzir proporcionalmente no base (ex:
  `text-xl xs:text-2xl`), acompanhando o título.
- Bloco de data/local: pode reduzir levemente no base se necessário (ex:
  `text-lg xs:text-xl`) para manter a hierarquia.
Manter a fonte script Dr Sugiyama no título e na frase de destaque, e
Delius no restante — só o TAMANHO muda por breakpoint, não a família.

### 2. Apertar espaçamentos verticais em telas pequenas
Em 375px e menores sobra uma área vazia de textura no centro (entre o
endereço e os stickers de baixo), porque o texto encolhe mas os
espaçamentos ficam. Reduzir no base e aumentar via breakpoint:
- O `gap-3` do bloco de texto pode virar algo como `gap-2 xs:gap-3`.
- Os espaçamentos de margem/padding entre a moldura de stickers, o bloco
  de texto e a faixa de acentos inferior podem ser reduzidos no base e
  restaurados no `xs:`/`sm:`, para eliminar o vazio central sem apertar
  demais nas telas maiores.

### Fora de escopo nesta rodada
- Não mexer em posição, tamanho (`width`), `top`/`left` ou rotação de
  nenhum `CollageSticker` do hero.
- Não mexer no desktop.

## Revisão 7 — Breakpoints nomeados alinhados a tamanhos padrão de mobile
O breakpoint genérico `xs: 400px` (Revisão 5/6) causou pouca granularidade:
320px e 375px caem do mesmo lado do corte (ambos abaixo de 400), então
recebem exatamente as mesmas classes — dando a impressão de que nada mudou
entre eles. Substituir por breakpoints nomeados alinhados aos 3 tamanhos
de teste do usuário (os presets "Mobile S/M/L" do Chrome DevTools):

```ts
// tailwind.config.ts
theme: {
  extend: {
    screens: {
      "mobile-m": "375px", // Mobile M (Chrome DevTools preset)
      "mobile-l": "425px", // Mobile L (Chrome DevTools preset)
      // "sm" (640px) já existe por padrão e continua marcando a
      // transição pro layout desktop — não remover/alterar.
    },
  },
},
```
Com isso, a faixa mobile passa a ter 3 níveis reais de ajuste:
- **Base (sem prefixo):** 320-374px — "Mobile S", o mais restrito.
- **`mobile-m:`** 375-424px — "Mobile M".
- **`mobile-l:`** 425-639px — "Mobile L", antes do `sm:` (desktop, 640px+).

### Migração necessária
Todo lugar que hoje usa o prefixo `xs:` (introduzido nas Revisões 5/6 —
ex: `text-4xl xs:text-5xl sm:text-6xl`, `-mt-12 xs:-mt-16 sm:-mt-20`) deve
ser reescrito com os novos prefixos nomeados, ex:
`text-4xl mobile-m:text-[valor] mobile-l:text-5xl sm:text-6xl` — ajustando
os degraus de valor para que as 3 larguras de teste (320/375/425) fiquem
visivelmente distintas e proporcionais entre si, não apenas 2 estados.
Remover o breakpoint `xs: 400px` do `tailwind.config.ts` depois da
migração, pra não sobrar prefixo órfão.

### Validação obrigatória
Depois de aplicar, testar exatamente em 320px, 375px e 425px e confirmar
que HÁ diferença visível de escala/espaçamento entre os três (não só
entre "menor que 400" e "maior que 400"). Se não houver diferença
perceptível, verificar se o dev server/build foi de fato atualizado antes
de tirar os prints.

## Revisão 8 — Reversão: textura de fundo volta a ser CSS puro
O usuário decidiu reverter a Revisão 4 (item 2) — a textura via
`public/images/background.png` não era o que queria. **Voltar à textura
via CSS puro (`feTurbulence`)**, mas com um ajuste em relação à primeira
versão (Revisão 1/3): a versão original ficou escura/acinzentada demais.
Esta versão corrige isso com opacidade bem menor e blend mode diferente,
mantendo a base clara.

Substituir a regra `.bg-paper` em `app/globals.css` por:
```css
.bg-paper {
  background-color: #f3ead0; /* kraft.light — tom claro do papel */
  position: relative;
}

.bg-paper::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.18; /* bem mais sutil que a tentativa anterior (era 0.5) */
  mix-blend-mode: soft-light; /* mantém a base clara, evita escurecer/acinzentar */
  background-repeat: repeat;
  background-size: 180px 180px;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjxmZUNvbG9yTWF0cml4IHR5cGU9InNhdHVyYXRlIiB2YWx1ZXM9IjAiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbikiLz48L3N2Zz4=");
}
```
O conteúdo real (texto, stickers) deve ficar num elemento filho com
`position: relative; z-index: 1` para renderizar acima do `::before`.
Remover a referência a `background-image: url("/images/background.png")`.
O arquivo `public/images/background.png` pode continuar no projeto (não
precisa apagar), só não é mais referenciado em `globals.css`.

**Por que a mudança de opacidade/blend mode:** a primeira tentativa usava
`opacity: 0.5` com `mix-blend-mode: multiply`, o que escurecia a base
proporcionalmente à intensidade do ruído — daí o aspecto acinzentado.
`soft-light` a ~0.18 de opacidade preserva o tom claro de fundo (`kraft.light`)
e só adiciona uma textura sutil, sem escurecer a página.

## Revisão 9 — Nova seção "Referências" com tabs (substitui a seção fixa de Lista de Presentes)
Nova funcionalidade: uma aba de referências de roupa (fotos de outfits
pra inspiração dos convidados), com visual de feed do Instagram (aba
"Buscar"/Explore: grid 3 colunas, quadrado, gap mínimo). Para não alongar
a página, "Lista de Presentes" e "Referências" passam a dividir o mesmo
espaço através de **tabs**, trocando de painel sem mudar o tamanho da
página.

**Decisão: tabs implementadas em React puro (useState), sem adicionar
FlyonUI/Preline como dependência.** O usuário colou um exemplo de markup
do FlyonUI como referência visual (aparência: abas com indicador
sublinhado, `tabs-bordered`), mas a funcionalidade deve ser recriada com
estado do React — mesmo visual, zero dependência nova.

### Estrutura do componente de tabs
```tsx
// components/GiftAndReferencesTabs.tsx
"use client";
import { useState } from "react";

type TabKey = "presentes" | "referencias";

export function GiftAndReferencesTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("presentes");

  return (
    <div>
      <nav className="flex border-b border-marrom/30" aria-label="Tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "presentes"}
          onClick={() => setActiveTab("presentes")}
          className={`w-full py-3 text-center font-display transition-colors ${
            activeTab === "presentes"
              ? "border-b-2 border-marrom-dark text-marrom-dark"
              : "text-marrom/60"
          }`}
        >
          Lista de Presentes
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "referencias"}
          onClick={() => setActiveTab("referencias")}
          className={`w-full py-3 text-center font-display transition-colors ${
            activeTab === "referencias"
              ? "border-b-2 border-marrom-dark text-marrom-dark"
              : "text-marrom/60"
          }`}
        >
          Referências
        </button>
      </nav>

      <div className="mt-4">
        {activeTab === "presentes" && <GiftListSection />}
        {activeTab === "referencias" && <ReferencesGrid />}
      </div>
    </div>
  );
}
```
Adaptar classes/cores para bater com a paleta (marrom/rosa) e a fonte
`font-display` (Miltonian Tattoo) já definida. O visual deve lembrar
"tabs sublinhadas" do exemplo FlyonUI, mas sem nenhuma classe/atributo
`data-tab` — tudo controlado por `activeTab` do React.

### Grid de referências (estilo feed "Buscar" do Instagram)
```tsx
// components/ReferencesGrid.tsx
"use client";
import { useState } from "react";
import { referencesConfig } from "@/lib/referencesConfig";

export function ReferencesGrid() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-3 gap-0.5">
        {referencesConfig.map((src) => (
          <button
            key={src}
            type="button"
            className="aspect-square overflow-hidden"
            onClick={() => setSelected(src)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={selected} alt="" className="max-h-full max-w-full object-contain" />
          <button
            type="button"
            aria-label="Fechar"
            className="absolute right-4 top-4 text-3xl text-white"
            onClick={() => setSelected(null)}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
```
Características:
- Grid 3 colunas, `gap-0.5` (bem pequeno, igual ao Instagram), cada item
  `aspect-square` com `object-cover` (crop quadrado, sem bordas
  arredondadas — igual ao feed de Buscar).
- Clique/toque abre lightbox em tela cheia (overlay escuro, imagem
  centralizada em tamanho original proporcional, botão de fechar). Fechar
  ao clicar fora ou no X.
- Sem carrossel/setas de navegação entre imagens — cada clique abre só a
  imagem tocada.

### Fonte das imagens (a fornecer pelo usuário)
Criar `lib/referencesConfig.ts` exportando um array de caminhos:
```ts
export const referencesConfig: string[] = [
  "/references/look-1.jpg",
  "/references/look-2.jpg",
  // ...o usuário vai adicionar os arquivos reais em /public/references/
  // e atualizar esta lista
];
```
Deixar o array com 2-3 entradas de exemplo (placeholder) e um comentário
claro indicando que o usuário vai substituir pelos arquivos reais depois,
seguindo a convenção `/public/references/nome-do-arquivo.jpg`.

### Onde essa seção entra na página
Substituir o heading fixo "Lista de Presentes" (que hoje antecede o card
rosa de aviso) pelo componente `GiftAndReferencesTabs`, mantendo os
stickers decorativos (`cow.png` + `sheriff-star.png`) que já flanqueiam
esse ponto da página. O card rosa de aviso e os botões de exportação
("Baixar em Pdf" / "Copiar Lista") continuam existindo, mas só aparecem
dentro do painel "Lista de Presentes" — não aparecem quando a aba
"Referências" está ativa.

## Pendências restantes
- (nenhuma pendente no momento)
