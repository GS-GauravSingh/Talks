const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, "../../.env")
});

const environmentVariables = {
    PORT: process.env.PORT || "8000",
    frontendBaseUrl: process.env.FRONTEND_URL || "http://localhost:5173",
    DB_USER_NAME: process.env.DB_USER_NAME,
    DB_USER_PASSWORD: process.env.DB_USER_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    NODE_ENV: process.env.NODE_ENV || "development",
    NODEMAILER_USERNAME: process.env.NODEMAILER_USERNAME,
    NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || 1, // in MB
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

};

module.exports = environmentVariables;
