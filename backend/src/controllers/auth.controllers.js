const response = require("../response");
const db = require("../models").sequelize;
const { StatusCodes } = require("http-status-codes");
const otpGenerator = require("otp-generator");
const mailer = require("../services/mailer.service");
const otpEmailTemplate = require("../templates/otpTemplate");
const { generateJWT, verifyJWT } = require("../utils/jsonWebToken");
const environmentVariables = require("../constants/environmentVariables");
const commonService = require("../services/common.service");

// REGISTER NEW USER
module.exports.register = async (req, res, next) => {
    const dbTrasaction = await db.transaction();

    try {
        const { Users } = db.models;
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !email || !password) {
            return response.error(
                req,
                res,
                { msgCode: "MISSING_REQUIRED_FILEDS_IN_REQUEST_BODY" },
                StatusCodes.BAD_REQUEST,
                dbTrasaction
            );
        }

        // Check: Account already exists
        const user = commonService.findByCondition(Users, { email: email });

        if (user && user.isVerified) {
            // Account exists and is verified.
            return response.error(
                req,
                res,
                { msgCode: "ACCOUNT_ALREADY_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTrasaction
            );
        }

        if (user && !user.isVerified) {
            // Account exists but is not verified.
            // Delete the account and create a new one.
            await commonService.deleteQuery(Users, { email: email }, true);
        }

        // If the account doesn't exists and,
        // Account exists but is not verified.
        // Then in both of the cases, we register this user.
        const newUser = await commonService.createNewRecord(Users, {
            firstname: firstname,
            lastname: lastname ? lastname : null,
            email: email,
            password: password,
        });
        if (!newUser) {
            return response.error(
                req,
                res,
                { msgCode: "INTERNAL_SERVER_ERROR" },
                StatusCodes.INTERNAL_SERVER_ERROR,
                dbTrasaction
            );
        }

        req.userId = newUser.id; // attach the user's id to the request object for further use.
        next(); // calls the next middleware
    } catch (error) {
        console.log("auth.controllers.js: register(): error: ", error);
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR" },
            StatusCodes.INTERNAL_SERVER_ERROR,
            dbTrasaction
        );
    }
};

// SEND OTP
module.exports.sendOTP = async (req, res, next) => {
    const dbTrasaction = await db.transaction();

    try {
        const { Users } = db.models;
        const userId = req.userId;

        const user = await commonService.findByPrimaryKey(
            Users,
            userId,
            [],
            true
        );
        if (!user) {
            return response.error(
                req,
                res,
                { msgCode: "ACCOUNT_DOES_NOT_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTrasaction
            );
        }

        // generate a 6-digit OTP
        const otp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });

        // store the generated OTP in the user record.
        user.otp = otp;
        user.otpExpiryTime = Date.now() + 2 * 60 * 1000; // once OTP is generated, it will be valid for 2 minutes.
        await commonService.saveRecord(user); // save the changes - otp will be hased automatically due to the `beforeUpdate` hook.

        // send the OTP to the user's email address.
        const fullName = `${user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)} ${user.lastname ? user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1) : ""}`;
        const emailSent = await mailer({
            recipientEmail: user.email,
            subject: "Talks: Your One-Time Verification Code",
            textMessage: `Your One-Time Password (OTP) for verification is: ${otp}`,
            htmlTemplate: otpEmailTemplate({
                userName: fullName,
                otp: otp,
            }),
        });

        if (!emailSent) {
            return response.error(
                req,
                res,
                { msgCode: "ERROR_SENDING_OTP_EMAIL" },
                StatusCodes.INTERNAL_SERVER_ERROR,
                dbTrasaction
            );
        }

        return response.success(
            req,
            res,
            { msgCode: "OTP_SENT_SUCCESSFULLY" },
            StatusCodes.OK,
            dbTrasaction
        );
    } catch (error) {
        console.log("auth.controllers.js: sendOTP(): error: ", error);
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR" },
            StatusCodes.INTERNAL_SERVER_ERROR,
            dbTrasaction
        );
    }
};

// VERIFY OTP
module.exports.verifyOTP = async (req, res, next) => {
    const dbTrasaction = await db.transaction();

    try {
        const { Users } = db.models;
        const { email, otp } = req.body;

        if (!email || !otp) {
            return response.error(
                req,
                res,
                { msgCode: "MISSING_REQUIRED_FILEDS_IN_REQUEST_BODY" },
                StatusCodes.BAD_REQUEST,
                dbTrasaction
            );
        }

        const user = await commonService.findByCondition(
            Users,
            {
                email: email,
            },
            [],
            true
        );
        if (!user || !user.otp) {
            // Account doesn't exists or OTP is not sent yet.
            return response.error(
                req,
                res,
                { msgCode: "ACCOUNT_DOES_NOT_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTrasaction
            );
        }

        if (user && user.isVerified) {
            // Account exists and is verified.
            return response.error(
                req,
                res,
                { msgCode: "ACCOUNT_ALREADY_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTrasaction
            );
        }

        // compare the OTP provided by the user with the OTP stored in the database.
        const isOTPValid = await user.compareOTP(otp);
        if (!isOTPValid) {
            return response.error(
                req,
                res,
                { msgCode: "INVALID_OTP" },
                StatusCodes.BAD_REQUEST,
                dbTrasaction
            );
        }

        // check if OTP is expired or not
        if (user.isOTPExpired()) {
            return response.error(
                req,
                res,
                { msgCode: "OTP_EXPIRED" },
                StatusCodes.BAD_REQUEST,
                dbTrasaction
            );
        }

        user.otp = null;
        user.otpExpiryTime = null;
        user.isVerified = true;
        const updatedUser = await commonService.saveRecord(user);

        // Send JWT token as a cookie
        const token = generateJWT({ id: user.id });
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // maxAge defines Cookie Lifespan before it expires. After 7 days (7 * 24 * 60 * 60 * 1000 in Milliseconds), the cookie is automatically deleted.
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie.
            sameSite: "strict", // cookies are only sent for same-site requests.
            secure: environmentVariables.NODE_ENV !== "development", // Ensures cookies are sent only over HTTPS.
        });

        return response.success(
            req,
            res,
            {
                msgCode: "OTP_VERIFIED_SUCCESSFULLY",
                data: {
                    user: { ...updatedUser, password: null },
                    token: token,
                },
            },
            StatusCodes.CREATED,
            dbTrasaction
        );
    } catch (error) {
        console.log("auth.controllers.js: verifyOTP(): error: ", error);
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR" },
            StatusCodes.INTERNAL_SERVER_ERROR,
            dbTrasaction
        );
    }
};

// RE-SEND OTP
module.exports.resendOTP = async (req, res, next) => {
    const dbTrasaction = await db.transaction();

    try {
        const { Users } = db.models;
        const { email } = req.body;

        const user = await commonService.findByCondition(
            Users,
            {
                email: email,
            },
            [],
            true
        );
        if (!user) {
            return response.error(
                req,
                res,
                { msgCode: "ACCOUNT_DOES_NOT_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTrasaction
            );
        }

        // check if account is already verified or not.
        if (user && user.isVerified) {
            return response.error(
                req,
                res,
                { msgCode: "ACCOUNT_ALREADY_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTrasaction
            );
        }

        // before generating and sending a new OTP, check if the previous OTP is expired or not.
        if (!user.isOTPExpired()) {
            return response.error(
                req,
                res,
                { msgCode: "OTP_NOT_EXPIRED" },
                StatusCodes.BAD_REQUEST,
                dbTrasaction
            );
        }

        // generate a 6-digit OTP
        const otp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });

        // store the generated OTP in the user record.
        user.otp = otp;
        user.otpExpiryTime = Date.now() + 2 * 60 * 1000; // once OTP is generated, it will be valid for 2 minutes.
        await commonService.saveRecord(user); // save the changes - otp will be hased automatically due to the `beforeUpdate` hook.

        // send the OTP to the user's email address.
        const fullName = `${user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)} ${user.lastname ? user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1) : ""}`;
        const emailSent = await mailer({
            recipientEmail: user.email,
            subject: "Talks: Your One-Time Verification Code",
            textMessage: `Your One-Time Password (OTP) for verification is: ${otp}`,
            htmlTemplate: otpEmailTemplate({
                userName: fullName,
                otp: otp,
            }),
        });

        if (!emailSent) {
            return response.error(
                req,
                res,
                { msgCode: "ERROR_SENDING_OTP_EMAIL" },
                StatusCodes.INTERNAL_SERVER_ERROR,
                dbTrasaction
            );
        }

        return response.success(
            req,
            res,
            { msgCode: "OTP_SENT_SUCCESSFULLY" },
            StatusCodes.OK,
            dbTrasaction
        );
    } catch (error) {
        console.log("auth.controllers.js: resendOTP(): error: ", error);
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR" },
            StatusCodes.INTERNAL_SERVER_ERROR,
            dbTrasaction
        );
    }
};

// LOGIN
module.exports.login = async (req, res, next) => {
    const dbTrasaction = await db.transaction();

    try {
        const { Users } = db.models;
        const { email, password } = req.body;

        if (!email || !password) {
            return response.error(
                req,
                res,
                { msgCode: "MISSING_REQUIRED_FILEDS_IN_REQUEST_BODY" },
                StatusCodes.BAD_REQUEST
            );
        }

        const user = await commonService.findByCondition(
            Users,
            {
                email: email,
            },
            [],
            true
        );
        if (!user) {
            return response.error(
                req,
                res,
                { msgCode: "ACCOUNT_DOES_NOT_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTrasaction
            );
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return response.error(
                req,
                res,
                { msgCode: "INCORRECT_PASSWORD" },
                StatusCodes.BAD_REQUEST,
                dbTrasaction
            );
        }

        // Send JWT token as a cookie
        const token = generateJWT({ id: user.id });
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // maxAge defines Cookie Lifespan before it expires. After 7 days (7 * 24 * 60 * 60 * 1000 in Milliseconds), the cookie is automatically deleted.
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie.
            sameSite: "strict", // cookies are only sent for same-site requests.
            secure: environmentVariables.NODE_ENV !== "development", // Ensures cookies are sent only over HTTPS.
        });

        return response.success(
            req,
            res,
            {
                msgCode: "LOGIN_SUCCESSFULL",
                data: {
                    user: {
                        ...JSON.parse(JSON.stringify(user)),
                        password: null,
                    },
                    token: token,
                },
            },
            StatusCodes.OK,
            dbTrasaction
        );
    } catch (error) {
        console.log("auth.controllers.js: login(): error: ", error);
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR" },
            StatusCodes.INTERNAL_SERVER_ERROR,
            dbTrasaction
        );
    }
};

// LOGOUT
module.exports.logout = async (req, res, next) => {
    const dbTrasaction = await db.transaction();

    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return response.success(
            req,
            res,
            { msgCode: "LOGOUT_SUCCESSFULL" },
            StatusCodes.OK,
            dbTrasaction
        );
    } catch (error) {
        console.log("auth.controllers.js: logout(): error: ", error);
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR" },
            StatusCodes.INTERNAL_SERVER_ERROR,
            dbTrasaction
        );
    }
};

// DELETE ACCOUNT
module.exports.deleteAccount = async (req, res, next) => {
    const dbTrasaction = await db.transaction();

    try {
        const { Users } = db.models;
        const { userId } = req.body;

        const accountDeleted = await commonService.deleteQuery(
            Users,
            { id: userId },
            true
        );
        if (!accountDeleted) {
            return response.error(
                req,
                res,
                { msgCode: "ACCOUNT_DOES_NOT_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTrasaction
            );
        }

        return response.success(
            req,
            res,
            { msgCode: "ACCOUNT_DELETED_SUCCESSFULLY" },
            StatusCodes.OK,
            dbTrasaction
        );
    } catch (error) {
        console.log("auth.controllers.js: deleteAccount(): error: ", error);
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR" },
            StatusCodes.INTERNAL_SERVER_ERROR,
            dbTrasaction
        );
    }
};

// PROTECT
module.exports.protect = async (req, res, next) => {
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
        return response.error(
            req,
            res,
            { msgCode: "UNAUTHORIZED" },
            StatusCodes.UNAUTHORIZED
        );
    }

    const decoded = verifyJWT(token);
    if (!decoded) {
        return response.error(
            req,
            res,
            { msgCode: "UNAUTHORIZED" },
            StatusCodes.UNAUTHORIZED
        );
    }

    const { Users } = db.models;
    const user = await Users.findByPk(decoded.id);
    if (!user) {
        return response.error(
            req,
            res,
            { msgCode: "UNAUTHORIZED" },
            StatusCodes.UNAUTHORIZED
        );
    }

    if (!user.isTokenValidAfterPasswordChanged(decoded.iat)) {
        return response.error(
            req,
            res,
            { msgCode: "UNAUTHORIZED" },
            StatusCodes.UNAUTHORIZED
        );
    }

    req.user = user;
    next();
};
