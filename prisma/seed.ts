import { PrismaClient, UserRole } from "@prisma/client"; // Import the UserRole enum
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const adminEmail = "admin08@gmail.com";
  const adminPassword = "admin123";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {}, // Update logic (if needed)
    create: {
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      userrole: UserRole.ADMIN, // Use the actual enum value
    },
  });

  console.log("Admin user seeded:", adminUser);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
