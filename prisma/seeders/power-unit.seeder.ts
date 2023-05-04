import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function powerUnitSeeder() {
    await prisma.powerUnit.createMany({
        data: [
            {
                name: "Mercedes"
            },
            {
                name: "Ferrari"
            },
            {
                name: "RBPT-Honda"
            },
            {
                name: "Alpine-Renault"
            }
        ]
    });
}

export default powerUnitSeeder;