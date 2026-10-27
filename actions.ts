"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeAudit } from "@/lib/audit";

const schema=z.object({slug:z.string().regex(/^[a-z0-9-]{1,80}$/),title:z.string().min(1).max(160),summary:z.string().max(300).optional(),body:z.string().min(1).max(20000),status:z.enum(["DRAFT","PUBLISHED","ARCHIVED"])});
export async function saveContentAction(formData:FormData) {
  const actor=await getSession();
  if(!actor||!["ADMIN","COMPLIANCE"].includes(actor.role)) redirect("/login");
  const parsed=schema.safeParse({slug:formData.get("slug"),title:formData.get("title"),summary:formData.get("summary")||"",body:formData.get("body"),status:formData.get("status")});
  if(!parsed.success) redirect("/admin/content?error=1");
  const data=parsed.data;
  const page=await prisma.contentPage.upsert({
    where:{slug:data.slug},
    update:{title:data.title,summary:data.summary||null,body:data.body,status:data.status,editedById:actor.id,publishedAt:data.status==="PUBLISHED"?new Date():null},
    create:{slug:data.slug,title:data.title,summary:data.summary||null,body:data.body,status:data.status,editedById:actor.id,publishedAt:data.status==="PUBLISHED"?new Date():null}
  });
  await writeAudit({actorId:actor.id,action:"content.saved",targetType:"content_page",targetId:page.id,metadata:{slug:page.slug,status:page.status}});
  redirect("/admin/content?saved=1");
}
