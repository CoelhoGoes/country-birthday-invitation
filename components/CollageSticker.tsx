import { useId, type CSSProperties } from "react";

type BreakpointOverride = {
  top?: string;
  left?: string;
  width?: string;
  rotate?: number;
};

type Props = {
  src: string;
  alt: string;
  rotate?: number;
  top: string;
  left: string;
  width: string;
  zIndex?: number;
  mobileS?: BreakpointOverride;
  mobileM?: BreakpointOverride;
  mobileL?: BreakpointOverride;
  sm?: BreakpointOverride;
  className?: string;
  wiggle?: boolean;
};

function wiggleDelay(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return (hash % 20) / 5; // 0 a 3.8s
}

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
  wiggle = false,
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
      <img
        src={src}
        alt={alt}
        className={[stickerClass, wiggle && "sticker-wiggle", className].filter(Boolean).join(" ")}
        style={
          {
            position: "absolute",
            top,
            left,
            width,
            ...(wiggle
              ? { "--sticker-rotate": `${rotate}deg`, animationDelay: `${wiggleDelay(rawId)}s` }
              : { transform: `rotate(${rotate}deg)` }),
            filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.15))",
            zIndex,
          } as CSSProperties
        }
      />
    </>
  );
}
