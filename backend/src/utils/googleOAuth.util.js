const { google } = require("googleapis");
const environmentVariables = require("../constants/environmentVariables");

// `google.auth.OAuth2()` is used to create OAuth2 Client Instance and
//  is used to handle authetication flow,
// exchange auth code for tokens,
// store access and refresh tokens and to make authorized API calls
module.exports.oauth2Client = new google.auth.OAuth2(
    environmentVariables.GOOGLE_CLIENT_ID,
    environmentVariables.GOOGLE_CLIENT_SECRET,
    "postmessage"
);

// `google.oauth2()` This gives you access to the OAuth2 API (specifically versioned API endpoints like userinfo.get()).
// You use it after you have tokens, to fetch user profile information.
module.exports.oauth2 = (auth) => {
    return google.oauth2({
        auth: auth,
        version: "v2",
    });
};
