const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
    nameCourse: String,
    available: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = model('Course', courseSchema);