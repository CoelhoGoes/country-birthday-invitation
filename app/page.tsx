import { RsvpForm } from "@/components/RsvpForm";
import { CollageSticker } from "@/components/CollageSticker";
import { GiftListSection } from "@/components/GiftListSection";
import { EventPanel } from "@/components/EventPanel";
import { MobileRsvpCard } from "@/components/MobileRsvpCard";
import { MobileGiftListSection } from "@/components/MobileGiftListSection";
import { eventConfig } from "@/lib/eventConfig";

export default function Home() {
  return (
    <main className="bg-paper min-h-screen overflow-x-hidden">
      {/* ================= MOBILE (Revisão 3 — ver docs/design-reference.md) =================
          Layout definido por docs/prototipo-mobile.png: stickers "sangrando"
          pelos cantos (corner-bleed) em vez da colagem espalhada do desktop. */}
      <div className="sm:hidden">
        <section className="relative overflow-hidden px-4 pt-6">
          {/* Moldura decorativa no topo — elementos ENCOSTADOS lado a lado,
              sem se sobrepor (Conceito A, ver docs/design-reference.md
              "Revisão 4"). Container próprio com altura fixa (h-40), pra
              que as posições em % não fiquem reféns da altura da seção
              inteira. Coluna esquerda: bola de espelho (já traz a estrela
              dourada embutida) + laço, adjacentes. Coluna direita: bola de
              espelho + balão "21" + chapéu, também adjacentes. */}
          <div className="relative h-40">
            <CollageSticker
              src="/stickers/disco-ball.png"
              alt="Bola de espelho"
              top="-10%"
              left="-10%"
              width="30%"
              rotate={-6}
              zIndex={2}
            />
            <CollageSticker
              src="/stickers/pink-ribbon.png"
              alt=""
              top="55%"
              left="1%"
              width="56%"
              rotate={-8}
              zIndex={2}
            />

            <CollageSticker
              src="/stickers/disco-ball.png"
              alt="Bola de espelho"
              top="-10%"
              left="76%"
              width="30%"
              rotate={6}
              zIndex={2}
            />
            <CollageSticker
              src="/stickers/21-balloon.png"
              alt="Balão 21"
              top="0%"
              left="40%"
              width="22%"
              rotate={0}
              zIndex={2}
            />
            <CollageSticker
              src="/stickers/cowboy-hat-pink.png"
              alt="Chapéu de cowboy rosa"
              top="45%"
              left="64%"
              width="34%"
              rotate={8}
              zIndex={2}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2 pt-6 text-center">
            <p className="font-body text-xl text-marrom-dark">
              {eventConfig.tagline}
            </p>
            <h1 className="font-script text-5xl leading-tight text-marrom-dark drop-shadow-sm">
              {eventConfig.title}
            </h1>
            <div className="font-body text-lg leading-relaxed text-marrom-dark">
              <p>{eventConfig.date}</p>
              <p>{eventConfig.time.toUpperCase()}</p>
              <p>{eventConfig.venue}</p>
              <p>{eventConfig.address}</p>
            </div>
            <p className="font-script text-xl font-semibold text-rosa-dark">
              {eventConfig.highlight}
            </p>
          </div>

          {/* Acentos entre o texto e o card de RSVP — a foto tem destaque
              (âncora visual, tamanho comparável ao chapéu/bola de espelho) */}
          <div className="relative mt-4 h-44 w-full">
            <CollageSticker
              src="/stickers/cowboy-boot-lasso.png"
              alt="Bota de cowboy com laço rosa"
              top="18%"
              left="-6%"
              width="40%"
              rotate={-10}
              zIndex={2}
            />
            <CollageSticker
              src="/stickers/cow-bubblegum.png"
              alt="Vaquinha com bubblegum"
              top="36%"
              left="24%"
              width="34%"
              rotate={6}
              zIndex={3}
            />
            <CollageSticker
              src="/stickers/polaroid-photo.png"
              alt="Foto do aniversariante em moldura polaroid"
              top="0%"
              left="52%"
              width="50%"
              rotate={4}
              zIndex={4}
            />
          </div>
        </section>

        <div className="flex flex-col gap-10 px-4 pb-12 pt-2">
          <MobileRsvpCard />
          <MobileGiftListSection />
        </div>
      </div>

      {/* ================= DESKTOP (inalterado nesta rodada) ================= */}
      <div className="hidden sm:block">
        <section className="relative w-full overflow-hidden py-10 sm:py-16">
          <div className="relative mx-auto min-h-[400px] w-full max-w-2xl sm:min-h-[460px]">
            <CollageSticker
              src="/stickers/disco-ball.png"
              alt="Bola de espelho"
              top="0%"
              left="0%"
              width="34%"
              rotate={0}
              zIndex={5}
              className="sm:!w-[28%]"
            />

            {/* Painel de destaque — o chapéu de cowboy rosa fica preso na
                borda superior direita deste componente. O painel fica atrás
                dos stickers (z-0), que agora são primeiro plano. */}
            <div className="pt-6 sm:pt-8">
              <EventPanel />
            </div>

            {/* Espaço reservado abaixo do painel para a bota/vaquinha */}
            <div className="h-28 sm:h-36" />

            <CollageSticker
              src="/stickers/cowboy-boot-lasso.png"
              alt="Bota de cowboy com laço rosa"
              top="80%"
              left="-8%"
              width="34%"
              rotate={-10}
              zIndex={5}
              className="sm:!top-[74%] sm:!-left-[6%] sm:!w-[28%]"
            />

            <CollageSticker
              src="/stickers/cow-bubblegum.png"
              alt="Vaquinha com bubblegum"
              top="86%"
              left="18%"
              width="34%"
              rotate={6}
              zIndex={5}
              className="sm:!top-[80%] sm:!left-[20%] sm:!w-[28%]"
            />

            <CollageSticker
              src="/stickers/polaroid-photo.png"
              alt="Foto do aniversariante em moldura polaroid"
              top="56%"
              left="54%"
              width="42%"
              rotate={-4}
              zIndex={6}
              className="sm:!top-[38%] sm:!left-[50%] sm:!w-[44%]"
            />
          </div>
        </section>

        {/* Zona A — pequenos acentos logo abaixo do hero, um de cada lado */}
        <section
          className="relative mx-auto h-16 w-full max-w-2xl px-4 sm:h-24"
          aria-hidden
        >
          <CollageSticker
            src="/stickers/sheriff-star.png"
            alt=""
            top="10%"
            left="2%"
            width="11%"
            rotate={-14}
            zIndex={1}
          />
          <CollageSticker
            src="/stickers/wanted-poster.png"
            alt=""
            top="20%"
            left="84%"
            width="13%"
            rotate={9}
            zIndex={1}
          />
        </section>

        <div className="relative mx-auto flex w-full max-w-2xl flex-col gap-16 px-4 pb-12">
          <section className="w-full">
            <h2 className="mb-4 text-center font-display text-3xl text-marrom-dark">
              Confirme sua presença
            </h2>
            <RsvpForm />
          </section>

          <GiftListSection />

          {/* Zona C — acentos pequenos nas margens laterais, espalhados ao
              longo de toda esta faixa (lista de presentes + RSVP + rodapé) */}
          <CollageSticker
            src="/stickers/cow.png"
            alt=""
            top="6%"
            left="-6%"
            width="14%"
            rotate={-8}
            zIndex={1}
          />
          <CollageSticker
            src="/stickers/pink-ribbon-2.png"
            alt=""
            top="38%"
            left="94%"
            width="10%"
            rotate={12}
            zIndex={1}
          />
          <CollageSticker
            src="/stickers/pink-ribbon-3.png"
            alt=""
            top="68%"
            left="-5%"
            width="10%"
            rotate={-10}
            zIndex={1}
          />
          <CollageSticker
            src="/stickers/pink-ribbon-4.png"
            alt=""
            top="94%"
            left="92%"
            width="11%"
            rotate={7}
            zIndex={1}
          />
        </div>
      </div>
    </main>
  );
}
