"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { downloadRsvpPdf } from "@/lib/rsvpPdf";

export type Rsvp = {
  id: string;
  name: string;
  confirmed: boolean;
  created_at: string;
};

export function AdminDashboard({ rsvps: initialRsvps }: { rsvps: Rsvp[] }) {
  const router = useRouter();
  const [rsvps, setRsvps] = useState(initialRsvps);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editConfirmed, setEditConfirmed] = useState(true);
  const [rowError, setRowError] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const confirmedCount = rsvps.filter((r) => r.confirmed).length;

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  };

  const startEdit = (rsvp: Rsvp) => {
    setEditingId(rsvp.id);
    setEditName(rsvp.name);
    setEditConfirmed(rsvp.confirmed);
    setRowError((prev) => ({ ...prev, [rsvp.id]: "" }));
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (id: string) => {
    setSavingId(id);
    setRowError((prev) => ({ ...prev, [id]: "" }));

    try {
      const response = await fetch(`/api/rsvp/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim(), confirmed: editConfirmed }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error ?? "Não foi possível salvar.");
      }

      setRsvps((prev) => prev.map((rsvp) => (rsvp.id === id ? data.rsvp : rsvp)));
      setEditingId(null);
    } catch (error) {
      setRowError((prev) => ({
        ...prev,
        [id]: error instanceof Error ? error.message : "Erro inesperado.",
      }));
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Excluir esta confirmação?")) return;

    setSavingId(id);
    try {
      const response = await fetch(`/api/rsvp/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Não foi possível excluir.");
      setRsvps((prev) => prev.filter((rsvp) => rsvp.id !== id));
    } catch (error) {
      setRowError((prev) => ({
        ...prev,
        [id]: error instanceof Error ? error.message : "Erro inesperado.",
      }));
    } finally {
      setSavingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-prata-light px-4 py-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-3xl text-marrom-dark">Confirmações — RSVP</h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => downloadRsvpPdf(rsvps)}
              className="rounded-md border-2 border-marrom-dark bg-marrom px-4 py-2 font-body font-semibold text-prata-light shadow-md transition hover:bg-marrom-dark"
            >
              ⬇️ Exportar PDF
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border-2 border-marrom-light bg-white px-4 py-2 font-body font-semibold text-marrom-dark transition hover:bg-prata"
            >
              Sair
            </button>
          </div>
        </header>

        <p className="font-body text-marrom-dark">
          {rsvps.length} resposta(s) — {confirmedCount} confirmada(s)
        </p>

        <div className="overflow-x-auto rounded-lg border-2 border-marrom bg-white shadow-md">
          <table className="w-full text-left font-body">
            <thead className="bg-rosa-light text-marrom-dark">
              <tr>
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Confirmado</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((rsvp) => (
                <tr key={rsvp.id} className="border-t border-marrom-light align-top">
                  {editingId === rsvp.id ? (
                    <>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(event) => setEditName(event.target.value)}
                          className="w-full rounded-md border border-marrom-light bg-white px-2 py-1 font-body text-marrom-dark outline-none focus:border-rosa-dark"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setEditConfirmed(true)}
                            className={`rounded-md border-2 px-2 py-1 text-sm font-semibold transition ${editConfirmed
                              ? "border-rosa-dark bg-rosa text-white"
                              : "border-marrom-light bg-white text-marrom-dark"
                              }`}
                          >
                            Sim
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditConfirmed(false)}
                            className={`rounded-md border-2 px-2 py-1 text-sm font-semibold transition ${!editConfirmed
                              ? "border-marrom-dark bg-marrom text-white"
                              : "border-marrom-light bg-white text-marrom-dark"
                              }`}
                          >
                            Não
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => saveEdit(rsvp.id)}
                              disabled={savingId === rsvp.id}
                              className="rounded-md border-2 border-marrom-dark bg-marrom px-3 py-1 text-sm font-semibold text-prata-light transition hover:bg-marrom-dark disabled:opacity-60"
                            >
                              Salvar
                            </button>
                            <button
                              type="button"
                              onClick={cancelEdit}
                              className="rounded-md border-2 border-marrom-light bg-white px-3 py-1 text-sm font-semibold text-marrom-dark transition hover:bg-prata"
                            >
                              Cancelar
                            </button>
                          </div>
                          {rowError[rsvp.id] && (
                            <p className="text-xs font-semibold text-red-700">{rowError[rsvp.id]}</p>
                          )}
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2">{rsvp.name}</td>
                      <td className="px-4 py-2">{rsvp.confirmed ? "✅ Sim" : "❌ Não"}</td>
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => startEdit(rsvp)}
                              className="rounded-md border-2 border-marrom-light bg-white px-3 py-1 text-sm font-semibold text-marrom-dark transition hover:bg-prata"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(rsvp.id)}
                              disabled={savingId === rsvp.id}
                              className="rounded-md border-2 border-red-700 bg-white px-3 py-1 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-60"
                            >
                              Excluir
                            </button>
                          </div>
                          {rowError[rsvp.id] && (
                            <p className="text-xs font-semibold text-red-700">{rowError[rsvp.id]}</p>
                          )}
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {rsvps.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-marrom-dark/70">
                    Nenhuma confirmação ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
