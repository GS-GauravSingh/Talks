const environmentVariables = require("./src/constants/environmentVariables");
const {
    verifySocketJwtToken,
} = require("./src/middlewares/verifyAuthToken.middleware");
const socketHandlers = require("./src/socketHandlers/socketHandlers");

let io = null;

function registerSocketServer(httpServer) {
    // `io` stands for input/output, here we are initializing a new socket server, also it attaches the existing HTTP server with the socket server so that socket server will work along with existing HTTP server.
    // This allows real-time communication using WebSockets alongside regular HTTP requests on the same existing HTTP server.
    io = require("socket.io")(httpServer, {
        cors: {
            origin: function (origin, callback) {
                if (
                    !origin ||
                    environmentVariables.allowedOrigin.includes(origin)
                ) {
                    callback(null, true);
                } else {
                    callback(new Error("Origin not allowed by CORS"));
                }
            },
            methods: ["GET", "POST"],
            credentials: true /* allow cookies */,
        },
    });

    // Socket.io allows us to add middleware, just like Express.
    // Here, I'm adding a middleware just to check whether a user is authenticated or not.
    io.use((socket, next) => {
        // socket: In web sockets, we refer client as a socket, and this socket represents the individual client connection. It's an object that contains details about the client like `socket.id` (it a unique id assigned to each new connection) and other details.
        // next: is used to call next middleware.
        verifySocketJwtToken(socket, next);
    });

    // we can call a middleware like this also, socket and next automatically gets passed
    // io.use(verifySocketJwtToken);

    // if we reach at this point, it means client is authenticated. Now establish a new connection.
    const onlineUsers = {}; // global object to store online users.

    // `.on()` is used to listen for incoming events.
    // Here, the event is `"connection"`, which means a new client is connecting.
    // When a client connects, `.on("connection")` receives the `socket` object in the callback.
    // The `socket` object represents the connected client and contains details like `socket.id`.
    io.on("connection", (socket) => {
        console.log(`A new user is connected with socket id: ${socket.id}`);

        // Once a new client/user/socket is connected,
        // we can define multiple socket event handlers here to handle various events.

        // New Connection Handler - When a new connection happens.
        socketHandlers.newConnectionHandler({ socket, onlineUsers });

        socket.on("joinConversation", (data) => {
            socketHandlers.joinConversation({ data, socket });
        });

        // Disconnect Handler - Whenever someone disconnect from the server.

        // `connection` and `disconnect` are standard built-in events in Socket.IO.
        // They fire automatically when:
        // A new client connects → "connection" event triggers.
        // A client disconnects (e.g., closes tab, loses internet, or leaves) → "disconnect" event triggers.

        // Listening for the "disconnect" event (fires automatically when a user disconnects)
        socket.on("disconnect", () => {
            socketHandlers.disconnectHandler({ socket, onlineUsers });
        });
    });

    // Emit online users every 10 seconds to all connected clients.
    setInterval(() => {
        io.emit("getOnlineUsers", {
            onlineUsers: Object.keys(onlineUsers),
        });
    }, 10000);
}

function getIo() {
    if (!io) {
        return null;
    }
    return io;
}

module.exports = { registerSocketServer, getIo };
