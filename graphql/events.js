const fs = require("fs");
const { gql } = require("apollo-server");
const { google } = require("googleapis");
const { eventAdapter } = require("../adapters/events.adapter");

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
        created: String!
        title: String!
        description: String!
        start: String!
        end: String!
    }

    
`;

const eventsResolvers = {
    Query: {
        event: () => ({
            id: "",
            title: "hola",
        }),
        events: async () => {

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

            const { data } = await calendar.events.list({
                calendarId: dataCredentials.calendar_id,
                singleEvents: true,
                orderBy: "startTime",
            });

            return eventAdapter(data.items);
        },
    },
};

module.exports = {
    eventsResolvers,
    eventsTypeDefs,
};
