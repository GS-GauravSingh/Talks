const { v2: cloudinary } = require("cloudinary");
const environmentVariables = require("../constants/environmentVariables");

cloudinary.config({
    cloud_name: environmentVariables.CLOUDINARY_CLOUD_NAME,
    api_key: environmentVariables.CLOUDINARY_API_KEY,
    api_secret: environmentVariables.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
