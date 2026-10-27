import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";

export async function writeAudit(input: {
  actorId?: string;
  action: string;
  targetType: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
  ip?: string;
}) {
  const ipHash = input.ip ? createHash("sha256").update(input.ip).digest("hex") : undefined;
  await prisma.auditEvent.create({
    data: {
      actorId: input.actorId,
      action: input.action,
      targetType: input.targetType,
      targetId: input.targetId,
      metadata: input.metadata ? JSON.stringify(input.metadata) : undefined,
      ipHash
    }
  });
}
