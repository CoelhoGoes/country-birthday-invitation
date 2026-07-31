"use client";

import { useState } from "react";
import { SoundButton } from "@/components/SoundButton";
import { useSoundEffect } from "@/lib/useSoundEffect";
import { soundConfig } from "@/lib/soundConfig";

type Status = "idle" | "submitting" | "success" | "error";

// Card de RSVP para o breakpoint mobile — layout definido pelo protótipo
// Figma (docs/prototipo-mobile.png), ver "Revisão 3" em
// docs/design-reference.md. Lógica de envio igual à do RsvpForm (desktop).
export function MobileRsvpCard() {
  const playTypingSound = useSoundEffect(soundConfig.spurClick, 0.35);
  const playGunload = useSoundEffect(soundConfig.gunload);
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState<boolean | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || confirmed === null) {
      setStatus("error");
      setErrorMessage("Preencha seu nome e diga se vai participar.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), confirmed }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? "Não foi possível enviar sua confirmação.");
      }

      setStatus("success");
      setName("");
      setConfirmed(null);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Erro inesperado.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border-2 border-marrom bg-white p-6 text-center shadow-md">
        <p className="font-display text-3xl text-marrom-dark">Yeehaw! 🤠</p>
        <p className="mt-2 font-body text-marrom-dark">
          Sua confirmação foi registrada. Até lá, parceiro(a)!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-3xl border-2 border-marrom bg-white p-6 shadow-md"
    >
      <h2 className="text-center font-display text-2xl font-bold text-marrom-dark">
        Confirme sua presença
      </h2>

      <div>
        <label htmlFor="mobile-name" className="mb-1 block font-body font-semibold text-marrom-dark">
          Seu nome
        </label>
        <input
          id="mobile-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={playTypingSound}
          placeholder="Digite seu nome e sobrenome"
          className="w-full border-b-2 border-marrom-light bg-transparent px-1 py-2 font-body text-marrom-dark outline-none placeholder:text-marrom-light focus:border-rosa-dark"
        />
      </div>

      <div>
        <span className="mb-2 block font-body font-semibold text-marrom-dark">
          Vai participar da festa?
        </span>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              playGunload();
              setConfirmed(true);
            }}
            className={`flex-1 rounded-full border-2 px-4 py-2 font-body font-semibold transition ${confirmed === true
              ? "border-rosa-dark bg-rosa text-white"
              : "border-marrom-light bg-white text-marrom-dark"
              }`}
          >
            Sim, vou!
          </button>
          <button
            type="button"
            onClick={() => {
              playGunload();
              setConfirmed(false);
            }}
            className={`flex-1 rounded-full border-2 px-4 py-2 font-body font-semibold transition ${confirmed === false
              ? "border-marrom-dark bg-marrom text-white"
              : "border-marrom-light bg-white text-marrom-dark"
              }`}
          >
            Não vou
          </button>
        </div>
      </div>

      {status === "error" && (
        <p className="text-sm font-semibold text-red-700">{errorMessage}</p>
      )}

      <SoundButton
        type="submit"
        disabled={status === "submitting"}
        clickSoundSrc={soundConfig.gunshot}
        className="rounded-full border-2 border-marrom-dark bg-marrom-dark px-4 py-3 font-body text-lg font-bold text-white shadow-md transition disabled:opacity-60"
      >
        {status === "submitting" ? "Enviando..." : "Confirmar"}
      </SoundButton>
    </form>
  );
}
