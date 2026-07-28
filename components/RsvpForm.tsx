"use client";

import { useState } from "react";
import { SoundButton } from "@/components/SoundButton";

type Status = "idle" | "submitting" | "success" | "error";

export function RsvpForm() {
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
      <div className="rounded-lg border-2 border-marrom bg-rosa-light p-6 text-center font-pop text-marrom-dark">
        <p className="font-western text-2xl text-marrom-dark">Yeehaw! 🤠</p>
        <p className="mt-2">Sua confirmação foi registrada. Até lá, parceiro(a)!</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-lg border-2 border-marrom bg-white/80 p-6 shadow-md"
    >
      <div>
        <label htmlFor="name" className="mb-1 block font-pop font-semibold text-marrom-dark">
          Seu nome
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Digite seu nome completo"
          className="w-full rounded-md border border-marrom-light bg-white px-3 py-2 font-pop text-marrom-dark outline-none focus:border-rosa-dark"
        />
      </div>

      <div>
        <span className="mb-1 block font-pop font-semibold text-marrom-dark">
          Vai participar da festa?
        </span>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setConfirmed(true)}
            className={`flex-1 rounded-md border-2 px-3 py-2 font-pop font-semibold transition ${
              confirmed === true
                ? "border-rosa-dark bg-rosa text-white"
                : "border-marrom-light bg-white text-marrom-dark"
            }`}
          >
            Sim, vou! 🎉
          </button>
          <button
            type="button"
            onClick={() => setConfirmed(false)}
            className={`flex-1 rounded-md border-2 px-3 py-2 font-pop font-semibold transition ${
              confirmed === false
                ? "border-marrom-dark bg-marrom text-white"
                : "border-marrom-light bg-white text-marrom-dark"
            }`}
          >
            Não vou poder
          </button>
        </div>
      </div>

      {status === "error" && (
        <p className="text-sm font-semibold text-red-700">{errorMessage}</p>
      )}

      <SoundButton
        type="submit"
        disabled={status === "submitting"}
        clickSoundSrc="/sounds/lasso-success.mp3"
        hoverSoundSrc="/sounds/spur-hover.mp3"
        className="rounded-md border-2 border-marrom-dark bg-marrom px-4 py-3 font-western text-lg text-prata-light shadow-md transition hover:bg-marrom-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Enviando..." : "Confirmar presença"}
      </SoundButton>
    </form>
  );
}
