const { Schema, model } = require("mongoose");

const breakSchema = new Schema({
    start:{
        type: Date
    },
    end: {
        type: Date
    }
});

module.exports = model('Break', breakSchema);