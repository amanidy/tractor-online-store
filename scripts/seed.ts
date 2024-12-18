import { PrismaClient } from '@prisma/client';

const database = new PrismaClient();


async function main() {
    try {
        await database.category.createMany({
          data: [
            { name: "Accessories and Implements" },
            { name: "Tractors by Region" },
            { name: "Tractors by Brand" },
            { name: "Tractors by Type" },
            { name: "Tractors by Usage" },
            { name: "Tractors by Horsepower" },
            { name: "Budget Categories" },
          ],
        });

        console.log("Success");
    } catch (error) {
        console.log("Error seeding categories database", error);
    } finally {
        await database.$disconnect();
    }
}

main();