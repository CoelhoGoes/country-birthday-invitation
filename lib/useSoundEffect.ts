"use client";

import { useRef } from "react";
import { Howl } from "howler";

export function useSoundEffect(src: string, volume = 0.5) {
  const howlRef = useRef<Howl | null>(null);

  return () => {
    if (!howlRef.current) {
      howlRef.current = new Howl({ src: [src], volume });
    }
    howlRef.current.play();
  };
}
