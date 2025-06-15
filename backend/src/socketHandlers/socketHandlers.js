const commonService = require("../services/common.service");
const db = require("../models").sequelize;


module.exports.newConnectionHandler = async ({ socket, onlineUsers }) => {
    // `io` is the socket.io server instance.
    // `socket` represent an individual connected client.

    const dbTransaction = await db.transaction();

    try {
        const { user } = socket;
        console.log(`User with socket Id: ${socket.id} connected`);

        // update the user - store the socket id and update its status to online
        user.socketId = socket.id;
        user.status = "ONLINE";

        // save the changes
        const updatedUser = await commonService.saveRecord(
            user,
            false,
            dbTransaction
        );
        if (!updatedUser) {
            console.error("Failed to update user status to ONLINE.");
            await dbTransaction.rollback();
            throw new Error("Failed to update user status to ONLINE.");
        }

        // add this user to onlineUsers object.
        onlineUsers[updatedUser.id] = socket.id;

        // commit the transaction
        await dbTransaction.commit();

        // Broadcast to everyone that the new user is connected.
        // `broadcast` is used to send an event to all connected clients except the sender.
        // `emit` is used to send an event to a specific client or group of clients.
        socket.broadcast.emit("userOnline", {
            message: `${user.firstname} ${user.lastname} is online.`,
            user: updatedUser,
        });
    } catch (error) {
        console.error(
            "socketHandlers: newConnectionHandler(): error: ",
            error.message
        );

        // in case of error, rollback the transaction.
        await dbTransaction.rollback();

        // Optional: Send a custom error back to this client
        socket.emit("error", {
            status: "error",
            message: error.message,
        });
    }
};

module.exports.disconnectHandler = async ({ socket, onlineUsers }) => {
    // `io` is the socket.io server instance.
    // `socket` represent an individual connected client.

    const dbTransaction = await db.transaction();

    try {
        const { user } = socket;
        console.log(`User with socket Id: ${socket.id} disconnected`);

        // update the user - store the socket id and update its status to online
        user.socketId = null;
        user.status = "OFFLINE";

        // save the changes
        const updatedUser = await commonService.saveRecord(
            user,
            false,
            dbTransaction
        );
        if (!updatedUser) {
            console.error("Failed to update user status to OFFLINE.");
            await dbTransaction.rollback();
            throw new Error("Failed to update user status to OFFLINE.");
        }
        // remove the user from onlineUsers object.
        // `onlineUsers` is an object that keeps track of all online users by their ID

        if (onlineUsers[updatedUser.id]) {
            // delete the user from onlineUsers object.
            delete onlineUsers[updatedUser.id];
        }

        // commit the transaction
        await dbTransaction.commit();

        // Broadcast to everyone that the user is disconnected.
        // `broadcast` is used to send an event to all connected clients except the sender.
        // `emit` is used to send an event to a specific client or group of clients.
        socket.broadcast.emit("userOffline", {
            message: `${user.firstname} ${user.lastname} is offline.`,
            user: updatedUser,
        });
    } catch (error) {
        console.error("socketHandlers: disconnectHandler(): error: ", error);

        // in case of error, rollback the transaction.
        await dbTransaction.rollback();

        // Optional: Send a custom error back to this client
        socket.emit("error", {
            status: "error",
            message: error.message,
        });
    }
};

module.exports.joinConversation = ({ data, socket }) => {
    const { conversationId } = data;
    console.log(`User joined conversation ID: ${conversationId}`);

    // "socket.join()" lets a client join a room, so events can be emitted to that room and only the clients within it will receive those events—useful for features like private chats or group conversations.
    socket.join(conversationId);
};

module.exports.sendMessageToConversation = ({ message, io }) => {
    console.log(
        `Sending new message in a conversation with ID: ${message.conversationId}`
    );

    // "io.to() allows emitting an event to a specific room or a specific client (socket) if you provide the room name or the socket ID
    io.to(message.conversationId).emit("newMessage", {
        message: message,
    });
};
