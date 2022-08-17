const fs = require("fs");
const moment = require("moment");
const { gql } = require("apollo-server");
const { google } = require("googleapis");
const Event = require("../models/Event");
const Course = require("../models/Course");
const Break = require("../models/Break");
const { validateJWT } = require("../helpers/generate_jwt");

const SCOPES = "https://www.googleapis.com/auth/calendar";
const dataCredentials = JSON.parse(
    fs.readFileSync(__dirname + "/../credentials.json", {
        encoding: "utf-8",
    })
);
const jwtClient = new google.auth.JWT(
    dataCredentials.client_email,
    null,
    dataCredentials.private_key,
    SCOPES
);

const calendar = google.calendar({
    version: "v3",
    project: dataCredentials.project_id,
    auth: jwtClient,
});

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
        created: Date!
        start: Date!
        end: Date!
        idCalendar: ID!
    }

    extend type Mutation {
        addEvent(input: EventInput): ID
        deleteEvent(input: String): String
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
        events: async () => {
            const eventsAll = await Event.find();
            return eventsAll;
        },
    },
    Mutation: {
        addEvent: async (_, { input }, { token }) => {
            validateJWT(token);
            const promises = [];
            const { title, description, course, created, start, end } = input;
            try {
                const courseExists = await Course.findById(course, {
                    available: true,
                });

                if (!courseExists) throw new Error("Course not found or not available");
                if(moment(start).isAfter(moment(end))) throw new Error("The end time cannot be less than the start time");

                promises.push(Event.findOne({ start }));
                promises.push(Break.findOne({ start }));

                const promiseResults = await Promise.all(promises);

                if (promiseResults[0] || promiseResults[1]) throw new Error("Schedule not available.");

                
                const { data } = await calendar.events.insert({
                    calendarId: dataCredentials.calendar_id,
                    resource: {
                        summary: title,
                        description,
                        start: {
                            dateTime: moment.utc(start),
                        },
                        end: {
                            dateTime: moment.utc(end),
                        },
                    },
                });
                
                const eventCreated = await Event.create({
                    title,
                    description,
                    course,
                    created,
                    start,
                    end,
                    idCalendar: data.id
                });

                return eventCreated.id;

            } catch (error) {
                throw new Error(error);
            }
        },
        deleteEvent: async(_,{ input: id }, { token }) => {
            validateJWT(token);
            const eventFind = await Event.findByIdAndDelete(id);
            await calendar.events.delete({
                calendarId: dataCredentials.calendar_id,
                eventId: eventFind.idCalendar
            });
            return "Event deleted."
        }
    },
    Event: {
        course: async ({ course }) => {
            const courseResult = await Course.findById(course);
            return courseResult;
        },
    },
};

module.exports = {
    eventsResolvers,
    eventsTypeDefs,
};
