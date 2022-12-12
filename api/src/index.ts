import "reflect-metadata"
import * as tq from "type-graphql"
// import { ApolloServer } from 'apollo-server-express'
import { ApolloServer } from 'apollo-server'

// import { schema } from "./graphql/schema"
import { AnimeResolver } from "./graphql/Anime/Anime.resolver"
import { LocationResolver } from "./graphql/Location/Location.resolver"
import { ProfileResolver } from "./graphql/Profile/Profile.resolver"
import { UserResolver } from "./graphql/User/User.resolver"
import { VisitedResolver } from "./graphql/Visited/Visited.resolver"

import { context } from "./context"

import express from "express"
import cors from "cors"

// const allowedOrigins = ["*"];
// const corsOptions: cors.CorsOptions = {
//     origin: allowedOrigins 
// }

// const app = express();
// app.use(cors());
// // app.use('/', express.json());

// const server = async() => {
//     const schema = await tq.buildSchema({
//         resolvers: [
//             UserResolver, 
//             ProfileResolver, 
//             LocationResolver,
//             AnimeResolver,
//             VisitedResolver
//         ],
//     })

//     const server = new ApolloServer({
//         schema,
//         context: context
//     })
    
//     server.start().then(res => {
//         server.applyMiddleware({ app });
//         app.listen({ port: process.env.PORT || 4000 }, () => {
//             console.log(`🚀 Server ready at ${server.graphqlPath}`)
//         })
//     })
// }

// server();

const app = async() => {
    const schema = await tq.buildSchema({
        resolvers: [
            UserResolver, 
            ProfileResolver, 
            LocationResolver,
            AnimeResolver,
            VisitedResolver
        ],
    })

    const server = new ApolloServer({
        schema,
        context: ({ req }) => {
            // console.log(req.headers)
            return context;
        }
    })
    
    server.listen().then(({ url }) => {
     console.log(`🚀 Server ready at ${url}`)
    })

    const allowedOrigins = ["http://localhost:3000"];
    const corsOptions: cors.CorsOptions = {
        origin: allowedOrigins 
    }
}
app();