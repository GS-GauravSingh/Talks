/**
 * Each user belongs to one or more conversations. There is a one-to-many relationship between users and conversations.
 * And this Conversatiion model stores information about each conversation like last message, is it a group chat, and name of the conversation (if it's a group chat).
 *
 * @param {object} sequelize - The Sequelize instance. 
 * @param {object} DataTypes - The Sequelize DataTypes object.
 * @returns {object} - The Conversation model.
 */

module.exports = (sequelize, DataTypes) => {
    const ConversationModel = sequelize.define(
        "Conversations",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            lastMessage: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            isGroupChat: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

            name: {
                type: DataTypes.STRING,
                allowNull: true, // optional — used only for group chats
            },
        },
        {
            tableName: "conversations",
            timestamps: true,
            paranoid: true,
        }
    );

    // Define a custom static method.
    ConversationModel.associate = (models) => {
        // Define the association between Conversation and User models.
        // A conversation can have many users.
        ConversationModel.belongsToMany(models.Users, {
            through: "UserConversations",
            foreignKey: "conversationId",
        });
        
        // Define the association between Conversation and Message models.
        // A conversation can have many messages.
        ConversationModel.hasMany(models.Messages, {
            foreignKey: "conversationId",
        });
        
    }

    return ConversationModel;
};
