import "reflect-metadata"
import * as tq from "type-graphql"
import { ApolloServer } from 'apollo-server'
// import { schema } from "./graphql/schema"
import { UserResolver } from "./graphql/User/User.resolver"
import { ProfileResolver } from "./graphql/Profile/Profile.resolver"
import { context } from "./context"
import { Profile } from "./graphql/Profile/Profile.schema"


const app = async() => {
    const schema = await tq.buildSchema({
        resolvers: [UserResolver, ProfileResolver],
    })

    const server = new ApolloServer({
        schema,
        context: context
    })
    
    server.listen().then(({ url }) => {
     console.log(`🚀 Server ready at ${url}`)
    })
}

app();