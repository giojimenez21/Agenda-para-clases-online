const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/User");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/agenda");
        const userInitExists = await User.findOne({
            username: process.env.USER_INIT,
        });

        if (!userInitExists) {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(process.env.PASSWORD_INIT, salt);
            await User.create({
                username: process.env.USER_INIT,
                password: hashPassword,
                authenticated: false,
            });
        }
        console.log("DB connected");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    connectDB,
};
