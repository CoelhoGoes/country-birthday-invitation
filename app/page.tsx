import { RsvpForm } from "@/components/RsvpForm";

function TodoPlaceholder({ label }: { label: string }) {
  return (
    <span className="rounded bg-yellow-200 px-2 py-0.5 text-sm font-semibold text-yellow-900">
      TODO: {label}
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-prata-light via-prata to-rosa-light px-4 py-10">
      <div className="mx-auto flex max-w-md flex-col items-center gap-8 text-center">
        <section className="flex flex-col items-center gap-3">
          <span className="text-4xl">🤠 🐎 ⭐</span>
          <h1 className="font-western text-4xl leading-tight text-marrom-dark drop-shadow-sm sm:text-5xl">
            Last Rodeo
          </h1>
          <p className="font-pop text-lg text-marrom-dark">
            O aniversário de <TodoPlaceholder label="nome do(a) aniversariante" />
          </p>
        </section>

        <section className="w-full rounded-lg border-2 border-marrom bg-white/70 p-6 font-pop text-marrom-dark shadow-md">
          <p className="mb-4">
            <TodoPlaceholder label="texto/mensagem do convite" />
          </p>
          <div className="flex flex-col gap-2 text-left">
            <p>
              <span className="font-semibold">📅 Data e horário: </span>
              <TodoPlaceholder label="data e horário" />
            </p>
            <p>
              <span className="font-semibold">📍 Local: </span>
              <TodoPlaceholder label="local do evento" />
            </p>
          </div>
        </section>

        <section className="w-full">
          <h2 className="mb-4 font-western text-2xl text-marrom-dark">
            Confirme sua presença
          </h2>
          <RsvpForm />
        </section>

        <footer className="pt-4 text-sm text-marrom-dark/70">
          Ative o som 🔊 no canto da tela para ouvir os efeitos country do convite.
        </footer>
      </div>
    </main>
  );
}
