import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function requireAdmin(): Promise<Session> {
  const session = await getServerSession(authOptions as any);

  if (!session || (session as any)?.user?.role !== "admin") {
    redirect("/");
  }

  return session as Session;
}