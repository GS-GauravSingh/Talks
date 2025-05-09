const { StatusCodes } = require("http-status-codes");
const response = require("../response");

const requestValidator = (schema, source = "body") => {
    return async (req, res, next) => {
        try {
            const data = req[source];
            if(!data){
                return response.error(
                    req,
                    res,
                    { msgCode: "MISSING_REQUIRED_FILEDS_IN_REQUEST_BODY" },
                    StatusCodes.BAD_REQUEST
                );
            }

            const { error } = await schema.validate(data);
            if (error == null) {
                return next();
            } else {
                const { details } = error;
                const message = details.map((i) => i.message).join(",");
                return response.error(
                    req,
                    res,
                    { msgCode: "VALIDATION_ERROR", data: message },
                    StatusCodes.BAD_REQUEST
                );
            }
        } catch (error) {
            console.log(
                "requestValidator.js: requestValidator(): error: ",
                error
            );
            return response.error(
                req,
                res,
                { msgCode: "VALIDATION_ERROR", data: error.message },
                StatusCodes.BAD_REQUEST
            );
        }
    };
};

module.exports = { requestValidator };
