const response = require("../response");
const { StatusCodes } = require("http-status-codes");

module.exports.methodNotAllowed = (req, res) => {
    return response.error(
        req,
        res,
        { msgCode: "INVALID_ROUTE" },
        StatusCodes.METHOD_NOT_ALLOWED
    );
};
