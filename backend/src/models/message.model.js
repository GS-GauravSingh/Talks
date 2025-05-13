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
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            senderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            conversationId: {
                type: DataTypes.INTEGER,
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
            indexes: [{ fields: ["senderId"] }],
            paranoid: true,
        }
    );

    // Define a custom static method.
    MessageModel.associate = (models) => {
        // Define the association between Message and User models.
        // A message is sent by a user.
        MessageModel.belongsTo(models.Users, {
            foreignKey: "senderId",
        });
        
        // Define the association between Message and Conversation models.
        // A message is sent in a conversation.
        MessageModel.belongsTo(models.Conversations, {
            foreignKey: "conversationId",
        });
    }

    return MessageModel;
};
