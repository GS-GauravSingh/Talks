const multer = require("multer");
const environmentVariables = require("../constants/environmentVariables");

const MAX_FILE_SIZE = environmentVariables.MAX_FILE_SIZE * 1024 * 1024; // convert MB to Bytes

// configure storage for multer
// multer.memoryStorge() - when you use multer.memoryStorage(), the uploaded file is stored in memory (RAM) as a Buffer. `req.file.buffer` contains the raw binary data of the uploaded file.
const storage = new multer.memoryStorage();

// Define file type filter
const fileFilter = function (req, file, cb) {
    console.log("multer.util.js: fileFilter(): file: ", file);
    // Define accepted mime types and corresponding file extensions
    const acceptedTypes = [
        "image/jpeg", // JPEG
        "image/png", // PNG
        "image/jpg", // JPG
    ];

    // Check if the uploaded file's MIME type is in the accepted types array
    if (acceptedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept file
    } else {
        cb(
            new Error(
                "Invalid file type, only JPEG, PNG, and JPG, files are allowed."
            ),
            false
        ); // Reject file
    }
};

// Initialize multer instance with storage and file type filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE, // Use the converted file size in bytes
    },
});

module.exports = { upload };
