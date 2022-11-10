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
import { Visited, VistedCreateInput } from "./Visited.schema";
import { Context } from "../../context"

@Resolver(() => Visited)
export class VisitedResolver {
    @Query(() => [Visited])
    async allVisited(@Arg("profileId") profileId: number, @Ctx() ctx: Context) {
        return ctx.prisma.visited.findMany({
            where: {
                profileId
            },
        })
    }

    @Mutation(() => Visited)
    async addVisited(
        @Arg("data") data: VistedCreateInput,
        @Ctx() ctx: Context): Promise<Visited> {
            const result = await ctx.prisma.visited.create({
                data
            });
            return result;
        }
    
        @Mutation(() => Visited)
        async deleteVisited(
            @Arg("id") id: number,
            @Ctx() ctx: Context): Promise< Visited> {
                const result = await ctx.prisma.visited.delete({
                    where: {
                        id
                    }
                })
                return result;
            }
}