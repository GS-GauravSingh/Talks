const express = require("express");
const authControllers = require("../../controllers/auth.controllers");
const { requestValidator } = require("../../middlewares/requestValidator.middleware");
const authValidation = require("../../validations/auth.validation");

const router = express.Router();

// ------------------- Authentication Routes -----------------------
router.post("/signup", requestValidator(authValidation.signup), authControllers.register, authControllers.sendOTP);
router.post("/verify-otp", requestValidator(authValidation.verifyOTP), authControllers.verifyOTP);
router.post("/resend-otp", requestValidator(authValidation.resendOTP), authControllers.resendOTP);
router.post("/login", requestValidator(authValidation.login), authControllers.login);
router.post("/logout", authControllers.logout);
router.delete("/delete-account", requestValidator(authValidation.deleteAccount), authControllers.deleteAccount);


module.exports = router;