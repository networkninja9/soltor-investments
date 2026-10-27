"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession, verifyPassword } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";

const schema = z.object({ email: z.string().email().max(254), password: z.string().min(1).max(200) });

export async function loginAction(formData: FormData) {
  const parsed = schema.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) redirect("/login?error=1");

  const email = parsed.data.email.toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.isActive || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    // Production: add IP/account rate limiting, generic timing behavior, and alerting.
    redirect("/login?error=1");
  }

  await createSession(user);
  await writeAudit({ actorId: user.id, action: "auth.login", targetType: "user", targetId: user.id });
  if (user.role === "ADMIN" || user.role === "COMPLIANCE") redirect("/admin");
  redirect("/dashboard");
}
