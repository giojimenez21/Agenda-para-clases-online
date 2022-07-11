const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: String,
    password: String,
    authenticated: Boolean
});

module.exports = model('User', userSchema);