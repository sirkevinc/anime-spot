/* tslint:disable:max-classes-per-file */
import "reflect-metadata"
import { ID, Field, ObjectType, InputType } from "type-graphql"
import { User } from "../User/User.schema"
import { Visited } from "../Visited/Visited.schema"
import { Bookmark } from "../Bookmark/Bookmark.schema"

@ObjectType()
export class Profile {
    @Field((type) => ID)
    id!: number

    @Field((type) => String, { nullable: true })
    bio?: string | null

    @Field((type) => User)
    user?: User    

    @Field((type) => ID)
    userId: number

    @Field((type) => [Visited], { nullable: true })
    visited?: [Visited] | null

    @Field((type) => [Bookmark], { nullable: true })
    bookmarks?: [Bookmark] | null
}

@InputType()
export class ProfileCreateInput implements Partial<Profile> {
    @Field((type) => String)
    bio: string | null

    @Field((type) => Number)
    userId: number
}

@InputType()
export class ProfileUpdateInput implements Partial<Profile> {
    @Field((type) => String)
    bio: string | null
}