"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeAudit } from "@/lib/audit";

const schema = z.object({
  type: z.enum(["DEPOSIT", "WITHDRAWAL"]),
  amount: z.string().regex(/^\d{1,10}(\.\d{1,2})?$/),
  currency: z.enum(["USD", "NGN", "GBP", "EUR"]),
  description: z.string().max(300).optional()
});
export async function transactionAction(formData: FormData) {
  const user = await getSession();
  if (!user) redirect("/login");
  const parsed = schema.safeParse({type:formData.get("type"),amount:formData.get("amount"),currency:formData.get("currency"),description:formData.get("description")||""});
  if (!parsed.success) redirect("/transactions?error=1");
  const amountMinor = Math.round(Number(parsed.data.amount)*100);
  if (!Number.isSafeInteger(amountMinor)||amountMinor<=0) redirect("/transactions?error=1");
  const record = await prisma.transaction.create({data:{investorId:user.id,type:parsed.data.type,amountMinor,currency:parsed.data.currency,status:"REQUESTED",description:parsed.data.description||null}});
  await writeAudit({actorId:user.id,action:"transaction.requested",targetType:"transaction",targetId:record.id,metadata:{type:record.type,amountMinor:record.amountMinor,currency:record.currency}});
  redirect("/transactions?submitted=1");
}
