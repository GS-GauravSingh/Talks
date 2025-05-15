const express = require("express");
const authControllers = require("../../controllers/auth.controllers");
const userControllers = require("../../controllers/user.controllers");
const { requestValidator } = require("../../middlewares/requestValidator.middleware");
const authValidation = require("../../validations/auth.validation");
const { verifyAuthJwtToken } = require("../../middlewares/verifyAuthToken.middleware");
const multerService = require("../../services/multer.service");

const router = express.Router();

// ------------------- Authentication Routes -----------------------
router.post("/auth/signup", requestValidator(authValidation.signup), authControllers.register, authControllers.sendOTP);
router.post("/auth/verify-otp", requestValidator(authValidation.verifyOTP), authControllers.verifyOTP);
router.post("/auth/resend-otp", requestValidator(authValidation.resendOTP), authControllers.resendOTP);
router.post("/auth/login", requestValidator(authValidation.login), authControllers.login);
router.post("/auth/logout", authControllers.logout);
router.delete("/auth/delete-account", requestValidator(authValidation.deleteAccount), authControllers.deleteAccount);

// ------------------- Protected - User Routes -----------------------
router.get("/user/me", verifyAuthJwtToken, userControllers.getMe);
router.patch("/user/me", verifyAuthJwtToken, userControllers.updateMe); // updated details like bio, jobTitle, and country.
router.patch("/user/avatar", verifyAuthJwtToken, multerService.upload.single("file"), userControllers.updateAvatar); // updated details like bio, jobTitle, and country.
router.patch("/user/password", verifyAuthJwtToken, userControllers.updatePassword); 

module.exports = router;