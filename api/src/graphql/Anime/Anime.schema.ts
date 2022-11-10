/* tslint:disable:max-classes-per-file */
import "reflect-metadata"
import { ID, Field, ObjectType, InputType } from "type-graphql"
import { Location } from "../Location/Location.schema"

@ObjectType()
export class Anime {
    @Field((type) => ID)
    id!: number

    @Field((type) => String)
    image: string

    @Field((type) => String)
    name: string

    @Field((type) => Number)
    year: number

    @Field((type) => String)
    mal: string | null
    
    @Field((type) => String)
    description: string

    @Field((type) => [Location], { nullable: true })
    locations?: [Location] | null
}

@InputType()
export class AnimeCreateInput implements Partial<Anime> {
    @Field((type) => String)
    image: string
    
    @Field((type) => String)
    name: string
    
    @Field((type) => Number)
    year: number
    
    @Field((type) => String)
    mal: string

    @Field((type) => String)
    description: string
}

@InputType()
export class AnimeUpdateInput implements Partial<Anime> {
    @Field((type) => String)
    image: string
    
    @Field((type) => String)
    name: string
    
    @Field((type) => Number)
    year: number
    
    @Field((type) => String)
    mal: string

    @Field((type) => String)
    description: string
}