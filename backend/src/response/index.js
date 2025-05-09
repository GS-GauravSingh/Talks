const fs = require("fs");
const path = require("path");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

const lngMsg = {};
fs.readdirSync(path.join(__dirname, "lng"))
    .filter(
        (file) =>
            file.indexOf(".") !== 0 && // skips hidden files like .DS_Store or .env
            file !== path.basename(__filename) && // skips the current JS file itself (unnecessary here, but safe)
            file.slice(-5) === ".json" // only processes files ending with '.json'
    )
    .forEach((file) => {
        const filename = file.slice(0, -5);
        lngMsg[filename] = require(path.join(__dirname, "lng", file));
    });

/**
 * Extracting the user's preferred language from Accept-Language header.
 * @param {string} acceptLanguageHeader - The raw Accept-Language header from the request
 * @returns {string} - The best matching language code (e.g., 'en', 'hi'), or default 'en'.
 */
function getUserPreferredLanguage(acceptLanguageHeader) {
    // Step 1: Get the list of supported languages from the `lngMsg` object.
    const supportedLanguages = Object.keys(lngMsg);

    // Check if acceptLanguageHeader exists before trying to split it
    if (!acceptLanguageHeader) {
        return "en"; // Return default language if header is missing
    }

    // Step 2: Now, we have to parse the Accept-Language header, it gives us the string like this: "en-GB,en-US;q=0.9,en;q=0.8"
    const languages = acceptLanguageHeader
        ?.split(",") /* Example: ['en-GB', 'en-US;q=0.9', 'en;q=0.8'] */
        ?.map((lang) =>
            lang.split(";")[0].trim().toLowerCase()
        ); /* ['en-gb', 'en-us', 'en'] */

    // Step 3: Iterate through the languages and find the best match.
    for (const lang of languages) {
        // Extract the base language (E.g., "en" from "en-us")
        const baseLanguage = lang.split("-")[0];

        // Match the full language code (E.g., "en-us")
        if (supportedLanguages.includes(lang)) {
            return lang;
        }

        // Match the base language (E.g., "en")
        if (supportedLanguages.includes(baseLanguage)) {
            return baseLanguage;
        }
    }

    // Step 4: if nothing matches, return the defualt language code i.e., "en"
    return "en";
}

module.exports.success = async function (
    req,
    res,
    result,
    httpStatusCode,
    dbTransaction
) {
    const lng = getUserPreferredLanguage(req.headers["accept-language"]); // get the user's preferred language

    try {
        const responseObj = {
            status: "success",
            statusCode: httpStatusCode,
            message:
                (lngMsg[lng]
                    ? lngMsg[lng][result.msgCode]
                    : lngMsg["en"][result.msgCode]) ||
                getReasonPhrase[httpStatusCode],
            result: result?.data ? result?.data : "",
            time: Date.now(),
        };

        if (dbTransaction !== undefined) {
            await dbTransaction.commit();
        }

        return res.status(httpStatusCode).json(responseObj);
    } catch (error) {
        console.log("index.js (/backend/response): success(): error: ", error);

        if (dbTransaction !== undefined) {
            await dbTransaction.rollback();
        }

        return res.status(500).json({
            status: "error",
            statusCode: 500,
            message: lngMsg[lng]
                ? lngMsg[lng]["INTERNAL_SERVER_ERROR"]
                : lngMsg["en"]["INTERNAL_SERVER_ERROR"],
            result: "",
            time: Date.now(),
        });
    }
};

module.exports.error = async function (
    req,
    res,
    error,
    httpStatusCode,
    dbTransaction
) {
    const lng = getUserPreferredLanguage(req.headers["accept-language"]); // get the user's preferred language

    try {
        const responseObj = {
            status: "error",
            statusCode: httpStatusCode,
            message:
                (lngMsg[lng]
                    ? lngMsg[lng][error.msgCode]
                    : lngMsg["en"][error.msgCode]) ||
                getReasonPhrase[httpStatusCode],
            result: error?.data ? error?.data : "",
            time: Date.now(),
        };

        if (dbTransaction !== undefined) {
            await dbTransaction.rollback();
        }

        return res.status(httpStatusCode).json(responseObj);
    } catch (error) {
        console.log("index.js (/backend/response): error(): error: ", error);

        if (dbTransaction !== undefined) {
            await dbTransaction.rollback();
        }

        return res.status(500).json({
            status: "error",
            statusCode: 500,
            message: lngMsg[lng]
                ? lngMsg[lng]["INTERNAL_SERVER_ERROR"]
                : lngMsg["en"]["INTERNAL_SERVER_ERROR"],
            result: "",
            time: Date.now(),
        });
    }
};
