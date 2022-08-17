const { gql } = require("apollo-server");
const moment = require("moment");
const { GraphQLScalarType } = require("graphql");
const { authTypeDefs, authResolvers } = require("./auth");
const { breakTypeDefs, breakResolvers } = require("./break");
const { courseTypeDefs, courseResolvers } = require("./course");
const { eventsTypeDefs, eventsResolvers } = require("./events");

const rootTypeDefs = gql`
    scalar Date

    type Query {
        _: String
    }

    type Mutation {
        _: String
    }
`;

const dateScalar = new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
        return moment(value); 
    },
});

const rootResolvers = {
    Date: dateScalar,
    Query: {
        _: () => "Hello world",
    },
};

const typeDefs = [
    rootTypeDefs,
    eventsTypeDefs,
    authTypeDefs,
    courseTypeDefs,
    breakTypeDefs,
];

const resolvers = [
    rootResolvers,
    eventsResolvers,
    authResolvers,
    courseResolvers,
    breakResolvers,
];

module.exports = {
    resolvers,
    typeDefs,
};
