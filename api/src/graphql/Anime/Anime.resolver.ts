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
import { Anime, AnimeCreateInput } from "./Anime.schema"
import { Context } from "../../context"


@Resolver(() => Anime)
export class AnimeResolver {
    @Query(() => [Anime])
    async getAllAnime(@Ctx() ctx: Context) {
        const result = ctx.prisma.anime.findMany();
        return result;
    }
    
    @Query(() => Anime)
    async getAnime(@Arg("id") id: number, @Ctx() ctx: Context) {
        const result = ctx.prisma.anime.findUnique({
            where: {
                id
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
}