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

            name: {
                type: DataTypes.STRING,
                allowNull: true, // only used for group chats
            },

            isGroupChat: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

            latestMessageId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },

            groupAdminId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },

            avatar: {
                type: DataTypes.STRING, // cloudinary URL
                defaultValue:
                    "https://res.cloudinary.com/df7wvngsb/image/upload/v1747307232/group-chat_i9valz.png",
                allowNull: false, // optional - used only for group chats
            },
        },
        {
            tableName: "conversations",
            timestamps: true,
            paranoid: true,
        }
    );

    // Associations
    ConversationModel.associate = function (models) {
        // a conversation can have many users.
        // many-to-many relationship between conversations and users.
        ConversationModel.belongsToMany(models.Users, {
            through: models.UserConversations,
            foreignKey: "conversationId",
        });

        // a conversation can have many messages.
        // one-to-many relationship between conversations and messages.
        ConversationModel.hasMany(models.Messages, {
            foreignKey: "conversationId", // references the `conversationId` column in the `Messages` table.
        });

        
    };

    return ConversationModel;
};
