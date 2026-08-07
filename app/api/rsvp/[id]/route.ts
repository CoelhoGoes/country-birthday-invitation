import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ADMIN_COOKIE_NAME, isValidAdminPassword } from "@/lib/adminAuth";

async function assertAdmin() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return isValidAdminPassword(cookieValue);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);

  const update: { name?: string; confirmed?: boolean } = {};
  if (typeof body?.name === "string" && body.name.trim()) {
    update.name = body.name.trim();
  }
  if (typeof body?.confirmed === "boolean") {
    update.confirmed = body.confirmed;
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Nada para atualizar." }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("rsvps")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Esse nome já confirmou presença." }, { status: 409 });
    }
    return NextResponse.json({ error: "Não foi possível atualizar a confirmação." }, { status: 500 });
  }

  return NextResponse.json({ rsvp: data });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const { error } = await supabaseAdmin.from("rsvps").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Não foi possível excluir a confirmação." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
