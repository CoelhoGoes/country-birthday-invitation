import "server-only";

export const ADMIN_COOKIE_NAME = "admin_auth";

export function isValidAdminPassword(password: string | undefined | null): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("ADMIN_PASSWORD não configurada. Confira o .env.local.");
  }
  return !!password && password === expected;
}
