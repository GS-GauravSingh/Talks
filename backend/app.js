require("./src/models"); // this will trigger database connection logic
const express = require("express");
const hpp = require("hpp");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const environmentVariables = require("./src/constants/environmentVariables");
const cookieParser = require("cookie-parser");
const errorHandler = require("./src/middlewares/errorHandler.middleware");

// Express `app` initialization.
const app = express();

// Setting up middlewares
app.use(
    cors({
        origin: environmentVariables.allowedOrigin,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true /* this allows cookies to be sent along with the HTTP requests and response */,
    })
);
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(hpp());
app.use(helmet());
app.use(morgan("dev"));

// App Routes
app.get("/", (req, res) => {
    return res.send("Hello from server!");
});
app.use("/api", require("./src/routes"));

// Error Handler Middleware
app.use(errorHandler.invalidRoute);

module.exports = app;
