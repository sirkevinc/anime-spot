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
                },
                {
                    name: "Totoro Bus Stop",
                    image: "https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_1000/v1604547788/blog/dozuvnctwblobd0kuogy.jpg",
                    description: "Tucked away in the outskirts of a Japanese city called Saiki is a quaint bus stop with the name Totoro (ととろ). According to the locals, the place and bus stop has always been called Totoro, even before the birth of the iconic film character. Whether the furry character Totoro was named after the location remains a mystery till today. ",
                    longitude: 123,
                    latitude: 123,
                    address: "轟 Ume Oaza Minamitabaru, Saiki, Oita 879-3302",
                    city: "Saitama",
                    state:"",
                    country: "Japan"
                },
            ]
        }
    },
    {
        image: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
        name: "Your Name (Kimi no Na wa)",
        year: 2016,
        mal: "https://myanimelist.net/anime/32281/Kimi_no_Na_wa",
        description: "Mitsuha Miyamizu, a high school girl, yearns to live the life of a boy in the bustling city of Tokyo—a dream that stands in stark contrast to her present life in the countryside. Meanwhile in the city, Taki Tachibana lives a busy life as a high school student while juggling his part-time job and hopes for a future in architecture.",
        locations: {
            create: [
                {
                    name: "The National Art Centre",
                    image: "https://a1.cdn.japantravel.com/photo/45058-185558/738x902.6806640625!/tokyo-your-name-real-life-locations-185558.jpg",
                    description: "The restaurant that Taki and Okudera-senpai dined at during their date is called \"Salon de the Rond\" and is located on the second floor of The National Art Centre. To get a better view, I suggest going up to the third floor. The restaurant opens at 11AM.",
                    longitude: 123,
                    latitude: 123,
                    address: "7 Chome-22-2 Roppongi, Minato City, Tokyo 106-8558",
                    city: "Tokyo",
                    state:"",
                    country: "Japan"
                },
                {
                    name: "Yotsuya Station",
                    image: "https://a1.cdn.japantravel.com/photo/45058-185564/738x840.33984375!/tokyo-your-name-real-life-locations-185564.jpg",
                    description: "For their date, Taki and Okudera-senpai meet up at Yotsuya Station. To get a better view, take the Akasaka exit and look back. Unfortunately, there was construction going on when I visited so the actual part of the station that is in the film did not have the \"Yotsuya Station\" sign (the right side) so I opted for the other side.",
                    longitude: 123,
                    latitude: 123,
                    address: "1 Chome Yotsuya, Shinjuku City, Tokyo 160-0004",
                    city: "Tokyo",
                    state:"",
                    country: "Japan"
                },
                {
                    name: "Stairs to Suga Shrine",
                    image: "https://a1.cdn.japantravel.com/photo/45058-185567/738x882.861328125!/tokyo-your-name-real-life-locations-185567.jpg",
                    description: "The stairs to Suga Shrine is perhaps the most iconic location of the film. The first promotional materials is set here and film's hopeful ending also takes place here.",
                    longitude: 123,
                    latitude: 123,
                    address: "5-banchi Sugacho, Shinjuku City, Tokyo 160-0018",
                    city: "Tokyo",
                    state:"",
                    country: "Japan"
                },
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