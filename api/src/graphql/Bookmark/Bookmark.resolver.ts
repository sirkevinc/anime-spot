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
import { Bookmark, BookmarkCreateInput } from "./Bookmark.schema"

import { Context } from "../../context"

@Resolver(() => Bookmark)
export class BookmarkResolver {
    @Query(() => [Bookmark])
    async getBookmarksByProfile(@Arg("profileId") profileId: number, @Ctx() ctx: Context) {
        return ctx.prisma.bookmark.findMany({
            where: {
                profileId
            },
        })
    }

    @Mutation(() => Bookmark)
    async addBookmark(
        @Arg("data") data: BookmarkCreateInput,
        @Ctx() ctx: Context): Promise<Bookmark> {
            const result = await ctx.prisma.bookmark.create({
                data
            });
            return result;
        }
    
        @Mutation(() => Bookmark)
        async deleteBookmark(
            @Arg("id") id: number,
            @Ctx() ctx: Context): Promise<Bookmark> {
                const result = await ctx.prisma.bookmark.delete({
                    where: {
                        id
                    }
                })
                return result;
            }
}