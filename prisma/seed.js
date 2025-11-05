export const runtime = "nodejs";
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@123", 10);
  await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Super Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin created!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
