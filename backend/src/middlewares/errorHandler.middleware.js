const response = require("../response");
const { StatusCodes } = require("http-status-codes");

module.exports.invalidRoute = (req, res) => {
    console.log("errorHandler.middleware.js: invalidRoute(): error: invalid route");
    return response.error(
        req,
        res,
        { msgCode: "INVALID_ROUTE" },
        StatusCodes.NOT_FOUND
    );
};

module.exports.globalErrorHandler = (error, req, res) => {
    console.log("errorHandler.middleware.js: globalErrorHandler(): error: ", error.data);
    return response.error(
        req,
        res,
        { msgCode: error.msgCode, data: error.data },
        error.statusCode,
        error.dbTransaction
    );
};
