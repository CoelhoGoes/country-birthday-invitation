import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltam NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. Confira o .env.local."
  );
}

// Client público (anon key). Respeita as RLS policies do Supabase — só pode
// ser usado para operações permitidas ao role "anon" (ex: insert em rsvps).
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
