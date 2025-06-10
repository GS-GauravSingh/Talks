class SocketError extends Error {
    constructor(error, statusCode, data) {
        // get the user preferred language
        const lng = socket.handshake.auth?.language || "en";
        const message = lngMsg[lng]
            ? lngMsg[lng][error.msgCode]
            : lngMsg["en"]["INTERNAL_SERVER_ERROR"];
        super(message);
        this.statusCode = statusCode || 500;
        this.data = data || "Something went wrong!!";
        Error.captureStackTrace(this, this.constructor);
    }
};