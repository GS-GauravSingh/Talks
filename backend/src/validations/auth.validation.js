const Joi = require("joi");

module.exports = {
    signup: Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().allow(null, ""),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
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
};
