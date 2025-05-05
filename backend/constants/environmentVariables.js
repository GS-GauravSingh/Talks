const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

const environmentVariables = {
    PORT: process.env.PORT || "8000",
    allowedOrigin: process.env.frontendURL || "*",
    DB_USER_NAME: process.env.DB_USER_NAME,
    DB_USER_PASSWORD: process.env.DB_USER_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    NODE_ENV: process.env.NODE_ENV || "development"
};

module.exports = environmentVariables;
