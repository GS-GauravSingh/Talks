const response = require("../response");
const db = require("../models").sequelize;
const { StatusCodes } = require("http-status-codes");
const environmentVariables = require("../constants/environmentVariables");
const commonService = require("../services/common.service");
const cloudinaryUtils = require("../utils/cloudinary.util");

// SEND MESSAGE - sends a message to any particular conversation
module.exports.sendMessage = async (req, res, next) => {
    const dbTransaction = await db.transaction();

    try {
        const { user } = req;
        const { conversationId } = req.params;
        const { message } = req.body;
        const { Conversations, Messages } = db.models;
        const fileObj = req.file;
        console.log("file: ", fileObj);

        if (!message && !fileObj) {
            return response.error(
                req,
                res,
                {
                    msgCode: "MISSING_REQUIRED_FILEDS_IN_REQUEST_BODY",
                    data: "message or image atleast one of them is required",
                },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        // find whether conversation with id `conversationId` exists or not.
        const isConversationExists = await commonService.findByPrimaryKey(
            Conversations,
            conversationId,
            ["id"],
            false
        );

        if (!isConversationExists) {
            return response.error(
                req,
                res,
                { msgCode: "CONVERSATION_DOES_NOT_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        const messageData = {};
        if (message) {
            messageData.message = message;
        }

        if (fileObj) {
            // upload the avatar to cloudinary
            const cloudinaryResponse = await cloudinaryUtils.uploadFile(
                fileObj,
                {
                    folder: "uploads",
                }
            );
            if (!cloudinaryResponse.success) {
                return response.error(
                    req,
                    res,
                    { msgCode: "ERROR_UPLOADING_IMAGE_TO_CLOUDINARY" },
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    dbTransaction
                );
            }

            messageData.image = cloudinaryResponse.url;
        }

        // create a new message
        const newMessage = await commonService.createNewRecord(
            Messages,
            {
                ...messageData,
                senderId: user.id,
                conversationId: conversationId,
            },
            false,
            dbTransaction
        );

        if (!newMessage) {
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

        return response.success(
            req,
            res,
            {
                msgCode: "MESSAGES_SENT_SUCCESSFULLY",
            },
            StatusCodes.CREATED,
            dbTransaction
        );
    } catch (error) {
        console.log("message.controllers.js: sendMessage(): error: ", error);
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", data: error.message },
            StatusCodes.INTERNAL_SERVER_ERROR,
            dbTransaction
        );
    }
};

// DELETE MESSAGE - deletes a previously sent message
module.exports.deleteMessage = async (req, res, next) => {
    const dbTransaction = await db.transaction();

    try {
        const { user } = req;
        const { messageId } = req.params;
        const { Messages } = db.models;

        // find whether message with id `messageId` exists or not.
        const isMessageExists = await commonService.findByPrimaryKey(
            Messages,
            messageId,
            ["id"],
            false
        );

        if (!isMessageExists) {
            return response.error(
                req,
                res,
                { msgCode: "MESSAGE_DOES_NOT_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        if (isMessageExists && isMessageExists.senderId !== user.id) {
            return response.error(
                req,
                res,
                {
                    msgCode: "PERMISSION_DENIED",
                    data: "User who sent the message is allowed to delete the message",
                },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        const isMessageDeleted = await commonService.deleteQuery(
            Messages,
            {
                id: messageId,
            },
            false,
            dbTransaction
        );

        if (!isMessageDeleted) {
            return response.error(
                req,
                res,
                { msgCode: "MESSAGE_DOES_NOT_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        return response.success(
            req,
            res,
            {
                msgCode: "MESSAGES_DELETED_SUCCESSFULLY",
            },
            StatusCodes.OK,
            dbTransaction
        );
    } catch (error) {
        console.log("message.controllers.js: deleteMessage(): error: ", error);
        return response.error(
            req,
            res,
            { msgCode: "INTERNAL_SERVER_ERROR", data: error.message },
            StatusCodes.INTERNAL_SERVER_ERROR,
            dbTransaction
        );
    }
};

// GET MESSAGE HISTORY - Retrieves all the messages sent in a conversation
module.exports.getMessageHistory = async (req, res, next) => {
    const dbTransaction = await db.transaction();

    try {
        const { user } = req;
        const { conversationId } = req.params;
        const { Conversations, Messages, Users } = db.models;

        // find whether conversation with id `conversationId` exists or not.
        const isConversationExists = await commonService.findByPrimaryKey(
            Conversations,
            conversationId,
            ["id"],
            false
        );

        if (!isConversationExists) {
            return response.error(
                req,
                res,
                { msgCode: "CONVERSATION_DOES_NOT_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        // fetch all the messages sent in this conversation
        const allMessages = await commonService.findAllWithOneAssociatedModel(
            Messages,
            Users,
            {
                conversationId: conversationId,
            },
            {},
            [
                "id",
                "senderId",
                "conversationId",
                "message",
                "image",
                "createdAt",
            ],
            [
                "id",
                "firstname",
                "lastname",
                "email",
                "avatar",
                "bio",
                "jobTitle",
                "country",
                "isVerified",
                "tagline",
            ],
            false
        );

        return response.success(
            req,
            res,
            {
                msgCode: "MESSAGES_FETCHED_SUCCESSFULLY",
                data: {
                    messages: allMessages,
                },
            },
            StatusCodes.OK,
            dbTransaction
        );
    } catch (error) {
        console.log(
            "message.controllers.js: getMessageHistory(): error: ",
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
