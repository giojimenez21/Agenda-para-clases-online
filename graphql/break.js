const { gql } = require("apollo-server");
const moment = require("moment");
const { validateJWT } = require("../helpers/generate_jwt");
const Break = require("../models/Break");

const breakTypeDefs = gql`
    extend type Query {
        breaks: [Break]
    }

    type Break {
        id: ID!
        start: Date!
        end: Date!
    }

    extend type Mutation {
        addBreak(input: BreakInput): String
        editBreak(input: BreakEdit): String
        deleteBreak(input: ID): String
        addBreakMoreDays(input: BreakMoreInput): String
    }

    input BreakInput {
        start: String!
        end: String!
    }

    input BreakEdit {
        id: ID!
        start: String!
        end: String!
    }

    input BreakMoreInput {
        start: String!
        end: String!
        hour: String!
    }
`;

const breakResolvers = {
    Query: {
        breaks: async () => {
            try {
                const allBreaks = await Break.find();
                return allBreaks;
            } catch (error) {
                throw new Error(error);
            }
        },
    },
    Mutation: {
        addBreak: async (_, { input }, { token }) => {
            validateJWT(token);

            const { start, end } = input;
            const startMoment = moment(start);
            const endMoment = moment(end);

            if(startMoment.isAfter(endMoment)){
                throw new Error("The start date cannot be greater than the end date")
            }

            try {
                const breakExists = await Break.findOne({
                    start
                });

                if(breakExists){
                    throw new Error("There is already a break scheduled at that time")
                }

                await Break.create({
                    start,
                    end
                });

                return "Break added succesfully";

            } catch (error) {
                throw new Error(error);
            }
        },
        editBreak: async(_, { input }, { token }) => {
            const { id, start, end } = input;
            validateJWT(token);

            try {
                const breakEdit = await Break.findById(id);

                if(!breakEdit) {
                    throw new Error("No break was found with that id");
                }

                await breakEdit.updateOne({
                    start,
                    end
                });

                return "Break edited successfuly";

            } catch (error) {
                throw new Error(error);
            }
        },
        deleteBreak: async(_, { input:id }, { token }) => {
            validateJWT(token);
            try {
                const breakDeleted = await Break.findById(id);

                if(!breakDeleted) {
                    throw new Error("Course not found")
                }

                await breakDeleted.deleteOne();
                return "Break deleted";

            } catch (error) {
                throw new Error(error);
            }
        },
        addBreakMoreDays: async(_, { input }, { token }) => {
            validateJWT(token);
            const { start, end, hour } = input;
            const hourFinal = hour.split(":");
            const startMoment = moment(start).add(hourFinal[0], "hour");
            startMoment.add(hourFinal[1], "minute");
            const endMoment = moment(end).add(hourFinal[0], "hour");
            endMoment.add(hourFinal[1], "minute");

            if(startMoment.isAfter(endMoment)){
                throw new Error("The start date cannot be greater than the end date")
            }

            try {
                while(startMoment.isSameOrBefore(endMoment)){
                    const breakExists = await Break.findOne({
                        start: startMoment
                    });
    
                    if(breakExists){
                        throw new Error("A break already exists, define the ranges well.")
                    }
                    
                    await Break.create({
                        start: startMoment.format("YYYY-MM-DD HH:mm"),
                        end: startMoment.format("YYYY-MM-DD HH:mm")
                    });

                    startMoment.add(1, "day");
                }

                return "Ready breaks"

            } catch (error) {
                throw new Error(error)
            }
        }
    },
};

module.exports = {
    breakResolvers,
    breakTypeDefs,
};
