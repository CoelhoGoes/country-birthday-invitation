"use client";

import { useState } from "react";
import { SoundButton } from "@/components/SoundButton";
import { CollageSticker } from "@/components/CollageSticker";
import { Tabs } from "@/components/Tabs";
import {
  buildPlainTextGiftList,
  giftCategories,
  giftListWarning,
  type GiftCategory,
} from "@/lib/giftListContent";
import { downloadGiftListPdf } from "@/lib/giftListPdf";

const ribbons = ["/stickers/pink-ribbon-2.png", "/stickers/pink-ribbon-3.png", "/stickers/pink-ribbon-4.png"];
const cardGroups = giftCategories.map((category, index) => ({
  category,
  ribbon: ribbons[index % ribbons.length],
  ribbonSide: (index % 2 === 0 ? "right" : "left") as "left" | "right",
}));

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

// Seção "Lista de Presentes" / "Referências" para o breakpoint mobile —
// tabs em React puro.
export function MobileGiftListSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(buildPlainTextGiftList());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const giftListPanel = (
    <>
      <blockquote className="mb-6 rounded-2xl border-2 border-rosa-dark bg-rosa p-5 text-center font-body text-white shadow-md">
        {giftListWarning}
      </blockquote>

      <div className="flex flex-col gap-6">
        {cardGroups.map(({ category, ribbon, ribbonSide }) => (
          // Sem overflow-hidden aqui: o laço precisa transbordar a borda do
          // card, visível por cima.
          <div key={category.title} className="relative rounded-2xl border-2 border-marrom-light bg-white p-5 shadow-md">
            <CollageSticker
              src={ribbon}
              alt=""
              top={ribbonSide === "left" ? "-8%" : "-6%"}
              left={ribbonSide === "left" ? "-8%" : "82%"}
              width="24%"
              rotate={ribbonSide === "left" ? -10 : 10}
              zIndex={20}
              mobileL={{ top: "-12%", left: ribbonSide === "left" ? "-8%" : "84%", width: "24%" }}
              mobileM={{ top: ribbonSide === "left" ? "-10%" : "-6%", left: ribbonSide === "left" ? "-8%" : "83%", width: "24%" }}
            />
            <div className="relative z-10">
              <CategoryBlock category={category} />
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
    </>
  );

  return (
    <section className="w-full">
      <div className="relative mx-auto mb-4 h-10 max-w-xs">
        <CollageSticker
          src="/stickers/cow.png"
          alt=""
          top="-35%"
          left="5%"
          width="26%"
          wiggle
          rotate={-8}
          zIndex={2}
        />
        <CollageSticker
          src="/stickers/sheriff-star.png"
          alt=""
          top="-35%"
          left="65%"
          width="25%"
          wiggle
          rotate={12}
          zIndex={2}
        />
      </div>

      <Tabs giftListPanel={giftListPanel} />
    </section>
  );
}
