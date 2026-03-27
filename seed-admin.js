const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'dhruvnaik1315@gmail.com';
  const password = await bcrypt.hash('password123', 10);
  
  const existing = await prisma.adminUser.findUnique({
    where: { email }
  });

  if (!existing) {
    await prisma.adminUser.create({
      data: {
        email,
        password
      }
    });
    console.log('Admin user created successfully');
  } else {
    console.log('Admin user already exists');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
