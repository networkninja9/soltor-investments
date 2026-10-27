import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.BOOTSTRAP_ADMIN_EMAIL;
  const password = process.env.BOOTSTRAP_ADMIN_PASSWORD;
  if (!email || !password || password.length < 14) {
    throw new Error("Set BOOTSTRAP_ADMIN_EMAIL and a BOOTSTRAP_ADMIN_PASSWORD of at least 14 characters before seeding.");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { email: email.toLowerCase() },
    update: {},
    create: {
      email: email.toLowerCase(),
      name: "Platform Administrator",
      passwordHash,
      role: UserRole.ADMIN,
      kycStatus: "APPROVED"
    }
  });

  await prisma.contentPage.upsert({
    where: { slug: "about" },
    update: {},
    create: {
      slug: "about",
      title: "About Soltor Capital",
      summary: "Draft content — verify all company claims before publication.",
      body: "Replace this placeholder with approved company information. Do not publish unverified performance, licensing, or client claims.",
      status: "DRAFT"
    }
  });
}

main().finally(async () => prisma.$disconnect());
