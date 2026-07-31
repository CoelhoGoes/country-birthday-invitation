"use client";

import { useState, type ReactNode } from "react";
import { ReferencesGrid } from "@/components/ReferencesGrid";

type TabKey = "presentes" | "referencias";

// Tabs em React puro (useState) — sem FlyonUI/Preline. Divide o espaço
// entre "Lista de Presentes" (conteúdo passado via prop, diferente pra
// mobile/desktop) e "Referências" (grid de fotos, compartilhado).
export function GiftAndReferencesTabs({ giftListPanel }: { giftListPanel: ReactNode }) {
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
        {activeTab === "presentes" ? giftListPanel : <ReferencesGrid />}
      </div>
    </div>
  );
}
