"use client";

import { createContext, useContext, useEffect, useState } from "react";

type SoundContextValue = {
  muted: boolean;
  toggleMuted: () => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

const STORAGE_KEY = "invite-sound-muted";

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "true") setMuted(true);
  }, []);

  const toggleMuted = () => {
    setMuted((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  return (
    <SoundContext.Provider value={{ muted, toggleMuted }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound deve ser usado dentro de um SoundProvider.");
  }
  return context;
}
