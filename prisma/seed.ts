import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.case.deleteMany()
  await prisma.user.deleteMany()

  console.log('Seeding...')

  const user = await prisma.user.create({
    data: {
      name: 'default',
      email: 'defaultuser@example.com',
      phone: '9999999',
      city: 'city',
      uf: 'uf',
      password_hash: await hash('123456', 6),
    },
  })

  const cases = [
    {
      title: 'first case',
      description: 'case description',
      value: 100,
      user_id: user.id,
    },
    {
      title: 'second case',
      description: 'case description',
      value: 200,
      user_id: user.id,
    },
    {
      title: 'third case',
      description: 'case description',
      value: 300,
      user_id: user.id,
    },
  ]

  for (const c of cases) {
    await prisma.case.create({
      data: c,
    })
  }

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })

  .catch(async (e) => {
    console.error(e)

    await prisma.$disconnect()

    process.exit(1)
  })
