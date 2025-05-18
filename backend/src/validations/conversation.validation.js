const Joi = require("joi");

module.exports = {
    createConversation: Joi.object({
        userIds: Joi.array().items(Joi.number()).min(1).required(),
        name: Joi.string().allow(null, ""),
    }),

    updateConversation: Joi.object({
        name: Joi.string().optional(),
        file: Joi.object().optional(),
    }),
};
