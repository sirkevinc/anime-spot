/* tslint:disable:max-classes-per-file */
import "reflect-metadata"
import { ID, Field, ObjectType, InputType } from "type-graphql"
import { Profile } from "../Profile/Profile.schema"

@ObjectType()
export class Visited {
    @Field((type) => ID)
    id!: number

    @Field((type) => ID)
    locationId: number

    @Field((type) => ID)
    profileId: number    

    @Field((type) => Profile)
    profile?: Profile

    @Field((type) => String, { nullable: true })
    notes: string
}

@InputType()
export class VistedCreateInput implements Partial<Visited> {
    @Field((type) => ID)
    locationId: number

    @Field((type) => ID)
    profileId: number

    @Field((type) => String)
    notes: string
}