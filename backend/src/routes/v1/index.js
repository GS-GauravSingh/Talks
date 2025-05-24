const express = require("express");
const authControllers = require("../../controllers/auth.controllers");
const userControllers = require("../../controllers/user.controllers");
const conversationControllers = require("../../controllers/conversation.controllers");
const messageControllers = require("../../controllers/message.controllers");
const { requestValidator } = require("../../middlewares/requestValidator.middleware");
const authValidation = require("../../validations/auth.validation");
const userValidation = require("../../validations/user.validation");
const conversationValidation = require("../../validations/conversation.validation");
const messageValidation = require("../../validations/message.validation");
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
router.get("/users", verifyAuthJwtToken, userControllers.getAllUsers);
router.patch("/user/me", verifyAuthJwtToken, requestValidator(userValidation.updateMe), userControllers.updateMe); // updated details like bio, jobTitle, and country.
router.patch("/user/avatar", verifyAuthJwtToken, multerService.upload.single("file"), userControllers.updateAvatar); // updated details like bio, jobTitle, and country.
router.patch("/user/password", verifyAuthJwtToken, requestValidator(userValidation.updatePassword), userControllers.updatePassword); 

// ------------------- Protected - Conversation Routes -----------------------
router.post("/conversation", verifyAuthJwtToken, requestValidator(conversationValidation.createConversation), conversationControllers.createConversation);
router.get("/conversation/:conversationId", verifyAuthJwtToken, conversationControllers.getConversation);
router.get("/conversations", verifyAuthJwtToken, conversationControllers.getAllConversations);
router.patch("/conversation/:conversationId", verifyAuthJwtToken, requestValidator(conversationValidation.updateConversation), multerService.upload.single("file"), conversationControllers.updateConversation);
router.delete("/conversation/:conversationId", verifyAuthJwtToken, conversationControllers.deleteConversation);

// ------------------- Protected - Messages Routes ---------------------------
router.post("/message/:conversationId", verifyAuthJwtToken, multerService.upload.single("file"), requestValidator(messageValidation.sendMessage), messageControllers.sendMessage);
router.get("/message/:conversationId", verifyAuthJwtToken, messageControllers.getMessageHistory);
router.delete("/message/:messageId", verifyAuthJwtToken, messageControllers.deleteMessage);

module.exports = router;