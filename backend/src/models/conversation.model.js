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
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },

            participants: {
                type: DataTypes.ARRAY(DataTypes.UUID),
                allowNull: false,
            },

            isGroupChat: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },

            groupName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: "conversations",
            timestamps: true,
            paranoid: true,
            indexes: [
                { fields: ["participants"] },
            ],
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
