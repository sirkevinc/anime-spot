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
import { Context } from "../../context"
import { User, UserCreateInput } from "./User.schema"
import { ProfileCreateInput } from "../Profile/Profile.schema"

@Resolver(() => User)
export class UserResolver {
    @Query(() => [User])
    async allUsers(@Ctx() ctx: Context) {
        let users = await ctx.prisma.user.findMany({
            include: {
                profile: true
            }
        });
        return users;
    }

    @Query(() => User)
    async getUser(@Arg("userId") userId: number, @Ctx() ctx: Context) {
        return ctx.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                profile: true
            }
        })
    }

    @Mutation(() => User)
    async singupUser(
        @Arg("data") data: UserCreateInput,
        @Ctx() ctx: Context): Promise<User> {
            const userResult = await ctx.prisma.user.create({
                data
            });
            const userId = await userResult.id;
            const profileResult: ProfileCreateInput = await ctx.prisma.profile.create({
                data: {
                    bio: "",
                    userId
                }
            });
            return userResult;
        }
}