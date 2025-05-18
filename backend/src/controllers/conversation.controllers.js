const commonService = require("../services/common.service");
const response = require("../response");
const { StatusCodes } = require("http-status-codes");
const db = require("../models").sequelize;
const { Op } = require("sequelize");
const cloudinaryUtils = require("../utils/cloudinary.util");

// CREATE CONVERSATION - creates a new conversation between the current user and the other users.
module.exports.createConversation = async (req, res, next) => {
    const dbTransaction = await db.transaction();

    try {
        const { user } = req; // logged in user
        const { userIds, name } = req.body;
        const { Conversations, UserConversations } = db.models;

        const isGroupChat = userIds.length > 1;
        const grpName = isGroupChat ? (name ? name : "Group Chat") : null;

        // check if the conversation already exists or not.
        // just have to figure out where all users are part of the same conversation inculuding the current user.
        const allUserIds = userIds.includes(user.id)
            ? userIds
            : [user.id, ...userIds];

        allUserIds.sort();

        const isConversationAlreadyExists =
            await commonService.findAllWithGroupByAndAggregateFunction(
                UserConversations,
                {
                    userId: {
                        [Op.in]: allUserIds,
                    },
                },
                ["conversationId"],
                false,
                ["conversationId"],
                db.literal(
                    `COUNT("UserConversations"."userId") = ${allUserIds.length}`
                )
            );

        if (isConversationAlreadyExists.length > 0) {
            return response.error(
                req,
                res,
                {
                    msgCode: "CONVERSATION_ALREADY_EXISTS",
                    data: isConversationAlreadyExists[0],
                },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        // if the conversation doesn't exists, then create a new conversation.
        const newConversation = await commonService.createNewRecord(
            Conversations,
            {
                name: grpName,
                isGroupChat: isGroupChat,
                groupAdminId: isGroupChat ? user.id : null,
            }
        );

        if (!newConversation) {
            return response.error(
                req,
                res,
                {
                    msgCode: "INTERNAL_SERVER_ERROR",
                    data: "Failed to create new conversation",
                },
                StatusCodes.INTERNAL_SERVER_ERROR,
                dbTransaction
            );
        }

        // store the mapping, that all users are part of the new conversation.
        const userToConversation = allUserIds.map((userId) => {
            return {
                userId: userId,
                conversationId: newConversation.id,
            };
        });

        const addedUsers = await commonService.bulkAdd(
            UserConversations,
            userToConversation
        );
        if (!addedUsers) {
            return response.error(
                req,
                res,
                {
                    msgCode: "INTERNAL_SERVER_ERROR",
                    data: "Failed to add users to conversation",
                },
                StatusCodes.INTERNAL_SERVER_ERROR,
                dbTransaction
            );
        }

        return response.success(
            req,
            res,
            {
                msgCode: "CONVERSATION_CREATED_SUCCESSFULLY",
                data: newConversation,
            },
            StatusCodes.CREATED,
            dbTransaction
        );
    } catch (error) {
        console.log(
            "conversation.controllers.js: createConversation(): error: ",
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

// GET CONVERSATION - Get a conversation by conversationId
module.exports.getConversation = async (req, res, next) => {
    const dbTransaction = await db.transaction();

    try {
        const { conversationId } = req.params;
        const { user } = req;
        const { Conversations, UserConversations, Users } = db.models;

        const conversation = await commonService.findByCondition(
            Conversations,
            {
                id: conversationId,
            }
        );

        if (!conversation) {
            return response.error(
                req,
                res,
                { msgCode: "CONVERSATION_DOES_NOT_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        const conversationDetails =
            await commonService.findAllWithOneAssociatedModel(
                Conversations,
                Users,
                {
                    id: conversationId,
                }
            );
        if (!conversationDetails) {
            return response.error(
                req,
                res,
                { msgCode: "CONVERSATION_DOES_NOT_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        return response.success(
            req,
            res,
            {
                msgCode: "CONVERSATION_FETCHED_SUCCESSFULLY",
                data: conversationDetails,
            },
            StatusCodes.OK,
            dbTransaction
        );
    } catch (error) {
        console.log(
            "conversation.controllers.js: getConversation(): error: ",
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

// GET ALL CONVERSATIONS - Get all conversations of the logged in user
module.exports.getAllConversations = async (req, res, next) => {
    const dbTransaction = await db.transaction();

    try {
        const { user } = req;
        const { Conversations, UserConversations, Users } = db.models;

        const conversations = await commonService.findAllWithCount(
            UserConversations,
            {
                userId: user.id,
            },
            ["conversationId"]
        );

        if (!conversations) {
            return response.error(
                req,
                res,
                { msgCode: "NO_CONVERSATIONS_FOUND" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        const conversationIds = conversations.rows.map((conversation) => {
            return conversation.conversationId;
        });

        const allConversations =
            await commonService.findAllWithOneAssociatedModel(
                Conversations,
                Users,
                {
                    id: {
                        [Op.in]: conversationIds,
                    },
                }
            );

        if (!allConversations) {
            return response.error(
                req,
                res,
                { msgCode: "NO_CONVERSATIONS_FOUND" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        return response.success(
            req,
            res,
            {
                msgCode: "CONVERSATIONS_FETCHED_SUCCESSFULLY",
                data: allConversations,
            },
            StatusCodes.OK,
            dbTransaction
        );
    } catch (error) {
        console.log(
            "conversation.controllers.js: getAllConversations(): error: ",
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

// UPDATE CONVERSATION - Update a conversation
module.exports.updateConversation = async (req, res, next) => {
    const dbTransaction = await db.transaction();

    try {
        const { conversationId } = req.params;
        const { name } = req.body;
        const fileObj = req.file;
        const { user } = req;
        const { Conversations } = db.models;
        console.log(name);

        if (!name && !fileObj) {
            return response.error(
                req,
                res,
                { msgCode: "MISSING_REQUIRED_FILEDS_IN_REQUEST_BODY" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        const conversation = await commonService.findByCondition(
            Conversations,
            {
                id: conversationId,
            },
            [],
            true
        );
        if (!conversation) {
            return response.error(
                req,
                res,
                { msgCode: "CONVERSATION_DOES_NOT_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        // check if the conversation is a group chat or not.
        if (!conversation.isGroupChat) {
            return response.error(
                req,
                res,
                { msgCode: "CANNOT_UPDATE_ONE_ON_ONE_CONVERSATION" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        // check if the logged in user is the admin of the group or not.
        if (conversation.groupAdminId !== user.id) {
            return response.error(
                req,
                res,
                { msgCode: "PERMISSION_DENIED" },
                StatusCodes.FORBIDDEN,
                dbTransaction
            );
        }

        if (name) {
            conversation.name = name;
        }

        if (fileObj) {
            // upload the avatar to cloudinary
            const cloudinaryResponse = await cloudinaryUtils.uploadFile(
                fileObj,
                {
                    folder: "avatars",
                }
            );
            if (!cloudinaryResponse.success) {
                return response.error(
                    req,
                    res,
                    { msgCode: "ERROR_UPLOADING_AVATAR_TO_CLOUDINARY" },
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    dbTransaction
                );
            }

            conversation.avatar = cloudinaryResponse.url;
        }

        const updatedConversation =
            await commonService.saveRecord(conversation);
        if (!updatedConversation) {
            return response.error(
                req,
                res,
                { msgCode: "CONVERSATION_UPDATE_FAILED" },
                StatusCodes.INTERNAL_SERVER_ERROR,
                dbTransaction
            );
        }

        return response.success(
            req,
            res,
            {
                msgCode: "CONVERSATION_UPDATED_SUCCESSFULLY",
                data: JSON.parse(JSON.stringify(updatedConversation)),
            },
            StatusCodes.OK,
            dbTransaction
        );
    } catch (error) {
        console.log(
            "conversation.controllers.js: updateConversation(): error: ",
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

// DELETE CONVERSATION - Delete a conversation
module.exports.deleteConversation = async (req, res, next) => {
    const dbTransaction = await db.transaction();

    try {
        const { conversationId } = req.params;
        const { user } = req;
        const { Conversations, UserConversations, Messages } = db.models;

        const conversation = await commonService.findByCondition(
            Conversations,
            {
                id: conversationId,
            }
        );

        if (!conversation) {
            return response.error(
                req,
                res,
                { msgCode: "CONVERSATION_DOES_NOT_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        // check if the logged in user is the admin of the group or not.
        if (conversation.isGroupChat && conversation.groupAdminId !== user.id) {
            return response.error(
                req,
                res,
                { msgCode: "PERMISSION_DENIED" },
                StatusCodes.FORBIDDEN,
                dbTransaction
            );
        }

        // Delete data from the Conversations table
        const deletedConversation = await commonService.deleteQuery(
            Conversations,
            {
                id: conversationId,
            }
        );
        if (!deletedConversation) {
            return response.error(
                req,
                res,
                { msgCode: "CONVERSATION_DOES_NOT_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        // Delete date for UserConversations table
        const deletedUserConversations = await commonService.deleteQuery(
            UserConversations,
            {
                conversationId: conversationId,
            }
        );
        if (!deletedUserConversations) {
            return response.error(
                req,
                res,
                { msgCode: "CONVERSATION_DOES_NOT_EXISTS" },
                StatusCodes.BAD_REQUEST,
                dbTransaction
            );
        }

        // Delete date from Messages table
        await commonService.deleteQuery(Messages, {
            conversationId: conversationId,
        });

        return response.success(
            req,
            res,
            { msgCode: "CONVERSATION_DELETED_SUCCESSFULLY" },
            StatusCodes.OK,
            dbTransaction
        );
    } catch (error) {
        console.log(
            "conversation.controllers.js: deleteConversation(): error: ",
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
