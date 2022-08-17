const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const generateJWT = ({username, authenticated}) =>
    new Promise((resolve, reject) => {
        const payload = { username,  authenticated};
        jwt.sign(
            payload,
            process.env.SECRET_JWT,
            {
                expiresIn: "365d",
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject("No se pudo generar el token");
                } else {
                    resolve(token);
                }
            }
        );
    });

const validateJWT = (token) => {
    try {
        if (token.length < 10) {
            return null;
        }

        const payload = jwt.verify(token, process.env.SECRET_JWT);
        
        if(!payload.authenticated) {
            throw new AuthenticationError("User not authenticated");
        }
        return payload;

    } catch (error) {
        throw new AuthenticationError(error);
    }
};

const validateAuthByJWT = (token) => {
    try {
        if (token.length < 10) {
            return null;
        }

        const payload = jwt.verify(token, process.env.SECRET_JWT);
        
        return payload;

    } catch (error) {
        throw new AuthenticationError(error);
    }
}

module.exports = {
    generateJWT,
    validateJWT,
    validateAuthByJWT
}
