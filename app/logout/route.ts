import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";

export async function POST() {
  const { getSession } = await import("@/lib/auth");
  const user = await getSession();
  await destroySession();
  if (user) await writeAudit({ actorId: user.id, action: "auth.logout", targetType: "user", targetId: user.id });
  return NextResponse.redirect(new URL("/", process.env.APP_BASE_URL || "http://localhost:3000"), { status: 303 });
}
