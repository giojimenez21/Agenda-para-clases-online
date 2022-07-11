const bcrypt = require("bcrypt");
const { gql, AuthenticationError } = require("apollo-server");
const { generateJWT, validateJWT } = require("../helpers/generate_jwt");
const User = require("../models/User");

const authTypeDefs = gql`
    extend type Mutation {
        login(input: LoginInput): ResLogin
        authenticated(input: AuthenticatedInput): ResLogin
    }

    type ResLogin {
        authenticated: Boolean!
        token: String!
    }

    input LoginInput {
        username: String!
        password: String!
    }

    input AuthenticatedInput {
        username: String!
        password: String!
        newPassword: String!
    }
`;

const authResolvers = {
    Mutation: {
        login: async (_, { input }, context) => {
            const { username, password } = input;

            const userExists = await User.findOne({
                username,
            });

            if (!userExists) {
                throw new AuthenticationError("User not found");
            }
            const validPassword = bcrypt.compareSync(
                password,
                userExists.password
            );

            if (!validPassword) {
                throw new AuthenticationError("Password incorrect");
            }
            const { authenticated } = userExists;
            const token = await generateJWT(userExists);

            return {
                authenticated,
                token
            };
        },
        authenticated: async (_, { input }, { token }) => {
            const { authenticated } = validateJWT(token);
            const { username, password, newPassword } = input;
            const userExists = await User.findOne({
                username,
            });

            if (!userExists) {
                throw new AuthenticationError("User not found");
            }

            const validPassword = bcrypt.compareSync(
                password,
                userExists.password
            );
            
            if (!validPassword) {
                throw new AuthenticationError("Password incorrect");
            }

            if (authenticated) {
                throw new Error("The user is already authenticated");
            }

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(newPassword, salt);

            await userExists.updateOne({
                password: hashPassword,
                authenticated: true,
            });

            const newToken = await generateJWT({
                username,
                authenticated: true,
            });

            return {
                authenticated: true,
                token: newToken
            };
        },
    },
};

module.exports = {
    authTypeDefs,
    authResolvers,
};
