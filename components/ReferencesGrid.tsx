"use client";

import { useEffect, useState } from "react";
import { referencesConfig } from "@/lib/referencesConfig";

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function ReferencesGrid() {
  const [selected, setSelected] = useState<string | null>(null);
  const [images, setImages] = useState(referencesConfig);

  useEffect(() => {
    setImages(shuffle(referencesConfig));
  }, []);

  return (
    <>
      <div className="columns-3 gap-0.5">
        {images.map((src) => (
          <button
            key={src}
            type="button"
            className="mb-0.5 block w-full break-inside-avoid"
            onClick={() => setSelected(src)}
          >
            <img src={src} alt="" className="w-full" />
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
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
