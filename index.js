const { ApolloServer } = require("apollo-server");
const { connectDB } = require("./db");
const { resolvers, typeDefs } = require("./graphql/schema");
require("dotenv").config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    context: ({ req }) => {
        const token = req.header("x-token") || "";
        return { token };
    },
});

connectDB();

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
