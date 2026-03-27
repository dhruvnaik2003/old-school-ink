const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const currentAdmin = await prisma.adminUser.findUnique({
    where: { email: 'admin@studio.com' },
  });

  if (!currentAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.adminUser.create({
      data: {
        email: 'admin@studio.com',
        password: hashedPassword,
      },
    });
    console.log('Seeded AdminUser: admin@studio.com / admin123');
  } else {
    console.log('Admin already exists.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
