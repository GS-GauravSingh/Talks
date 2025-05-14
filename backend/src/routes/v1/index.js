const express = require("express");
const authControllers = require("../../controllers/auth.controllers");
const { requestValidator } = require("../../middlewares/requestValidator.middleware");
const authValidation = require("../../validations/auth.validation");

const router = express.Router();

// ------------------- Authentication Routes -----------------------
router.post("/auth/signup", requestValidator(authValidation.signup), authControllers.register, authControllers.sendOTP);
router.post("/auth/verify-otp", requestValidator(authValidation.verifyOTP), authControllers.verifyOTP);
router.post("/auth/resend-otp", requestValidator(authValidation.resendOTP), authControllers.resendOTP);
router.post("/auth/login", requestValidator(authValidation.login), authControllers.login);
router.post("/auth/logout", authControllers.logout);
router.delete("/auth/delete-account", requestValidator(authValidation.deleteAccount), authControllers.deleteAccount);


module.exports = router;