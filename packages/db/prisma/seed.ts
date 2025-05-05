import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs";
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: '1111111112' },
    update: {},
    create: {
      number: '1111111112',
      password: await bcrypt.hash('alice', 10),
      name: 'alice',
      Balance: {
        create: {
            amount: 20000,
            locked: 0
        }
      },
      OnRampTransaction: {
        create: [{
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: `token__${Date.now()}__${Math.random().toString(36).substring(2, 8)}`,
          provider: "HDFC Bank",
        },
        {
          startTime: new Date(), // 1 hour ago
          status: "Processing",
          amount: 5000,
          token: `token__${Date.now()}__${Math.random().toString(36).substring(2, 8)}`,
          provider: "SBI",
        },
        {
          startTime: new Date(),
          status: "Failure",
          amount: 8000,
          token: `token__${Date.now()}__${Math.random().toString(36).substring(2, 8)}`,
          provider: "ICICI",
        },
        {
          startTime: new Date(), // 1 day ago
          status: "Success",
          amount: 7000,
          token: `token__${Date.now()}__${Math.random().toString(36).substring(2, 8)}`,
          provider: "Axis Bank",
        },
        {
          startTime: new Date(),
          status: "Success",
          amount: 3000,
          token: `token__${Date.now()}__${Math.random().toString(36).substring(2, 8)}`,
          provider: "HDFC Bank",
        },
        {
          startTime: new Date(),
          status: "Failure",
          amount: 2500,
          token: `token__${Date.now()}__${Math.random().toString(36).substring(2, 8)}`,
          provider: "Kotak",
        },
        {
          startTime: new Date(),
          status: "Processing",
          amount: 9000,
          token: `token__${Date.now()}__${Math.random().toString(36).substring(2, 8)}`,
          provider: "SBI",
        },
        {
          startTime: new Date(),
          status: "Success",
          amount: 6000,
          token: `token__${Date.now()}__${Math.random().toString(36).substring(2, 8)}`,
          provider: "ICICI",
        },
        {
          startTime: new Date(),
          status: "Processing",
          amount: 1500,
          token: `token__${Date.now()}__${Math.random().toString(36).substring(2, 8)}`,
          provider: "HDFC Bank",
        },
        {
          startTime: new Date(),
          status: "Success",
          amount: 1200,
          token: `token__${Date.now()}__${Math.random().toString(36).substring(2, 8)}`,
          provider: "Axis Bank",
        },
      ]
      },
    },
  })
  console.log({ alice })
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