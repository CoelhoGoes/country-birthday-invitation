import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("rsvps")
    .select("name")
    .eq("confirmed", true)
    .order("name", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "Erro ao buscar confirmações." }, { status: 500 });
  }

  return NextResponse.json({ names: data.map((rsvp) => rsvp.name) });
}
