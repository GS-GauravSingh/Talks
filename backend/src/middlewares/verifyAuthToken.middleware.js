const commonService = require("../services/common.service");
const response = require("../response");
const { StatusCodes } = require("http-status-codes");
const { verifyJWT } = require("../utils/jsonWebToken.util");
const db = require("../models").sequelize;

module.exports.verifyAuthJwtToken = async (req, res, next) => {
    const { Users } = db.models;
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        console.log(
            "verifyAuthToken.middleware.js: verifyAuthJwtToken(): error: No token provided"
        );
        return response.error(
            req,
            res,
            { msgCode: "UNAUTHORIZED" },
            StatusCodes.UNAUTHORIZED
        );
    }

    const decoded = verifyJWT(token);
    if (!decoded) {
        console.log(
            "verifyAuthToken.middleware.js: verifyAuthJwtToken(): error: Invalid token"
        );
        return response.error(
            req,
            res,
            { msgCode: "UNAUTHORIZED" },
            StatusCodes.UNAUTHORIZED
        );
    }

    const user = await commonService.findByPrimaryKey(
        Users,
        decoded.id,
        [
            "id",
            "firstname",
            "lastname",
            "email",
            "password",
            "avatar",
            "bio",
            "jobTitle",
            "country",
            "isVerified",
        ],
        true
    );
    if (!user) {
        console.log(
            "verifyAuthToken.middleware.js: verifyAuthJwtToken(): error: User not found"
        );
        return response.error(
            req,
            res,
            { msgCode: "UNAUTHORIZED" },
            StatusCodes.UNAUTHORIZED
        );
    }

    if (!user.isTokenValidAfterPasswordChanged(decoded.iat)) {
        console.log(
            "verifyAuthToken.middleware.js: verifyAuthJwtToken(): error: Token is not valid after password change"
        );
        return response.error(
            req,
            res,
            { msgCode: "UNAUTHORIZED" },
            StatusCodes.UNAUTHORIZED
        );
    }

    // console.log("verifyAuthToken.middleware.js: verifyAuthJwtToken(): user: ", user);
    req.user = user; // attach the user to the request object for further use.
    next(); // calls the next middleware
};
