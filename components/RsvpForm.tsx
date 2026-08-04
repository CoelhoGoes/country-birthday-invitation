"use client";

import { useState } from "react";
import { useSoundEffect } from "@/lib/useSoundEffect";
import { soundConfig } from "@/lib/soundConfig";
import { rsvpResponses } from "@/lib/rsvpResponses";

type Status = "idle" | "submitting" | "success" | "error";

export function RsvpForm() {
  const playTypingSound = useSoundEffect(soundConfig.spurClick, 0.35);
  const playGunload = useSoundEffect(soundConfig.gunload);
  const playCow = useSoundEffect(soundConfig.cow);
  const playGunshot = useSoundEffect(soundConfig.gunshot);
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState<boolean | null>(null);
  const [confirmedAnswer, setConfirmedAnswer] = useState<boolean | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || confirmed === null) {
      playCow();
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

      playGunshot();
      setConfirmedAnswer(confirmed);
      setStatus("success");
      setName("");
      setConfirmed(null);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Erro inesperado.");
    }
  };

  if (status === "success" && confirmedAnswer !== null) {
    const response = rsvpResponses[confirmedAnswer ? "yes" : "no"];
    return (
      <div className="rounded-lg border-2 border-marrom bg-rosa-light p-6 text-center font-body text-marrom-dark">
        <p className="font-display text-2xl text-marrom-dark">{response.title}</p>
        <p className="mt-2">{response.message}</p>
        {response.image && (
          <img src={response.image} alt="" className="mx-auto mt-4 max-w-full rounded-lg" />
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-lg border-2 border-marrom bg-white/80 p-6 shadow-md"
    >
      <div>
        <label htmlFor="name" className="mb-1 block font-body font-semibold text-marrom-dark">
          Seu nome
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={playTypingSound}
          placeholder="Digite seu nome completo"
          className="w-full rounded-md border border-marrom-light bg-white px-3 py-2 font-body text-marrom-dark outline-none focus:border-rosa-dark"
        />
      </div>

      <div>
        <span className="mb-1 block font-body font-semibold text-marrom-dark">
          Vai participar da festa?
        </span>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              playGunload();
              setConfirmed(true);
            }}
            className={`flex-1 rounded-md border-2 px-3 py-2 font-body font-semibold transition ${confirmed === true
                ? "border-rosa-dark bg-rosa text-white"
                : "border-marrom-light bg-white text-marrom-dark"
              }`}
          >
            Sim, vou! 🎉
          </button>
          <button
            type="button"
            onClick={() => {
              playGunload();
              setConfirmed(false);
            }}
            className={`flex-1 rounded-md border-2 px-3 py-2 font-body font-semibold transition ${confirmed === false
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

      <button
        type="submit"
        disabled={status === "submitting"}
        onMouseEnter={playTypingSound}
        className="rounded-md border-2 border-marrom-dark bg-marrom px-4 py-3 font-body text-lg text-prata-light shadow-md transition hover:bg-marrom-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Enviando..." : "Confirmar presença"}
      </button>
    </form>
  );
}
