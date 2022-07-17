const { gql } = require("apollo-server");
const { authTypeDefs, authResolvers } = require("./auth");
const { breakTypeDefs, breakResolvers } = require("./break");
const { courseTypeDefs, courseResolvers } = require("./course");
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

const typeDefs = [rootTypeDefs, eventsTypeDefs, authTypeDefs, courseTypeDefs, breakTypeDefs];

const resolvers = [rootResolvers, eventsResolvers, authResolvers, courseResolvers, breakResolvers];


module.exports = {
    resolvers,
    typeDefs
}