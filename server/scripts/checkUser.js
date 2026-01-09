const { PrismaClient } = require('@prisma/client');

(async function(){
  const prisma = new PrismaClient();
  try {
    const u = await prisma.user.findUnique({ where: { email: 'sghasal5@gmail.com' } });
    if (!u) {
      console.log(JSON.stringify({ found: false }));
    } else {
      console.log(JSON.stringify({ found: true, id: u.id, email: u.email, role: u.role, passwordPresent: !!u.password }));
    }
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
})();