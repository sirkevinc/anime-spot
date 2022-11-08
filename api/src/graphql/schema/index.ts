import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { UserResolver } from "../User/User.resolver"

const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
});