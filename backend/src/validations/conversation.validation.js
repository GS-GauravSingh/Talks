const Joi = require("joi");

module.exports = {
    createConversation: Joi.object({
        userIds: Joi.array().items(Joi.string()).min(1).required(),
        name: Joi.string().optional(), // Optional: name for group chats/conversations
    }),

    updateConversation: Joi.object({
        name: Joi.string().optional(),
        file: Joi.object().optional(),
    }),
};
