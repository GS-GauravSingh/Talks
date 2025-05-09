const jwt = require("jsonwebtoken");
const environmentVariables = require("../constants/environmentVariables");

module.exports.generateJWT = (payload) => {
    return jwt.sign(payload, environmentVariables.JWT_SECRET_KEY, {
        expiresIn: "7d", // JWT Token will expire in 7 days
    });
};

module.exports.verifyJWT = (token) => {
    try {
        return jwt.verify(token, environmentVariables.JWT_SECRET_KEY);
    } catch (error) {
        return false;
    }
};
