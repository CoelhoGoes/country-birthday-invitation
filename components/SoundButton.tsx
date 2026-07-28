"use client";

import { useRef } from "react";
import { Howl } from "howler";
import { useSound } from "@/components/SoundProvider";

type SoundButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  hoverSoundSrc?: string;
  clickSoundSrc?: string;
};

/**
 * Botão reutilizável que toca efeitos sonoros no hover e no click.
 * Respeita o mute global (SoundProvider) e nunca reproduz áudio sem
 * interação do usuário.
 */
export function SoundButton({
  hoverSoundSrc = "/sounds/spur-hover.mp3",
  clickSoundSrc = "/sounds/lasso-success.mp3",
  onClick,
  onMouseEnter,
  className,
  children,
  ...props
}: SoundButtonProps) {
  const { muted } = useSound();
  const hoverHowl = useRef<Howl | null>(null);
  const clickHowl = useRef<Howl | null>(null);

  const getHoverHowl = () => {
    if (!hoverHowl.current) {
      hoverHowl.current = new Howl({ src: [hoverSoundSrc], volume: 0.5 });
    }
    return hoverHowl.current;
  };

  const getClickHowl = () => {
    if (!clickHowl.current) {
      clickHowl.current = new Howl({ src: [clickSoundSrc], volume: 0.7 });
    }
    return clickHowl.current;
  };

  return (
    <button
      {...props}
      className={className}
      onMouseEnter={(event) => {
        if (!muted) getHoverHowl().play();
        onMouseEnter?.(event);
      }}
      onClick={(event) => {
        if (!muted) getClickHowl().play();
        onClick?.(event);
      }}
    >
      {children}
    </button>
  );
}
