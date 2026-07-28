"use client";

import { useRouter } from "next/navigation";

export type Rsvp = {
  id: string;
  name: string;
  confirmed: boolean;
  created_at: string;
};

export function AdminDashboard({ rsvps }: { rsvps: Rsvp[] }) {
  const router = useRouter();
  const confirmedCount = rsvps.filter((r) => r.confirmed).length;

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-prata-light px-4 py-10">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-western text-3xl text-marrom-dark">Confirmações — RSVP</h1>
          <div className="flex gap-2">
            <a
              href="/api/export"
              className="rounded-md border-2 border-marrom-dark bg-marrom px-4 py-2 font-pop font-semibold text-prata-light shadow-md transition hover:bg-marrom-dark"
            >
              ⬇️ Exportar .xlsx
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border-2 border-marrom-light bg-white px-4 py-2 font-pop font-semibold text-marrom-dark transition hover:bg-prata"
            >
              Sair
            </button>
          </div>
        </header>

        <p className="font-pop text-marrom-dark">
          {rsvps.length} resposta(s) — {confirmedCount} confirmada(s)
        </p>

        <div className="overflow-x-auto rounded-lg border-2 border-marrom bg-white shadow-md">
          <table className="w-full text-left font-pop">
            <thead className="bg-rosa-light text-marrom-dark">
              <tr>
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Confirmado</th>
                <th className="px-4 py-2">Registrado em</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((rsvp) => (
                <tr key={rsvp.id} className="border-t border-marrom-light">
                  <td className="px-4 py-2">{rsvp.name}</td>
                  <td className="px-4 py-2">{rsvp.confirmed ? "✅ Sim" : "❌ Não"}</td>
                  <td className="px-4 py-2">
                    {new Date(rsvp.created_at).toLocaleString("pt-BR")}
                  </td>
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
