import "reflect-metadata"
import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Ctx,
    FieldResolver,
    Root,
    Int,
    InputType,
    Field
} from "type-graphql"
import { Anime, AnimeCreateInput, AnimeUpdateInput } from "./Anime.schema"
import { Context } from "../../context"


@Resolver(() => Anime)
export class AnimeResolver {
    @Query(() => [Anime])
    async getAllAnime(@Ctx() ctx: Context) {
        const result = ctx.prisma.anime.findMany({
            include: {
                locations: true
            }
        });
        return result;
    }
    
    @Query(() => Anime)
    async getAnimeById(@Arg("id") id: number, @Ctx() ctx: Context) {
        const result = ctx.prisma.anime.findUnique({
            where: {
                id
            },
            include: {
                locations: true
            }
        })
        return result;
    }

    @Query(() => [Anime])
    async getAnimeBySearch(@Arg("searchTerm") searchTerm: string, @Ctx() ctx: Context) {
        const result = await ctx.prisma.anime.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: searchTerm,
                            mode: "insensitive"
                        }
                    },
                ]
            },
            include: {
                locations: true
            }
        })
        return result;
    }

    @Mutation(() => Anime)
    async createAnime(
        @Arg("data") data: AnimeCreateInput,
        @Ctx() ctx: Context): Promise<Anime> {
            const result = await ctx.prisma.anime.create({
                data
            })
            return result;
        }

    @Mutation(() => Anime)
    async updateAnime(
        @Arg("data") data: AnimeUpdateInput,
        @Arg("id") id: number,
        @Ctx() ctx: Context): Promise<Anime> {
            const result = await ctx.prisma.anime.update({
                where: {
                    id
                },
                data
            })
            return result;
        }
    
    @Mutation(() => Anime)
    async deleteAnimme(
        @Arg("id") id: number,
        @Ctx() ctx: Context): Promise<Anime> {
            const result = await ctx.prisma.anime.delete({
                where: {
                    id
                }
            })
            return result;
        }
}