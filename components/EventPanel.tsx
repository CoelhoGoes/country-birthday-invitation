import { CollageSticker } from "@/components/CollageSticker";
import { eventConfig } from "@/lib/eventConfig";

// Painel de destaque com o conteúdo de eventConfig — o chapéu de cowboy
// rosa fica "grudado" na borda superior direita, como um selo/broche.
export function EventPanel() {
  return (
    <div className="relative z-0 mx-auto flex max-w-[280px] flex-col items-center gap-2 rounded-lg border-2 border-marrom bg-kraft-light/90 px-5 pb-8 pt-12 text-center shadow-lg sm:max-w-sm sm:px-8 sm:pb-10 sm:pt-14">
      <CollageSticker
        src="/stickers/cowboy-hat-pink.png"
        alt="Chapéu de cowboy rosa"
        top="-20%"
        left="68%"
        width="40%"
        rotate={10}
        zIndex={3}
        sm={{ top: "-22%", left: "66%", width: "38%" }}
      />

      <p className="font-body text-xl text-marrom-dark">
        {eventConfig.tagline}
      </p>
      <h1 className="font-script text-5xl leading-tight text-marrom-dark drop-shadow-sm sm:text-6xl">
        {eventConfig.title}
      </h1>
      <p className="font-body text-lg text-marrom-dark">
        {eventConfig.date} / {eventConfig.time} / {eventConfig.venue} /{" "}
        {eventConfig.address}
      </p>
      <p className="font-script text-xl font-semibold text-rosa-dark">
        {eventConfig.highlight}
      </p>
    </div>
  );
}
