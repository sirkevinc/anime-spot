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
import { Location, LocationCreateInput, LocationUpdateInput } from "./Location.schema"

@Resolver(() => Location)
export class LocationResolver {
    @Query(() => [Location])
    async getAllLocations(@Ctx() ctx: Context) {
        const result = await ctx.prisma.location.findMany();
        return result;
    }

    // @Query(() => [Location])
    // async getNearbyLocations() {
    //     console.log("use lat/long info")
    // }

    @Query(() => Location) 
    async getLocationById(@Arg("locationId") locationId: number, @Ctx() ctx: Context) {
        const result = await ctx.prisma.location.findUnique({
            where: {
                id: locationId
            }
        })
        return result;
    }

    @Query(() => [Location])
    async getLocationBySearch(@Arg("searchTerm") searchTerm: string, @Ctx() ctx: Context) {
        const result = await ctx.prisma.location.findMany({
            where:{
                OR: {
                    country: searchTerm,
                    city: searchTerm
                }
            }
        })
        return result;
    }

    @Mutation(() => Location)
    async createLocation(
        @Arg("data") data: LocationCreateInput,
        @Ctx() ctx: Context): Promise<Location> {
            const result = await ctx.prisma.location.create({
                data
            });
            return result;
        }

        
        @Mutation(() => Location)
        async updateLocation(
            @Arg("data") data: LocationUpdateInput,
            @Arg("locationId") locationId: number,
            @Ctx() ctx: Context): Promise<Location> {
                const updateResult = await ctx.prisma.location.update({
                    where: {
                        id: locationId,
                    },
                    data
                })
                return updateResult;
            }
            
        @Mutation(() => Location)
        async deleteLocation(
            @Arg("locationId") locationId: number,
            @Ctx() ctx: Context): Promise<Location> {
                const result = await ctx.prisma.location.delete({
                    where: {
                        id: locationId
                    }
                });
                return result;
            }
}