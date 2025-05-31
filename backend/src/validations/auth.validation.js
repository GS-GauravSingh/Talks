const Joi = require("joi");

module.exports = {
    signup: Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().allow(null, ""),
        email: Joi.string().email().required(),
        password: Joi.string()
            .min(8)
            .pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
            .message(
                "Password must be at least 8 characters, including a number, a lowercase letter, and an uppercase letter"
            )
            .required(),
    }),

    verifyOTP: Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.string().min(6).max(6).required(),
    }),

    resendOTP: Joi.object({
        email: Joi.string().email().required(),
    }),

    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }),

    deleteAccount: Joi.object({
        userId: Joi.string().required(),
    }),
};
