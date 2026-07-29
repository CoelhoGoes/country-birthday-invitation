// Conteúdo real e definitivo da lista de presentes.

export const giftListWarning =
  "Algumas pessoas me pediram para fazer, por isso decidir enviar para todos, não precisa dar exatamente o que está aqui, ficarei muito grata com qualquer mimo que possa dar, sua presença é o mais importante!";

export type GiftCategory = {
  title: string;
  note?: string;
  items: string[];
  footnote?: string;
};

export const giftCategories: GiftCategory[] = [
  {
    title: "Maquiagem",
    items: [
      "Blush (gosto MUITO), cores: coral, vermelho, marrom avermelhado (aquela vibe mais queimada do sol) ou cereja",
      "Iluminador (AMO)",
      "Rímel (AMO), qualquer um tanto pra cílios ou sombrancelha",
      "Gloss (AMO), gosto muito dos que dão volume e também os marrons, mas gosto de todos",
      "Batom, tenho preferência pelas cores mais nudes",
      "Pincéis de maquiagem (gosto)",
    ],
    footnote:
      "Mas se aparecer com qualquer outra coisa de maquiagem também gosto — corretivo e base não coloquei pois acho mais difícil de acertarem o tom, mas caso queira dar, não tem problema!",
  },
  {
    title: "Roupa",
    note: "Visto M/P ou 38, dependendo da forma",
    items: [
      "Regatas (qualquer cor)",
      "Calça jeans (calça de shopping)",
      "Shorts (moletom ou alfaiataria)",
      "Saia (longa mais solta ou curta se for de alfaiataria)",
      "Blusa (me agradam também)",
      "Roupas de banho (gosto bastante de maiô ou biquíni)",
    ],
  },
  {
    title: "Sapato",
    note: "Calço 37, mas depende da forma",
    items: [
      "Tênis",
      "Sandália (AMO)",
      "Papete (AMO)",
      "Salto (AMO)",
      "Botina (quem quiser fazer a boa!)",
    ],
  },
  {
    title: "Acessórios",
    items: [
      "Prata ou dourado me agradam",
      "Argolas pequenas e médias é o que eu mais uso, mas brincos pequenos também me agradam — tenho piercing (conch, hélix), então gosto também",
      "Colar (amo)",
      "Pulseiras (acho lindo)",
      "Relógio (amo amo), de todos os formatos e jeitos me agradam muito",
      "Anéis (amo amo), sempre uso",
    ],
  },
  {
    title: "Cosméticos",
    items: [
      "Perfumes (doce — Egeo —, amadeirados, ou com cheirinho de vovó — tipo o Crazy Feelings da Boticário ou qualquer um da coleção Boticollection) me agradam",
      "Hidratantes (amo qualquer um)",
      "Produtos de cabelo (coisas pra ondulada)",
      "Óleo corporal (amo demais)",
      "Sabonete (amo)",
    ],
  },
  {
    title: "Outras ideias",
    items: [
      "Livros — gosto muito de literatura brasileira, livros de suspense e romance",
      "Capa de celular (iPhone 12)",
      "Coisas de natação",
      "Coisas de filme (Whiplash, Interestelar) e séries (Friends, Game of Thrones, House of the Dragon, Gilmore Girls, PLL, The Walking Dead, Sex and the City, Grey's Anatomy)",
    ],
  },
];

// Gera a versão em texto simples (sem markdown/HTML) usada pelo botão
// "Copiar lista" — construída a partir dos mesmos dados do HTML, então os
// dois nunca ficam dessincronizados.
export function buildPlainTextGiftList(): string {
  const blocks = giftCategories.map((category) => {
    const lines = [category.title.toUpperCase()];
    if (category.note) lines.push(category.note);
    lines.push(...category.items.map((item) => `• ${item}`));
    if (category.footnote) lines.push(category.footnote);
    return lines.join("\n");
  });

  return [giftListWarning, "", ...blocks].join("\n\n");
}
