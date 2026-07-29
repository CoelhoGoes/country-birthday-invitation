type Props = {
  src: string;
  alt: string;
  rotate?: number; // graus, ex: -8, 5, 12
  top: string; // posição em %, ex: "5%" — usar % para escalar em mobile
  left: string;
  width: string; // ex: "35%"
  zIndex?: number;
  // Classes Tailwind adicionais (ex: "sm:!top-[6%] sm:!w-[18%]") para
  // ajustar posição/tamanho por breakpoint — precisam do prefixo "!" pois
  // o inline style acima tem prioridade sobre classes normais.
  className?: string;
};

export function CollageSticker({
  src,
  alt,
  rotate = 0,
  top,
  left,
  width,
  zIndex = 1,
  className,
}: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
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
