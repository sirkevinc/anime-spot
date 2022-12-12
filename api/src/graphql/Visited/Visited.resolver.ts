import "reflect-metadata"
import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Ctx
} from "type-graphql"
import { Visited, VisitedCreateInput } from "./Visited.schema";
import { Context } from "../../context"

@Resolver(() => Visited)
export class VisitedResolver {
    @Query(() => [Visited])
    async allVisited(@Ctx() ctx: Context) {
        return await ctx.prisma.visited.findMany()
    }

    @Query(() => [Visited])
    async allVisitedByUser(@Arg("profileId") profileId: number, @Ctx() ctx: Context) {
        return ctx.prisma.visited.findMany({
            where: {
                profileId
            },
        })
    }

    @Mutation(() => Visited)
    async addVisited(
        @Arg("data") data: VisitedCreateInput,
        @Ctx() ctx: Context): Promise<Visited> {
            const result = await ctx.prisma.visited.create({
                data: {
                    locationId: data.locationId,
                    profileId: data.profileId,
                    notes: data.notes || "idk bro"
                }
            })
            return result;
        }
    
    // @Mutation(() => Visited)
    // async deleteVisited(
    //     @Arg("id") id: number,
    //     @Ctx() ctx: Context): Promise<Visited> {
    //         const result = await ctx.prisma.visited.delete({
    //             where: {
    //                 id
    //             }
    //         })
    //         return result;
    //     }
}