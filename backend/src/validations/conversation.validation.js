const Joi = require("joi");

module.exports = {
    createConversation: Joi.object({
        userId: Joi.string().required(),
    }),

    updateConversation: Joi.object({
        name: Joi.string().optional(),
        file: Joi.object().optional(),
    }),
};
