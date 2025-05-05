const environmentVariables = require("../constants/environmentVariables");

module.exports = {
    development: {
        username: environmentVariables.DB_USER_NAME,
        password: environmentVariables.DB_USER_PASSWORD,
        database: environmentVariables.DB_NAME,
        host: environmentVariables.DB_HOST,
        dialect: "postgres",
        port: environmentVariables.DB_PORT,
    },
    production: {
        username: environmentVariables.DB_USER_NAME,
        password: environmentVariables.DB_USER_PASSWORD,
        database: environmentVariables.DB_NAME,
        host: environmentVariables.DB_HOST,
        dialect: "postgres",
        port: environmentVariables.DB_PORT,
    },
};
