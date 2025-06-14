const response = require("../response");
const db = require("../models").sequelize;
const { StatusCodes } = require("http-status-codes");
const otpGenerator = require("otp-generator");
const mailer = require("../services/mailer.service");
const otpEmailTemplate = require("../templates/otpTemplate");
const { generateJWT } = require("../utils/jsonWebToken.util");
const environmentVariables = require("../constants/environmentVariables");
const commonService = require("../services/common.service");
const { oauth2Client, oauth2 } = require("../utils/googleOAuth.util");

// REGISTER NEW USER
module.exports.register = async (req, res, next) => {
    const dbTransaction = await db.transaction();

    try {
        const { Users } = db.models;
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !email || !password) {
            return response.error(
                req,
                res,
                {
                    msgCode: "MISSING_REQUIRED_FILEDS_IN_REQUEST_BODY",
                    data: "firstname, email, and password are required",
                },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        // Check: Account already exists
        let user = await commonService.findByCondition(Users, {
            email: email,
        });

        if (user && user.isVerified) {
            // Account exists and is verified.
            return response.error(
                req,
                res,
                {
                    msgCode: "ACCOUNT_ALREADY_EXISTS",
                },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        if (!user) {
            // If the account doesn't exists and, then create one.
            user = await commonService.createNewRecord(
                Users,
                {
                    firstname: firstname,
                    lastname: lastname ? lastname : null,
                    email: email,
                    password: password,
                },
                false,
                dbTransaction
            );
            if (!newUser) {
                return response.error(
                    req,
                    res,
                    {
                        msgCode: "INTERNAL_SERVER_ERROR",
                        data: "Failed to register new user, please try again later",
                    },
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    dbTransaction
                );
            }
        }

        // if user exists but not verified, in this case, send OTP to the user email address for verification.
        req.userId = user.id; // attach the user's id to the request object for further use.
        await dbTransaction.commit(); // close the transaction
        next(); // calls the next middleware
    } catch (error) {
        console.log("auth.controllers.js: register(): error: ", error);
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", data: error.message },
            StatusCodes.INTERNAL_SERVER_ERROR,
            dbTransaction
        );
    }
};

// SEND OTP
module.exports.sendOTP = async (req, res, next) => {
    const dbTransaction = await db.transaction();

    try {
        const { Users } = db.models;
        const { userId } = req;

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
                {
                    msgCode: "ACCOUNT_DOES_NOT_EXISTS",
                },
                StatusCodes.BAD_REQUEST,
                dbTransaction
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
        const updatedUser = await commonService.saveRecord(
            user,
            false,
            dbTransaction
        ); // save the changes - otp will be hased automatically due to the `beforeUpdate` hook.

        if (!updatedUser) {
            return response.error(
                req,
                res,
                {
                    msgCode: "USER_DETAILS_UPDATE_FAILED",
                },
                StatusCodes.INTERNAL_SERVER_ERROR,
                dbTransaction
            );
        }

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
                {
                    msgCode: "ERROR_SENDING_OTP_EMAIL",
                },
                StatusCodes.INTERNAL_SERVER_ERROR,
                dbTransaction
            );
        }

        return response.success(
            req,
            res,
            { msgCode: "OTP_SENT_SUCCESSFULLY" },
            StatusCodes.OK,
            dbTransaction
        );
    } catch (error) {
        console.log("auth.controllers.js: sendOTP(): error: ", error);
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", data: error.message },
            StatusCodes.INTERNAL_SERVER_ERROR,
            dbTransaction
        );
    }
};

// VERIFY OTP
module.exports.verifyOTP = async (req, res, next) => {
    const dbTransaction = await db.transaction();

    try {
        const { Users } = db.models;
        const { email, otp } = req.body;

        if (!email || !otp) {
            return response.error(
                req,
                res,
                {
                    msgCode: "MISSING_REQUIRED_FILEDS_IN_REQUEST_BODY",
                    data: "email and otp are required",
                },
                StatusCodes.BAD_REQUEST,
                dbTransaction
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
                dbTransaction
            );
        }

        if (user && user.isVerified) {
            // Account exists and is verified.
            return response.error(
                req,
                res,
                { msgCode: "ACCOUNT_ALREADY_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
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
                dbTransaction
            );
        }

        // check if OTP is expired or not
        if (user.isOTPExpired()) {
            return response.error(
                req,
                res,
                { msgCode: "OTP_EXPIRED" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        user.otp = null;
        user.otpExpiryTime = null;
        user.isVerified = true;
        const updatedUser = await commonService.saveRecord(
            user,
            false,
            dbTransaction
        );
        if (!updatedUser) {
            return response.error(
                req,
                res,
                {
                    msgCode: "USER_DETAILS_UPDATE_FAILED",
                },
                StatusCodes.INTERNAL_SERVER_ERROR,
                dbTransaction
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
                msgCode: "OTP_VERIFIED_SUCCESSFULLY",
                data: {
                    user: { ...updatedUser, password: null },
                    token: token,
                },
            },
            StatusCodes.CREATED,
            dbTransaction
        );
    } catch (error) {
        console.log("auth.controllers.js: verifyOTP(): error: ", error);
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", data: error.message },
            StatusCodes.INTERNAL_SERVER_ERROR,
            dbTransaction
        );
    }
};

// RE-SEND OTP
module.exports.resendOTP = async (req, res, next) => {
    const dbTransaction = await db.transaction();

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
                dbTransaction
            );
        }

        // check if account is already verified or not.
        if (user && user.isVerified) {
            return response.error(
                req,
                res,
                { msgCode: "ACCOUNT_ALREADY_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        // before generating and sending a new OTP, check if the previous OTP is expired or not.
        if (!user.isOTPExpired()) {
            return response.error(
                req,
                res,
                { msgCode: "OTP_NOT_EXPIRED" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
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
        const updatedUser = await commonService.saveRecord(
            user,
            false,
            dbTransaction
        ); // save the changes - otp will be hased automatically due to the `beforeUpdate` hook.
        if (!updatedUser) {
            return response.error(
                req,
                res,
                {
                    msgCode: "USER_DETAILS_UPDATE_FAILED",
                },
                StatusCodes.INTERNAL_SERVER_ERROR,
                dbTransaction
            );
        }

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
                dbTransaction
            );
        }

        return response.success(
            req,
            res,
            { msgCode: "OTP_SENT_SUCCESSFULLY" },
            StatusCodes.OK,
            dbTransaction
        );
    } catch (error) {
        console.log("auth.controllers.js: resendOTP(): error: ", error);
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", data: error.message },
            StatusCodes.INTERNAL_SERVER_ERROR,
            dbTransaction
        );
    }
};

// LOGIN
module.exports.login = async (req, res, next) => {
    const dbTransaction = await db.transaction();

    try {
        const { Users } = db.models;
        const { email, password } = req.body;

        if (!email || !password) {
            return response.error(
                req,
                res,
                { msgCode: "MISSING_REQUIRED_FILEDS_IN_REQUEST_BODY" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
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
            console.log("user not found");
            return response.error(
                req,
                res,
                { msgCode: "ACCOUNT_DOES_NOT_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        if (user && !user.isVerified) {
            return response.error(
                req,
                res,
                {
                    msgCode: "ACCOUNT_NOT_VERIFIED",
                    data: "Please verify your account first, re-register to verify your account",
                },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return response.error(
                req,
                res,
                { msgCode: "INCORRECT_PASSWORD" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
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
            dbTransaction
        );
    } catch (error) {
        console.log("auth.controllers.js: login(): error: ", error);
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", data: error.message },
            StatusCodes.INTERNAL_SERVER_ERROR,
            dbTransaction
        );
    }
};

// LOGOUT
module.exports.logout = async (req, res, next) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return response.success(
            req,
            res,
            { msgCode: "LOGOUT_SUCCESSFULL" },
            StatusCodes.OK
        );
    } catch (error) {
        console.log("auth.controllers.js: logout(): error: ", error);
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", data: error.message },
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};

// GOOGLE AUTHENTICATION
module.exports.googleAuthentication = async (req, res, next) => {
    const dbTransaction = await db.transaction();

    try {
        const { Users, OAuthAccounts } = db.models;
        const { code } = req.body;

        const googleResponse = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleResponse.tokens); // store the user credentials (tokens) in the `oauth2Client` so that it can be used to make authenticated requests to google on behalf of the user.

        // Get the user profile
        const { data } = await oauth2(oauth2Client).userinfo.get();

        const firstname = data?.name.split(" ")[0];
        const lastname = data?.name.split(" ")[1] || null;
        const email = data?.email;
        const avatar = data?.picture;
        const isVerified = data?.verified_email;
        const provider_id = data?.id;

        // check whether user exists or not
        const result = await commonService.findAllWithOneAssociatedModel(
            Users,
            OAuthAccounts,
            { email: email }
        );

        // Case 1: User doesn't exists
        let user, isNewUserCreated, isOAuthAlreadyLinked;
        if (result.count === 0 && result.rows.length === 0) {
            user = await commonService.createNewRecord(
                Users,
                {
                    firstname,
                    lastname,
                    email,
                    avatar,
                    isVerified,
                },
                true,
                dbTransaction
            );

            isNewUserCreated = true;
            if (!user) {
                return response.error(
                    req,
                    res,
                    {
                        msgCode: "INTERNAL_SERVER_ERROR",
                        data: "Failed to register new user, please try again later",
                    },
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    dbTransaction
                );
            }
        }

        // Case 2: User already exists but google's oauth isn't linked
        // Case 2.1: User's email is verified
        // Case 2.2: User's email is not verified
        else if (
            result.count !== 0 &&
            result.rows.length > 0 &&
            !result.rows[0].OAuthAccounts[0].provider_id
        ) {
            if (!result.rows[0].isVerified) {
                const updatedUser = await commonService.updateRecords(
                    Users,
                    { isVerified },
                    { email },
                    dbTransaction
                );

                if (!updatedUser[1]) {
                    return response.error(
                        req,
                        res,
                        {
                            msgCode: "INTERNAL_SERVER_ERROR",
                            data: "Failed to update user isVerified property",
                        },
                        StatusCodes.INTERNAL_SERVER_ERROR,
                        dbTransaction
                    );
                }

                user = updatedUser[1];
            } else {
                user = result.rows[0];
            }
        }

        // Case 3: User already exists with google's oauth linked
        else {
            user = result.rows[0];
            isOAuthAlreadyLinked = true;
        }

        if (!isOAuthAlreadyLinked) {
            const oauthAccount = await commonService.createNewRecord(
                OAuthAccounts,
                {
                    user_id: user.id,
                    provider: "GOOGLE",
                    provider_id: provider_id,
                },
                true,
                dbTransaction
            );

            if (!oauthAccount) {
                return response.error(
                    req,
                    res,
                    {
                        msgCode: "INTERNAL_SERVER_ERROR",
                        data: "Failed to register new user, please try again later",
                    },
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    dbTransaction
                );
            }
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
                msgCode: isNewUserCreated
                    ? "SIGNUP_SUCCESSFULL"
                    : "LOGIN_SUCCESSFULL",
                data: {
                    user: {
                        ...JSON.parse(JSON.stringify(user)),
                        password: null,
                    },
                    token: token,
                },
            },
            isNewUserCreated ? StatusCodes.CREATED : StatusCodes.OK,
            dbTransaction
        );
    } catch (error) {
        console.log(
            "auth.controllers.js: googleAuthentication(): error: ",
            error
        );
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", data: error.message },
            StatusCodes.INTERNAL_SERVER_ERROR,
            dbTransaction
        );
    }
};
