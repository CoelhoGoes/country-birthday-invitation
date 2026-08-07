import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isValidAdminPassword } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { AdminDashboard } from "@/components/AdminDashboard";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const authenticated = isValidAdminPassword(cookieValue);

  if (!authenticated) {
    return <AdminLoginForm />;
  }

  const { data, error } = await supabaseAdmin
    .from("rsvps")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-prata-light px-4">
        <p className="font-body text-red-700">Erro ao carregar confirmações: {error.message}</p>
      </main>
    );
  }

  return <AdminDashboard rsvps={data ?? []} />;
}
