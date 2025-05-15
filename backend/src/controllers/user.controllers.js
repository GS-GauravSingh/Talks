const commonService = require("../services/common.service");
const response = require("../response");
const { StatusCodes } = require("http-status-codes");
const cloudinaryUtils = require("../utils/cloudinary.util");
const db = require("../models").sequelize;

// GET ME - Get the logged in user details
module.exports.getMe = async (req, res, next) => {
    const dbTransaction = await db.transaction();

    try {
        const { user } = req;
        return response.success(
            req,
            res,
            {
                msgCode: "USER_DETAILS_FETCHED_SUCCESSFULLY",
                data: {
                    user: {
                        ...JSON.parse(JSON.stringify(user)),
                        password: null,
                    },
                },
            },
            StatusCodes.OK,
            dbTransaction
        );
    } catch (error) {
        console.log("user.controllers.js: getMe(): error: ", error);
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", data: error.message },
            StatusCodes.INTERNAL_SERVER_ERROR,
            dbTransaction
        );
    }
};

// UPDATE ME - Update logged-in user details like bio, jobTitle, and country.
module.exports.updateMe = async (req, res, next) => {
    const dbTransaction = await db.transaction();

    try {
        const { user } = req;
        const { bio, jobTitle, country } = req.body;

        // check whether the user has provided any of the fields to update.
        if (!bio && !jobTitle && !country) {
            return response.error(
                req,
                res,
                { msgCode: "MISSING_REQUIRED_FILEDS_IN_REQUEST_BODY" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        // if fields are present, then only update then when field they don't match with the fields in the database.
        if (
            bio === user.bio &&
            jobTitle === user.jobTitle &&
            country === user.country
        ) {
            return response.error(
                req,
                res,
                { msgCode: "NO_CHANGES_TO_UPDATE" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        // update the user's details
        user.bio = bio;
        user.jobTitle = jobTitle;
        user.country = country;

        // save the changes
        const updatedUser = await commonService.saveRecord(user);
        return response.success(
            req,
            res,
            {
                msgCode: "USER_DETAILS_UPDATED_SUCCESSFULLY",
                data: {
                    user: {
                        ...JSON.parse(JSON.stringify(updatedUser)),
                        password: null,
                    },
                },
            },
            StatusCodes.OK,
            dbTransaction
        );
    } catch (error) {
        console.log("user.controllers.js: updateMe(): error: ", error);
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", data: error.message },
            StatusCodes.INTERNAL_SERVER_ERROR,
            dbTransaction
        );
    }
};

module.exports.updateAvatar = async (req, res, next) => {
    const dbTransaction = await db.transaction();

    try {
        const { user } = req;
        const fileObj = req.file;
        if(!fileObj){
            return response.error(
                req,
                res,
                { msgCode: "FILE_NOT_FOUND" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        // upload the avatar to cloudinary
        const cloudinaryResponse = await cloudinaryUtils.uploadFile(fileObj, {
            folder: "avatars",
        });
        if (!cloudinaryResponse.success) {
            return response.error(
                req,
                res,
                { msgCode: "ERROR_UPLOADING_AVATAR_TO_CLOUDINARY" },
                StatusCodes.INTERNAL_SERVER_ERROR,
                dbTransaction
            );
        }

        // get the secure URL of the uploaded avatar.
        const avatarURL = cloudinaryResponse.url;

        // update the user's avatar - store only the cloudinary URL.
        user.avatar = avatarURL;

        // save the changes
        const updatedUser = await commonService.saveRecord(user);
        return response.success(
            req,
            res,
            {
                msgCode: "USER_DETAILS_UPDATED_SUCCESSFULLY",
                data: {
                    user: {
                        ...JSON.parse(JSON.stringify(updatedUser)),
                        password: null,
                    },
                },
            },
            StatusCodes.OK,
            dbTransaction
        );
    } catch (error) {
        console.log("user.controllers.js: updateAvatar(): error: ", error);
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", data: error.message },
            StatusCodes.INTERNAL_SERVER_ERROR,
            dbTransaction
        );
    }
};

// UPDATE PASSWORD
module.exports.updatePassword = async (req, res, next) => {

    const dbTransaction = await db.transaction();

    try {

        const { currentPassword, newPassword } = req.body;
        if(!currentPassword || !newPassword){
            return response.error(
                req,
                res,
                { msgCode: "MISSING_REQUIRED_FILEDS_IN_REQUEST_BODY" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        const { user } = req;

        // check if the current password provided by the user is correct or not.
        const isPasswordValid = await user.comparePassword(currentPassword);
        if (!isPasswordValid) {
            return response.error(
                req,
                res,
                { msgCode: "INCORRECT_CURRENT_PASSWORD" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        // check if the new password is same as the current password.
        if (currentPassword === newPassword) {
            return response.error(
                req,
                res,
                { msgCode: "NEW_PASSWORD_SAME_AS_CURRENT_PASSWORD" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        // update the user's password
        user.password = newPassword;
        user.passwordChangedAt = Date.now();

        // save the changes
        const updatedUser = await commonService.saveRecord(user);
        return response.success(
            req,
            res,
            {
                msgCode: "USER_DETAILS_UPDATED_SUCCESSFULLY",
                data: {
                    user: {
                        ...JSON.parse(JSON.stringify(updatedUser)),
                        password: null,
                    },
                },
            },
            StatusCodes.OK,
            dbTransaction
        );
        
    } catch (error) {
        console.log("user.controllers.js: updatePassword(): error: ", error);
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", data: error.message },
            StatusCodes.INTERNAL_SERVER_ERROR,
            dbTransaction
        );
    }
};
