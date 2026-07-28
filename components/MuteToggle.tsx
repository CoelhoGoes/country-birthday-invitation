"use client";

import { useSound } from "@/components/SoundProvider";

export function MuteToggle() {
  const { muted, toggleMuted } = useSound();

  return (
    <button
      type="button"
      onClick={toggleMuted}
      aria-pressed={muted}
      className="fixed right-4 top-4 z-50 rounded-full border-2 border-marrom bg-prata-light/90 px-3 py-2 text-sm font-pop shadow-md transition hover:bg-prata"
    >
      {muted ? "🔇 Som desligado" : "🔊 Som ligado"}
    </button>
  );
}
