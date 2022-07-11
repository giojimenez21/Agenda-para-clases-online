const { gql } = require("apollo-server");
const { authTypeDefs, authResolvers } = require("./auth");
const { eventsTypeDefs, eventsResolvers } = require("./events");

const rootTypeDefs = gql`
    type Query{
        _: String
    }

    type Mutation {
        _: String
    }
`;

const rootResolvers = {
    Query:{
        _: () => "Hello world"
    }
}

const typeDefs = [rootTypeDefs, eventsTypeDefs, authTypeDefs];

const resolvers = [rootResolvers, eventsResolvers, authResolvers];


module.exports = {
    resolvers,
    typeDefs
}