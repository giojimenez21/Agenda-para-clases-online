const bcrypt = require("bcrypt");
const { gql, AuthenticationError } = require("apollo-server");
const { generateJWT, validateJWT, validateAuthByJWT } = require("../helpers/generate_jwt");
const User = require("../models/User");

const authTypeDefs = gql`
    extend type Mutation {
        login(input: LoginInput): ResLogin
        authenticated(input: AuthenticatedInput): ResLogin
    }

    type ResLogin {
        id: ID!
        username: String!
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
        login: async (_, { input }) => {
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
            const { id, authenticated } = userExists;
            const token = await generateJWT(userExists);
            console.log(id);
            return {
                id,
                username,
                authenticated,
                token
            };
        },
        authenticated: async (_, { input }, { token }) => {
            const { authenticated } = validateAuthByJWT(token);
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
                id: userExists.id,
                username,
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
