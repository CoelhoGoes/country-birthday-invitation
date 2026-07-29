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
  // Overrides de posição/tamanho/rotação por breakpoint — ver
  // tailwind.config.ts para os valores de "xs" (400px) e "sm" (640px).
  xs?: BreakpointOverride;
  sm?: BreakpointOverride;
  // Passthrough pra casos que não cabem em xs/sm (ex: md, lg).
  className?: string;
};

// Gera algo como "sm:!top-[6%]" ou, pra valores negativos, "sm:!-top-[6%]"
// (o Tailwind deste projeto precisa do "-" antes do nome do utilitário,
// não dentro do colchete, pra reconhecer o valor negativo).
function overrideClass(breakpoint: string, property: "top" | "left" | "w" | "rotate", raw: string) {
  const isNegative = raw.startsWith("-");
  const value = isNegative ? raw.slice(1) : raw;
  return `${breakpoint}:!${isNegative ? "-" : ""}${property}-[${value}]`;
}

function buildResponsiveClasses(breakpoint: string, override?: BreakpointOverride): string[] {
  if (!override) return [];
  const classes: string[] = [];
  if (override.top !== undefined) classes.push(overrideClass(breakpoint, "top", override.top));
  if (override.left !== undefined) classes.push(overrideClass(breakpoint, "left", override.left));
  if (override.width !== undefined) classes.push(overrideClass(breakpoint, "w", override.width));
  if (override.rotate !== undefined) classes.push(overrideClass(breakpoint, "rotate", `${override.rotate}deg`));
  return classes;
}

export function CollageSticker({
  src,
  alt,
  rotate = 0,
  top,
  left,
  width,
  zIndex = 1,
  xs,
  sm,
  className,
}: Props) {
  const combinedClassName = [
    className,
    ...buildResponsiveClasses("xs", xs),
    ...buildResponsiveClasses("sm", sm),
  ]
    .filter(Boolean)
    .join(" ");

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={combinedClassName || undefined}
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
  );
}
