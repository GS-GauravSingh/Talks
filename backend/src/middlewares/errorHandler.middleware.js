const response = require("../response");
const { StatusCodes } = require("http-status-codes");

module.exports.methodNotAllowed = (req, res) => {
    return response.error(
        req,
        res,
        { msgCode: "VALID_ROUTE_BUT_INVALID_METHOD" },
        StatusCodes.METHOD_NOT_ALLOWED
    );
};

module.exports.invalidRoute = (req, res) => {
    return response.error(
        req,
        res,
        { msgCode: "INVALID_ROUTE" },
        StatusCodes.NOT_FOUND
    );
};
