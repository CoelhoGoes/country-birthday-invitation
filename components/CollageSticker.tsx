import { useId } from "react";

type BreakpointOverride = {
  top?: string;
  left?: string;
  width?: string;
  rotate?: number;
};

type Props = {
  src: string;
  alt: string;
  rotate?: number; // graus, ex: -8, 5, 12
  top: string; // posição em %, ex: "5%" — usar % para escalar em mobile
  left: string;
  width: string; // ex: "35%"
  zIndex?: number;
  // Overrides de posição/tamanho/rotação por breakpoint. Valores em px
  // batendo com tailwind.config.ts: "mobile-s" (320px, equivalente à base
  // já que é o piso de suporte — existe só por simetria com mobile-m/
  // mobile-l), "mobile-m" (375px), "mobile-l" (425px), "sm" (640px).
  // Implementado via <style> com @media real (não classes Tailwind)
  // porque essas classes seriam montadas em runtime e o Tailwind só
  // enxerga classes literais no código-fonte pra gerar o CSS.
  mobileS?: BreakpointOverride;
  mobileM?: BreakpointOverride;
  mobileL?: BreakpointOverride;
  sm?: BreakpointOverride;
  className?: string;
};

const BREAKPOINTS = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  sm: 640,
} as const;

function overrideDeclarations(override: BreakpointOverride): string {
  const decls: string[] = [];
  if (override.top !== undefined) decls.push(`top:${override.top} !important`);
  if (override.left !== undefined) decls.push(`left:${override.left} !important`);
  if (override.width !== undefined) decls.push(`width:${override.width} !important`);
  if (override.rotate !== undefined) {
    decls.push(`transform:rotate(${override.rotate}deg) !important`);
  }
  return decls.join(";");
}

export function CollageSticker({
  src,
  alt,
  rotate = 0,
  top,
  left,
  width,
  zIndex = 1,
  mobileS,
  mobileM,
  mobileL,
  sm,
  className,
}: Props) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const stickerClass = `cs-${rawId}`;

  const mediaBlocks = (
    [
      ["mobileS", mobileS],
      ["mobileM", mobileM],
      ["mobileL", mobileL],
      ["sm", sm],
    ] as const
  )
    .filter(([, override]) => override)
    .map(([key, override]) => {
      const minWidth = BREAKPOINTS[key];
      return `@media (min-width:${minWidth}px){.${stickerClass}{${overrideDeclarations(override!)}}}`;
    })
    .join("");

  return (
    <>
      {mediaBlocks && <style>{mediaBlocks}</style>}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={[stickerClass, className].filter(Boolean).join(" ")}
        style={{
          position: "absolute",
          top,
          left,
          width,
          transform: `rotate(${rotate}deg)`,
          filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.15))",
          zIndex,
        }}
      />
    </>
  );
}
