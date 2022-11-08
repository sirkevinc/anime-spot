/* tslint:disable:max-classes-per-file */
import "reflect-metadata"
import { ID, Field, ObjectType, InputType, Float } from "type-graphql"
import { Anime } from "../Anime/Anime.schema"

@ObjectType()
export class Location {
    @Field((type) => ID)
    id!: number

    @Field((type) => String)
    name: string

    @Field((type) => String)
    image: string

    @Field((type) => String)
    description: string

    @Field((type) => ID)
    animeId: number

    @Field((type) => Anime)
    anime?: Anime

    @Field((type) => Float)
    longitude: number

    @Field((type) => Float)
    latitude: number

    @Field((type) => String)
    address: string

    @Field((type) => String)
    city: string

    @Field((type) => String, { nullable: true })
    additional?: string | null

    @Field((type) => String)
    state: string

    @Field((type) => String)
    country: string
}

@InputType()
export class LocationCreateInput implements Partial<Location>{
    @Field((type) => String)
    name: string

    @Field((type) => String)
    image: string

    @Field((type) => String)
    description: string

    @Field((type) => ID)
    animeId: number

    @Field((type) => Float)
    longitude: number

    @Field((type) => Float)
    latitude: number

    @Field((type) => String)
    address: string

    @Field((type) => String)
    city: string

    @Field((type) => String, { nullable: true })
    additional?: string | null

    @Field((type) => String)
    state: string

    @Field((type) => String)
    country: string
}

@InputType()
export class LocationUpdateInput implements Partial<Location> {
    @Field((type) => String)
    name: string

    @Field((type) => String)
    image: string

    @Field((type) => String)
    description: string

    @Field((type) => ID)
    animeId: number

    @Field((type) => Float)
    longitude: number

    @Field((type) => Float)
    latitude: number

    @Field((type) => String)
    address: string

    @Field((type) => String)
    city: string

    @Field((type) => String, { nullable: true })
    additional?: string | null

    @Field((type) => String)
    state: string

    @Field((type) => String)
    country: string
}