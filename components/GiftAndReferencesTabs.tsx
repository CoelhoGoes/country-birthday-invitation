"use client";

import { useState, type ReactNode } from "react";
import { ReferencesGrid } from "@/components/ReferencesGrid";
import { ConfirmedGuestsList } from "@/components/ConfirmedGuestsList";

type TabKey = "presentes" | "referencias" | "convidados";

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
          className={`w-full py-3 text-center font-display transition-colors ${activeTab === "presentes"
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
          className={`w-full py-3 text-center font-display transition-colors ${activeTab === "referencias"
              ? "border-b-2 border-marrom-dark text-marrom-dark"
              : "text-marrom/60"
            }`}
        >
          Referências
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "convidados"}
          onClick={() => setActiveTab("convidados")}
          className={`w-full py-3 text-center font-display transition-colors ${activeTab === "convidados"
              ? "border-b-2 border-marrom-dark text-marrom-dark"
              : "text-marrom/60"
            }`}
        >
          Lista de Convidados
        </button>
      </nav>

      <div className="mt-4">
        {activeTab === "presentes" && giftListPanel}
        {activeTab === "referencias" && <ReferencesGrid />}
        {activeTab === "convidados" && <ConfirmedGuestsList />}
      </div>
    </div>
  );
}
