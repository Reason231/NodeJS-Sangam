const {ApolloServer} =require('@apollo/server')
const {startStandaloneServer} = require("@apollo/server/standalone")
const {typeDefs}=require("./graphql/schema")
const resolvers=require('./graphql/resolvers')

async function startServer() {
    const server=new ApolloServer({
        typeDefs,
        resolvers
    })

    const {url} = await startStandaloneServer(server,{
        listen:{port:4000}
    })

    console.log(`SErver is ready at ${url}`)
    // Read readme.md file for the output showcase

}

startServer()