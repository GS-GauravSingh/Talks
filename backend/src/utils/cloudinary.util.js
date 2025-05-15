const cloudinary = require("../services/cloudinary.service");

module.exports.uploadFile = async (file, options = {}) => {
    try {
        const base64FileString = Buffer.from(file.buffer).toString("base64"); // This converts the binary buffer to a base64-encoded string.
        let dataURI = "data:" + file.mimetype + ";base64," + base64FileString;

        const defaultOptions = {
            folder: "uploads",
            resource_type: "auto", // auto-detects the file type like png, jpg, audio, video, etc.
        };

        const uploadOptions = { ...defaultOptions, ...options };

        const result = await cloudinary.uploader.upload(dataURI, uploadOptions);
        // console.log("cloudinary.util.js: uploadFile(): result: ", result);

        return {
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height,
            resourceType: result.resource_type,
            originalFilename: result.original_filename,
            fullResult: result,
        };
    } catch (error) {
        console.error("cloudinary.util.js: uploadFile(): error: ", error);
        return {
            success: false,
            error: error.message,
        };
    }
};
