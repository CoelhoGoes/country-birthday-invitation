import { RsvpForm } from "@/components/RsvpForm";
import { CollageSticker } from "@/components/CollageSticker";
import { GiftListSection } from "@/components/GiftListSection";
import { EventPanel } from "@/components/EventPanel";
import { MobileRsvpCard } from "@/components/MobileRsvpCard";
import { MobileGiftListSection } from "@/components/MobileGiftListSection";
import { BackgroundMusic } from "@/components/BackgroundMusic";
import { eventConfig } from "@/lib/eventConfig";

export default function Home() {
  const [titleFirstWord, ...titleRestWords] = eventConfig.title.split(" ");

  return (
    <>
      <main className="bg-paper min-h-screen overflow-x-hidden">
        <div className="sm:hidden">
          <section className="relative overflow-hidden px-4 pt-6">
            <div className="relative h-40">
              <CollageSticker
                src="/stickers/disco-ball.png"
                alt="Bola de espelho"
                top="-20%"
                left="-10%"
                width="40%"
                rotate={0}
                zIndex={2}
                mobileM={{ top: "-20%", left: "-10%", width: "38%" }}
                mobileL={{ top: "-20%", left: "-10%", width: "30%" }}
              />
              <CollageSticker
                src="/stickers/pink-ribbon.png"
                alt=""
                top="55%"
                left="-5%"
                width="70%"
                rotate={0}
                zIndex={2}
                mobileM={{ top: "55%", left: "-5%", width: "65%" }}
                mobileL={{ top: "55%", left: "-5%", width: "56%" }}
              />

              <CollageSticker
                src="/stickers/disco-ball-2.png"
                alt="Bola de espelho"
                top="-20%"
                left="65%"
                width="41%"
                rotate={0}
                zIndex={2}
                mobileM={{ top: "-20%", left: "67%", width: "38%" }}
                mobileL={{ top: "-20%", left: "75%", width: "30%" }}
              />
              <CollageSticker
                src="/stickers/21-balloon.png"
                alt="Balão 21"
                top="0%"
                left="30%"
                width="33%"
                wiggle
                rotate={0}
                zIndex={2}
                mobileM={{ top: "-2%", left: "30%", width: "30%" }}
                mobileL={{ top: "0%", left: "40%", width: "22%" }}
              />
              <CollageSticker
                src="/stickers/cowboy-hat-pink.png"
                alt="Chapéu de cowboy rosa"
                top="-10%"
                left="66%"
                width="44%"
                wiggle
                rotate={8}
                zIndex={2}
                mobileM={{ top: "-10%", left: "70%", width: "40%" }}
                mobileL={{ top: "-10%", left: "72%", width: "34%" }}
              />
            </div>

            <div className="relative z-10 -mt-12 mobile-m:-mt-14 mobile-l:-mt-16 sm:-mt-20 flex flex-col items-center gap-2 mobile-m:gap-2.5 mobile-l:gap-3 text-center">
              <p className="font-body text-lg mobile-m:text-xl mobile-l:text-2xl text-marrom-dark">
                {eventConfig.tagline}
              </p>
              <h1 className="font-script text-4xl mobile-m:text-[2.5rem] mobile-l:text-5xl sm:text-6xl leading-tight text-marrom-dark drop-shadow-sm">
                {titleFirstWord}
                <br />
                {titleRestWords.join(" ")}
              </h1>
              <div className="font-body text-base mobile-m:text-lg mobile-l:text-xl leading-relaxed text-marrom-dark">
                <p>{eventConfig.date}</p>
                <p>{eventConfig.time.toUpperCase()}</p>
                <p>{eventConfig.venue}</p>
                <p>{eventConfig.address}</p>
              </div>
            </div>

            <div className="relative mt-2 mobile-m:mt-3 mobile-l:mt-4 h-44 w-full">
              <CollageSticker
                src="/stickers/barrel.png"
                alt="Barril"
                top="29%"
                left="-12%"
                width="45%"
                rotate={0}
                zIndex={1}
                mobileM={{ top: "12%", left: "-12%", width: "45%" }}
                mobileL={{ top: "14%", left: "-12%", width: "40%" }}
              />
              <CollageSticker
                src="/stickers/cowboy-boot-lasso.png"
                alt="Bota de cowboy com laço rosa"
                top="-10%"
                left="2%"
                width="40%"
                wiggle
                rotate={-2}
                zIndex={2}
                mobileM={{ top: "-24%", left: "0%", width: "40%" }}
                mobileL={{ top: "-30%", left: "-4%", width: "40%" }}
              />
              <CollageSticker
                src="/stickers/cow-bubblegum.png"
                alt="Vaquinha com chiclete"
                top="45%"
                left="30%"
                width="34%"
                rotate={0}
                zIndex={3}
                mobileM={{ top: "31%", left: "30%", width: "34%" }}
                mobileL={{ top: "24%", left: "30%", width: "34%" }}
              />
              <CollageSticker
                src="/stickers/photo.png"
                alt="Welly de cowboy"
                top="-42%"
                left="56%"
                width="55%"
                wiggle
                rotate={4}
                zIndex={4}
                mobileM={{ top: "-50%", left: "50%", width: "60%" }}
              />
            </div>
          </section>

          <div className="flex flex-col gap-10 px-4 pb-12">
            <MobileRsvpCard />
            <MobileGiftListSection />
          </div>
        </div>

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
                sm={{ width: "28%" }}
              />

              <div className="pt-6 sm:pt-8">
                <EventPanel />
              </div>

              <div className="h-28 sm:h-36" />

              <CollageSticker
                src="/stickers/cowboy-boot-lasso.png"
                alt="Bota de cowboy com laço rosa"
                top="80%"
                left="-8%"
                width="34%"
                rotate={-10}
                zIndex={5}
                sm={{ top: "74%", left: "-6%", width: "28%" }}
              />

              <CollageSticker
                src="/stickers/cow-bubblegum.png"
                alt="Vaquinha com bubblegum"
                top="86%"
                left="18%"
                width="34%"
                rotate={6}
                zIndex={5}
                sm={{ top: "80%", left: "20%", width: "28%" }}
              />

              <CollageSticker
                src="/stickers/photo.png"
                alt="Welly de cowboy"
                top="56%"
                left="54%"
                width="42%"
                wiggle
                rotate={-4}
                zIndex={6}
                sm={{ top: "38%", left: "50%", width: "44%" }}
              />
            </div>
          </section>


          <div className="relative mx-auto flex w-full max-w-2xl flex-col gap-16 px-4 pb-12">
            <section className="w-full">
              <h2 className="mb-4 text-center font-display text-3xl text-marrom-dark">
                Confirme sua presença
              </h2>
              <RsvpForm />
            </section>

            <GiftListSection />

            <CollageSticker
              src="/stickers/cow.png"
              alt="vaca."
              top="6%"
              left="-6%"
              width="14%"
              rotate={90}
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
      <BackgroundMusic />
    </>
  );
}
