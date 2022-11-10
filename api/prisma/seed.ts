import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        username: "Jerry",
        email: "john@john.com",
        picture: "hello.jpg",
        profile: {
            create: {
                bio: "Test",
                bookmarks: {
                    create: [
                        {
                            locationId:1
                        }
                    ]
                },
                visited: {
                    create: [
                        {
                            locationId: 1,
                            notes: "Dope!"
                        }
                    ]
                }
            },
        }
    },
]
const animeData: Prisma.AnimeCreateInput[] = [
    {
        image: "https://cdn.myanimelist.net/images/anime/4/75923.jpg",
        name: "My Neighbor Totoro (Tonari no Totoro)",
        year: 1988,
        mal: "https://myanimelist.net/anime/523/Tonari_no_Totoro",
        description: "In 1950s Japan, Tatsuo Kusakabe relocates himself and his two daughters, Satsuki and Mei, to the countryside to be closer to their mother, who is hospitalized due to long-term illness. As the girls grow acquainted with rural life, Mei encounters a small, bunny-like creature in the yard one day. Chasing it into the forest, she finds \"Totoro\"—a giant, mystical forest spirit whom she soon befriends. Before long, Satsuki too meets Totoro, and the two girls suddenly find their lives filled with magical adventures in nature and fantastical creatures of the woods.",
        locations: {
            create: [
                {
                    name: "Sayama Hills",
                    image: "https://www.japanfortwo.travel/wp/wp-content/uploads/2018/08/1048d2456519334af5421813f8245b00-1024x684.jpg",
                    description: "Just an hour outside of Tokyo in Saitama are romantic and fun walking trails that lead you through a beautiful forest to meet the famous Totoro at the end. ",
                    longitude: 123,
                    latitude: 123,
                    address: "359-1154 Saitama Prefecture, Tokorozawa, Shorakuji",
                    city: "Saitama",
                    state:"",
                    country: "Japan"
                }
            ]
        }
    }
]

async function main() {
    console.log("Seeding...");
    for (const a of animeData) {
        const anime = await prisma.anime.create({
            data: a
        })
        console.log('Created anime with id', anime.id)
    }
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