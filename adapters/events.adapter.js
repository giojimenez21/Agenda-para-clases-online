const eventAdapter = (events) => {
    const newEvents = events.map((event) => ({
        id: event.id,
        created: event.created,
        title: event.summary,
        description: event.description,
        start: event.start.dateTime,
        end: event.end.dateTime,
    }));
    return newEvents;
};

module.exports = {
    eventAdapter,
};
