"use client";

import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { soundConfig } from "@/lib/soundConfig";

export function BackgroundMusic() {
  const [playing, setPlaying] = useState(false);
  const howlRef = useRef<Howl | null>(null);

  useEffect(() => {
    const howl = new Howl({
      src: [soundConfig.backgroundMusic],
      loop: true,
      volume: 0.3,
    });
    howlRef.current = howl;

    return () => {
      howl.unload();
    };
  }, []);

  const toggle = () => {
    const howl = howlRef.current;
    if (!howl) return;

    if (playing) {
      howl.pause();
    } else {
      howl.play();
    }
    setPlaying((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Pausar música de fundo" : "Tocar música de fundo"}
      className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-marrom bg-white/90 text-xl shadow-md transition hover:bg-prata-light"
    >
      {playing ? "🔊" : "🎵"}
    </button>
  );
}
