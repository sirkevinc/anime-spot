import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        username: "John",
        email: "john@john.com",
        picture: "hello.jpg"
    },
    {
        username: "Jerry",
        email: "jerry@jerry.com",
        picture: "hello.jpg"
    }
]

async function main() {
    console.log("Seeding...");
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        })
        console.log('Created user with id', user.id)
    }
    console.log("Seeding Complete")
}

main()
    .then(async() => {
        await prisma.$disconnect()
    })
    .catch(async(e) => {
        console.error(e);
        await prisma.$disconnect()
        process.exit(1)
    })