const Joi = require("joi");

module.exports = {
    updateMe: Joi.object({
        bio: Joi.string().required(),
        jobTitle: Joi.string().required(),
        country: Joi.string().required(),
    }),

    updatePassword: Joi.object({
        currentPassword: Joi.string()
            .min(8)
            .pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
            .message(
                "Password must be at least 8 characters, including a number, a lowercase letter, and an uppercase letter"
            )
            .required(),
        newPassword: Joi.string()
            .min(8)
            .pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
            .message(
                "Password must be at least 8 characters, including a number, a lowercase letter, and an uppercase letter"
            )
            .required(),
    }),
};
