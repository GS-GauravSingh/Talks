const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const environmentVariables = require("../constants/environmentVariables");
const { error } = require("console");
const config = require("../config/config")[environmentVariables.NODE_ENV];


// Sequelize instance.
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        dialect: config.dialect,
        host: config.host,
        port: config.port,
    }
);

const db = {};
fs.readdirSync(__dirname)
    .filter(
        (file) =>
            file.indexOf(".") !== 0 && // skips hidden files like .DS_Store or .env
            file !== path.basename(__filename) && // skips the current JS file itself
            file.slice(-3) === ".js" // only processes files ending with '.js'
    )
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    });

// Check database connection
sequelize
    .authenticate()
    .then(() => {
        console.log("Database connected successfully!");
    })
    .catch((error) => {
        console.log("Database connection error: ", error.message);
    });

// sync all models
sequelize
    .sync({ force: false, alter: true, logging: false })
    .then(() => {
        console.log("All models synced successfully!");
    })
    .catch(() => {
        console.error("Error while syncing models: ", error);
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.DataTypes = DataTypes;

module.exports = db;
