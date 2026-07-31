"use client";

import { useRef } from "react";
import { Howl } from "howler";
import { soundConfig } from "@/lib/soundConfig";

type SoundButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  hoverSoundSrc?: string;
  clickSoundSrc?: string;
};

/**
 * Botão reutilizável que toca efeitos sonoros no hover e no click.
 * Nunca reproduz áudio sem interação do usuário (só em hover/click).
 */
export function SoundButton({
  hoverSoundSrc = soundConfig.spurClick,
  clickSoundSrc = soundConfig.lassoSuccess,
  onClick,
  onMouseEnter,
  className,
  children,
  ...props
}: SoundButtonProps) {
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
        getHoverHowl().play();
        onMouseEnter?.(event);
      }}
      onClick={(event) => {
        getClickHowl().play();
        onClick?.(event);
      }}
    >
      {children}
    </button>
  );
}
