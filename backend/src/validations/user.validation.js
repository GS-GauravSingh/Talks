const Joi = require("joi");

module.exports = {
    updateMe: Joi.object({
        bio: Joi.string().required(),
        jobTitle: Joi.string().required(),
        country: Joi.string().required(),
    }),

    updatePassword: Joi.object({
        currentPassword: Joi.string().min(6).required(),
        newPassword: Joi.string().min(6).required(),
    }),
};
