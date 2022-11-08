/* tslint:disable:max-classes-per-file */
import "reflect-metadata"
import { IsEmail } from "class-validator"
import { ID, Field, ObjectType, InputType } from "type-graphql"
import { Profile } from "../Profile/Profile.schema"
import { Role } from "@prisma/client"

@ObjectType()
export class User {
    @Field((type) => ID)
    id!: number

    @Field((type) => Date)
    createdAt: Date

    @Field()
    username!: string

    @Field()
    picture: string

    @Field()
    @IsEmail()
    email: string

    @Field((type) => Profile)
    profile?: Profile

    @Field()
    role!: string
}

@InputType()
export class UserCreateInput implements Partial<User> {
    @Field()
    email: string

    @Field()
    username: string

    @Field()
    picture: string

    @Field({ defaultValue: "USER" })
    role: Role
}