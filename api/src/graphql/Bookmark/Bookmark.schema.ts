/* tslint:disable:max-classes-per-file */
import "reflect-metadata"
import { ID, Field, ObjectType, InputType } from "type-graphql"
import { Profile } from "../Profile/Profile.schema"

@ObjectType()
export class Bookmark {
    @Field((type) => ID)
    id!: number

    @Field((type) => ID)
    locationId: number

    @Field((type) => ID)
    profileId: number    

    @Field((type) => Profile)
    profile?: Profile
}

@InputType()
export class BookmarkCreateInput implements Partial<Bookmark> {
    @Field((type) => ID)
    locationId: number

    @Field((type) => ID)
    profileId: number
}