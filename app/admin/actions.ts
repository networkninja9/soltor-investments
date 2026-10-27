"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeAudit } from "@/lib/audit";

const kycSchema = z.object({userId:z.string().min(1),status:z.enum(["PENDING","IN_REVIEW","APPROVED","REJECTED","EXPIRED"])});
const txSchema = z.object({transactionId:z.string().min(1),status:z.enum(["REQUIRES_REVIEW","PENDING","COMPLETED","FAILED","CANCELLED"])});

export async function updateKycAction(formData:FormData) {
  const actor=await getSession();
  if(!actor||!["ADMIN","COMPLIANCE"].includes(actor.role)) redirect("/login");
  const parsed=kycSchema.safeParse({userId:formData.get("userId"),status:formData.get("status")});
  if(!parsed.success) redirect("/admin?error=1");
  const target=await prisma.user.findUnique({where:{id:parsed.data.userId},select:{id:true,role:true}});
  if(!target||target.role!=="INVESTOR") redirect("/admin?error=1");
  // In production, approval must be based on provider-verified evidence and policy, not just a manual dropdown.
  await prisma.user.update({where:{id:target.id},data:{kycStatus:parsed.data.status}});
  await writeAudit({actorId:actor.id,action:"kyc.status_updated",targetType:"user",targetId:target.id,metadata:{status:parsed.data.status}});
  redirect("/admin");
}

export async function reviewTransactionAction(formData:FormData) {
  const actor=await getSession();
  if(!actor||!["ADMIN","COMPLIANCE"].includes(actor.role)) redirect("/login");
  const parsed=txSchema.safeParse({transactionId:formData.get("transactionId"),status:formData.get("status")});
  if(!parsed.success) redirect("/admin?error=1");
  const target=await prisma.transaction.findUnique({where:{id:parsed.data.transactionId},select:{id:true,status:true}});
  if(!target) redirect("/admin?error=1");
  await prisma.transaction.update({where:{id:target.id},data:{status:parsed.data.status,reviewedById:actor.id,reviewedAt:new Date()}});
  await writeAudit({actorId:actor.id,action:"transaction.status_updated",targetType:"transaction",targetId:target.id,metadata:{from:target.status,to:parsed.data.status}});
  redirect("/admin");
}
