const fs = require("fs");
const { gql } = require("apollo-server");
const { google } = require("googleapis");
const { eventAdapter } = require("../adapters/events.adapter");
const Event = require("../models/Event");
const { validateJWT } = require("../helpers/generate_jwt");
const Course = require("../models/Course");
const Break = require("../models/Break");

const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const dataCredentials = JSON.parse(
    fs.readFileSync(__dirname + "/../credentials.json", {
        encoding: "utf-8",
    })
);

const eventsTypeDefs = gql`
    extend type Query {
        event: Event
        events: [Event]
    }

    type Event {
        id: ID!
        title: String!
        description: String!
        course: Course!
        created: String!
        start: String!
        end: String!
    }

    extend type Mutation {
        addEvent(input: EventInput): String
    }

    input EventInput {
        title: String!
        description: String!
        course: ID!
        created: String!
        start: String!
        end: String!
    }
`;

const eventsResolvers = {
    Query: {
        // eventss: async () => {

        //     const jwtClient = new google.auth.JWT(
        //         dataCredentials.client_email,
        //         null,
        //         dataCredentials.private_key,
        //         SCOPES
        //     );

        //     const calendar = google.calendar({
        //         version: "v3",
        //         project: dataCredentials.project_id,
        //         auth: jwtClient,
        //     });

        //     const { data } = await calendar.events.list({
        //         calendarId: dataCredentials.calendar_id,
        //         singleEvents: true,
        //         orderBy: "startTime",
        //     });
        //     console.log(data);

        //     return eventAdapter(data.items);
        // },
        events : async() => {
            const eventsAll = await Event.find();
            return eventsAll;
        }
    },
    Mutation: {
        addEvent: async(_, { input }, { token }) => {
            validateJWT(token);
            const promises = [];
            const { title, description, course, created, start, end } = input;
            try {
                const courseExists = await Course.findById(course, {
                    available: true
                });

                if(!courseExists) throw new Error("Course not found or not available");
                

                promises.push(Event.findOne( { start } ));
                promises.push(Break.findOne( { start } ));

                const promiseResults = await Promise.all(promises);

                if(promiseResults[0] || promiseResults[1]) throw new Error("Schedule not available.")
                

                await Event.create({
                    title,
                    description,
                    course,
                    created,
                    start,
                    end
                });

                return "Event created successfully."

            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Event: {
        course: async({ course }) => {
            const courseResult = await Course.findById(course);
            return courseResult;
        }
    }
};

module.exports = {
    eventsResolvers,
    eventsTypeDefs,
};
