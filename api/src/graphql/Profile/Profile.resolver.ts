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
    Args
} from "type-graphql"
import { Profile, ProfileUpdateInput } from "./Profile.schema"
import { User } from "../User/User.schema"
import { Context } from "../../context"

@Resolver(() => Profile)
export class ProfileResolver {
    @Query(() => Profile)
    async getProfiles(@Ctx() ctx: Context) {
        const result = await ctx.prisma.profile.findMany()
        return result;
    }
    @Query(() => Profile)
    async getProfile(@Arg("userId") userId: string, @Ctx() ctx: Context) {
        const result = await ctx.prisma.profile.findUnique({
            where: {
                userId
            },
            include: {
                user: true,
                visited: true,
                bookmarks: true
            },
        })
        return result;
    }

    @Mutation(() => Profile)
    async updateProfile(
        @Arg("data") data: ProfileUpdateInput,
        @Arg("userId") userId: string,
        @Ctx() ctx: Context): Promise<Profile> {
            const updateResult = await ctx.prisma.profile.update({
                where: {
                    userId
                },
                data
            })
            return updateResult;
        }

        @Mutation(() => Profile)
        async deleteProfile(
            @Arg("userId") userId: string,
            @Ctx() ctx: Context): Promise<Profile> {
                const result = await ctx.prisma.profile.delete({
                    where: {
                        userId
                    }
                })
                return result;
            }
}