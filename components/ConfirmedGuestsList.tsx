"use client";

import { useEffect, useState } from "react";

type Status = "loading" | "success" | "error";

export function ConfirmedGuestsList() {
  const [status, setStatus] = useState<Status>("loading");
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/rsvp/public")
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        setNames(data.names ?? []);
        setStatus("success");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="rounded-lg border-2 border-marrom bg-white/80 p-4 shadow-md">
      <h3 className="mb-3 font-display text-xl text-marrom-dark">
        Quem já confirmou presença
      </h3>

      {status === "loading" && (
        <p className="font-body text-marrom-dark/70">Carregando...</p>
      )}

      {status === "error" && (
        <p className="font-body text-marrom-dark/70">
          Não foi possível carregar a lista agora.
        </p>
      )}

      {status === "success" && names.length === 0 && (
        <p className="font-body text-marrom-dark/70">
          Ninguém confirmou ainda — seja o primeiro(a)!
        </p>
      )}

      {status === "success" && names.length > 0 && (
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {names.map((name) => (
            <li key={name} className="font-body text-marrom-dark">
              🤠 {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
