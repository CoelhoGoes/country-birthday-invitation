"use client";

import { useState } from "react";
import { SoundButton } from "@/components/SoundButton";
import { CollageSticker } from "@/components/CollageSticker";
import {
  buildPlainTextGiftList,
  giftCategories,
  giftListWarning,
} from "@/lib/giftListContent";
import { downloadGiftListPdf } from "@/lib/giftListPdf";

export function GiftListSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(buildPlainTextGiftList());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="w-full">
      {/* Zona B — acentos pequenos de cada lado do título, tamanho reduzido */}
      <div className="relative mx-auto mb-4 h-14 max-w-xs sm:h-16 sm:max-w-sm">
        <CollageSticker
          src="/stickers/21-balloon.png"
          alt=""
          top="0%"
          left="0%"
          width="16%"
          rotate={-10}
          zIndex={1}
        />
        <CollageSticker
          src="/stickers/disco-ball-2.png"
          alt=""
          top="5%"
          left="86%"
          width="14%"
          rotate={12}
          zIndex={1}
        />
        <h2 className="relative z-10 pt-1 text-center font-display text-3xl text-marrom-dark">
          Lista de Presentes
        </h2>
      </div>

      <blockquote className="mb-6 rounded-lg border-2 border-rosa-dark bg-rosa-light/60 p-4 font-body text-lg italic text-marrom-dark">
        {giftListWarning}
      </blockquote>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {giftCategories.map((category) => (
          <div
            key={category.title}
            className="rounded-lg border-2 border-marrom bg-white/80 p-4 shadow-md"
          >
            <h3 className="mb-2 font-display text-2xl font-semibold text-marrom-dark">
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
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <SoundButton
          type="button"
          onClick={downloadGiftListPdf}
          className="flex-1 rounded-md border-2 border-marrom-dark bg-marrom px-4 py-3 text-center font-body font-semibold text-prata-light shadow-md transition hover:bg-marrom-dark"
        >
          ⬇️ Baixar Lista
        </SoundButton>
        <SoundButton
          type="button"
          onClick={handleCopy}
          className="flex-1 rounded-md border-2 border-rosa-dark bg-rosa px-4 py-3 text-center font-body font-semibold text-white shadow-md transition hover:bg-rosa-dark"
        >
          {copied ? "Copiado! ✅" : "📋 Copiar lista"}
        </SoundButton>
      </div>
    </section>
  );
}
