"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeAudit } from "@/lib/audit";

const schema = z.object({ organization: z.string().max(160).optional(), note: z.string().max(1000).optional(), consent: z.literal("on") });
export async function onboardingAction(formData: FormData) {
  const user = await getSession();
  if (!user) redirect("/login");
  const parsed = schema.safeParse({ organization: formData.get("organization") || "", note: formData.get("note") || "", consent: formData.get("consent") });
  if (!parsed.success) redirect("/onboarding?error=1");
  await prisma.user.update({ where: { id: user.id }, data: { organization: parsed.data.organization || null, kycStatus: "PENDING" } });
  await writeAudit({ actorId: user.id, action: "kyc.requested", targetType: "user", targetId: user.id, metadata: { noteProvided: Boolean(parsed.data.note) } });
  redirect("/onboarding?submitted=1");
}
