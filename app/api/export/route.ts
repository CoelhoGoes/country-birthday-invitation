import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as XLSX from "xlsx";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ADMIN_COOKIE_NAME, isValidAdminPassword } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  const cookiePassword = cookies().get(ADMIN_COOKIE_NAME)?.value;
  const headerPassword = request.headers.get("x-admin-password");
  const queryPassword = request.nextUrl.searchParams.get("password");

  const password = cookiePassword ?? headerPassword ?? queryPassword;

  if (!isValidAdminPassword(password)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("rsvps")
    .select("name, confirmed, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Erro ao buscar confirmações." }, { status: 500 });
  }

  const rows = (data ?? []).map((row) => ({
    Nome: row.name,
    Confirmado: row.confirmed ? "Sim" : "Não",
    "Data do registro": new Date(row.created_at).toLocaleString("pt-BR"),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "RSVPs");

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="confirmacoes-rsvp.xlsx"',
    },
  });
}
