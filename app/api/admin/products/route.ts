import { NextResponse } from "next/server";
import { requireAdmin } from "@/utils/adminAuth";
import config from "@/lib/config";

export async function POST(request: Request) {
  try {
    // Ensure the currently authenticated user is admin
    await requireAdmin();

    const body = await request.json();

    const res = await fetch(`${config.apiBaseUrl}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    console.error("/api/admin/products error:", error?.message || error);
    return NextResponse.json({ error: "Unauthorized or server error" }, { status: 401 });
  }
}
