"use client";

import { useState } from "react";
import { SoundButton } from "@/components/SoundButton";
import { CollageSticker } from "@/components/CollageSticker";
import {
  buildPlainTextGiftList,
  giftCategories,
  giftListWarning,
  type GiftCategory,
} from "@/lib/giftListContent";
import { downloadGiftListPdf } from "@/lib/giftListPdf";

const byTitle = (title: string): GiftCategory =>
  giftCategories.find((category) => category.title === title)!;

// Agrupamento das 6 categorias reais em 4 cards, pra ficar equilibrado
// visualmente (o protótipo mostra 3 cards de exemplo com conteúdo fake).
const cardGroups: { categories: GiftCategory[]; ribbon: string; ribbonSide: "left" | "right" }[] = [
  { categories: [byTitle("Maquiagem")], ribbon: "/stickers/pink-ribbon-2.png", ribbonSide: "right" },
  { categories: [byTitle("Roupa"), byTitle("Sapato")], ribbon: "/stickers/pink-ribbon-3.png", ribbonSide: "left" },
  { categories: [byTitle("Acessórios"), byTitle("Cosméticos")], ribbon: "/stickers/pink-ribbon-4.png", ribbonSide: "right" },
  { categories: [byTitle("Outras ideias")], ribbon: "/stickers/pink-ribbon-2.png", ribbonSide: "left" },
];

function CategoryBlock({ category }: { category: GiftCategory }) {
  return (
    <div>
      <h3 className="mb-2 font-display text-lg text-marrom-dark">
        {category.title}
      </h3>
      {category.note && (
        <p className="mb-2 font-body text-sm font-semibold text-marrom-dark">
          {category.note}
        </p>
      )}
      <ul className="flex flex-col gap-1 text-left font-body text-sm text-marrom-dark">
        {category.items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {category.footnote && (
        <p className="mt-2 font-body text-xs italic text-marrom-dark/70">
          {category.footnote}
        </p>
      )}
    </div>
  );
}

// Seção "Lista de Presentes" para o breakpoint mobile — layout definido
// pelo protótipo Figma (docs/prototipo-mobile.png), ver "Revisão 3" em
// docs/design-reference.md.
export function MobileGiftListSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(buildPlainTextGiftList());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="w-full">
      <div className="relative mx-auto mb-4 h-16 max-w-xs">
        <CollageSticker
          src="/stickers/cow.png"
          alt=""
          top="10%"
          left="-8%"
          width="26%"
          rotate={-8}
          zIndex={2}
        />
        <CollageSticker
          src="/stickers/sheriff-star.png"
          alt=""
          top="0%"
          left="82%"
          width="18%"
          rotate={12}
          zIndex={2}
        />
        <h2 className="relative z-10 pt-2 text-center font-display text-3xl text-marrom-dark">
          Lista de Presentes
        </h2>
      </div>

      <blockquote className="mb-6 rounded-2xl bg-rosa p-5 text-center font-body text-white shadow-md">
        {giftListWarning}
      </blockquote>

      <div className="flex flex-col gap-6">
        {cardGroups.map(({ categories, ribbon, ribbonSide }, index) => (
          // Sem overflow-hidden aqui: o laço precisa transbordar a borda do
          // card, visível por cima (Conceito B — ver docs/design-reference.md).
          <div key={index} className="relative rounded-2xl border-2 border-marrom-light bg-white p-5 shadow-md">
            <CollageSticker
              src={ribbon}
              alt=""
              top="-12%"
              left={ribbonSide === "left" ? "-8%" : "84%"}
              width="24%"
              rotate={ribbonSide === "left" ? -10 : 10}
              zIndex={20}
            />
            <div className="relative z-10 flex flex-col gap-5">
              {categories.map((category) => (
                <CategoryBlock key={category.title} category={category} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <SoundButton
          type="button"
          onClick={downloadGiftListPdf}
          className="rounded-full bg-marrom-dark px-4 py-3 text-center font-body text-lg font-bold text-white shadow-md transition"
        >
          Baixar em Pdf
        </SoundButton>
        <SoundButton
          type="button"
          onClick={handleCopy}
          className="rounded-full bg-rosa px-4 py-3 text-center font-body text-lg font-bold text-white shadow-md transition"
        >
          {copied ? "Copiado!" : "Copiar Lista"}
        </SoundButton>
      </div>
    </section>
  );
}
