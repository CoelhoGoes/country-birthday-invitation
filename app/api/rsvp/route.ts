import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ADMIN_COOKIE_NAME, isValidAdminPassword } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const confirmed = body?.confirmed;

  if (!name) {
    return NextResponse.json({ error: "Nome é obrigatório." }, { status: 400 });
  }
  if (typeof confirmed !== "boolean") {
    return NextResponse.json(
      { error: "Confirmação (confirmed) deve ser true ou false." },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("rsvps").insert({ name, confirmed });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Esse nome já confirmou presença." }, { status: 409 });
    }
    return NextResponse.json({ error: "Não foi possível salvar sua confirmação." }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

// Uso administrativo: lista todas as confirmações. Protegido por cookie de
// sessão admin (definido em /api/admin/login após validar ADMIN_PASSWORD).
export async function GET() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!isValidAdminPassword(cookieValue)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("rsvps")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "Erro ao buscar confirmações." }, { status: 500 });
  }

  return NextResponse.json({ rsvps: data });
}
