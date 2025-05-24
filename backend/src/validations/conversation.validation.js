const Joi = require("joi");

module.exports = {
    createConversation: Joi.object({
        userIds: Joi.array().items(Joi.string()).min(1).required(),
        name: Joi.string().optional(),
        isGroupChat: Joi.boolean().optional(),
    }),

    updateConversation: Joi.object({
        name: Joi.string().optional(),
        file: Joi.object().optional(),
    }),
};
