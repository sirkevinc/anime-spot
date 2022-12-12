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
    notes?: string | null
}

@InputType()
export class VisitedCreateInput implements Partial<Visited> {
    @Field((type) => Number)
    locationId: number

    @Field((type) => Number)
    profileId: number

    @Field((type) => String, { nullable: true })
    notes?: string | null
}
