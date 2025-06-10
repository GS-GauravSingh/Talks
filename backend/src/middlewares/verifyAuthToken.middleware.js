const commonService = require("../services/common.service");
const response = require("../response");
const { StatusCodes } = require("http-status-codes");
const { verifyJWT } = require("../utils/jsonWebToken.util");
const db = require("../models").sequelize;

module.exports.verifyAuthJwtToken = async (req, res, next) => {
    try {
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
                "tagline",
                "isVerified",
                "status",
                "createdAt",
                "updatedAt",
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
    } catch (error) {
        console.log(
            "verifyAuthToken.middleware.js: verifyAuthJwtToken(): error: "
        );
        return response.error(
            req,
            res,
            { msgCode: "UNAUTHORIZED" },
            StatusCodes.UNAUTHORIZED
        );
    }
};

module.exports.verifySocketJwtToken = async (socket, next) => {
    try {
        let token;
        const { Users } = db.models;

        // Try from socket auth
        if (socket.handshake.auth?.jwt) {
            token = socket.handshake.auth.jwt;
        }

        // Try from cookie header if not found
        if (!token && socket.handshake.headers?.cookie) {
            const match = socket.handshake.headers.cookie.match(/jwt=([^;]+)/);
            if (match) {
                token = match[1];
            }
        }

        // if Token not found
        if (!token) {
            console.log(
                "verifyAuthToken.middleware.js: verifySocketJwtToken(): error: No token provided"
            );
            return next(
                new response.SocketError(
                    {
                        msgCode: "UNAUTHORIZED",
                        data: "Unauthorized, token not provided",
                    },
                    StatusCodes.UNAUTHORIZED
                )
            );
        }

        const decoded = verifyJWT(token);
        if (!decoded) {
            console.log(
                "verifyAuthToken.middleware.js: verifySocketJwtToken(): error: Invalid token"
            );
            return next(
                new response.SocketError(
                    {
                        msgCode: "UNAUTHORIZED",
                        data: "Invalid token, either the token was expired or the user have changed their password recently",
                    },
                    StatusCodes.UNAUTHORIZED
                )
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
                "tagline",
                "isVerified",
                "socketId",
                "status",
                "createdAt",
                "updatedAt",
            ],
            true
        );
        if (!user) {
            console.log(
                "verifyAuthToken.middleware.js: verifySocketJwtToken(): error: User not found"
            );
            return next(
                new response.SocketError(
                    {
                        msgCode: "UNAUTHORIZED",
                        data: "User not found: User belonging to this token no longer exists",
                    },
                    StatusCodes.UNAUTHORIZED
                )
            );
        }

        if (!user.isTokenValidAfterPasswordChanged(decoded.iat)) {
            console.log(
                "verifyAuthToken.middleware.js: verifySocketJwtToken(): error: Token is not valid after password change"
            );
            return next(
                new response.SocketError(
                    {
                        msgCode: "UNAUTHORIZED",
                        data: "Invalid token: The user have recently changed their password",
                    },
                    StatusCodes.UNAUTHORIZED
                )
            );
        }

        socket.user = user;
        next(); // calls the next middleware
    } catch (error) {
        console.error(
            "verifyAuthToken.middleware.js: verifySocketJwtToken(): error:",
            error.message
        );
        return next(
            new response.SocketError(
                {
                    msgCode: "UNAUTHORIZED",
                    data: error.message,
                },
                StatusCodes.UNAUTHORIZED
            )
        );
    }
};
