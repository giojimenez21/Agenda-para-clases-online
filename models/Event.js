const { Schema, model, default: mongoose } = require("mongoose");

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        requireD: true
    },
    course: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }
    
});

module.exports = model('Event', eventSchema);