const response = require("../response");
const { StatusCodes } = require("http-status-codes");

module.exports.invalidRoute = (req, res) => {
    return response.error(
        req,
        res,
        { msgCode: "INVALID_ROUTE" },
        StatusCodes.NOT_FOUND
    );
};

module.exports.globalErrorHandler = (error, req, res) => {
    return response.error(
        req,
        res,
        { msgCode: error.msgCode, data: error.data },
        error.statusCode,
        error.dbTransaction
    );
};
