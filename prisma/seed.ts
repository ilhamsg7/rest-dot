import { PrismaClient } from '@prisma/client'
import powerUnitSeeder from './seeders/power-unit.seeder'

const prisma = new PrismaClient();

Promise.all([powerUnitSeeder()])
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })