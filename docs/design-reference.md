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

## Pendências restantes
- (nenhuma pendente no momento)
