import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // --- 1️⃣ Users ---
  const adminPassword = await bcrypt.hash('admin123', 10)
  const operatorPassword = await bcrypt.hash('operator123', 10)

  await prisma.user.createMany({
    data: [
      {
        username: 'admin',
        passwordHash: adminPassword,
        role: 'admin',
      },
      {
        username: 'operator',
        passwordHash: operatorPassword,
        role: 'operator',
      },
    ],
    skipDuplicates: true,
  })

  // --- 2️⃣ Nodes ---
  await prisma.node.createMany({
    data: [
      { name: 'API Server', ip: '192.168.1.10', status: 'healthy' },
      { name: 'Database Server', ip: '192.168.1.11', status: 'degraded' },
      { name: 'Cache Node', ip: '192.168.1.12', status: 'offline' },
    ],
    skipDuplicates: true,
  })

  // --- 3️⃣ Alerts ---
  const dbNode = await prisma.node.findFirst({ where: { name: 'Database Server' } })

  if (dbNode) {
    await prisma.alert.createMany({
      data: [
        {
          nodeId: dbNode.id,
          message: 'High CPU usage detected',
          severity: 'critical',
        },
        {
          nodeId: dbNode.id,
          message: 'Connection timeout occurred',
          severity: 'warning',
        },
      ],
      skipDuplicates: true,
    })
  }

  console.log('✅ Seeding complete! You now have users, nodes, and alerts.')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

