/**
 * Defines the Message model.
 * Each message represents a chat message sent by a user within a conversation.
 * A message can include plain text, an image URL, or both.
 *
 * Relationships:
 * Message is sent by a user (senderId) in a conversation (conversationId)
 *
 * @param {object} sequelize - The Sequelize instance
 * @param {object} DataTypes - Sequelize data types
 * @returns {object} - The Message model
 */

module.exports = (sequelize, DataTypes) => {
    const MessageModel = sequelize.define(
        "Messages",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },

            senderId: {
                type: DataTypes.UUID,
                allowNull: false,
            },

            conversationId: {
                type: DataTypes.UUID,
                allowNull: false, 
            },

            message: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            image: {
                type: DataTypes.STRING, // cloudinary URL
                allowNull: true,
            },
        },
        {
            tableName: "messages",
            timestamps: true,
            indexes: [{ fields: ["senderId"] }, { fields: ["conversationId"] }],
            paranoid: true,
        }
    );

    // Associations
    MessageModel.associate = function (models) {
        // a message is sent by a user.
        // one-to-many relationship between users and messages.
        MessageModel.belongsTo(models.Users, {
            foreignKey: "senderId", // references the `senderId` column in the `Messages` table.
        });

        // a message is sent in a conversation.
        // one-to-many relationship between conversations and messages.
        MessageModel.belongsTo(models.Conversations, {
            foreignKey: "conversationId", // references the `conversationId` column in the `Messages` table.
        });
    };

    return MessageModel;
};
