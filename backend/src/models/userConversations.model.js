// models/UserConversation.js

/**
 * Defines the UserConversation model.
 * This model stores the mapping of which user belongs to which conversation.
 *
 * @param {object} sequelize - The Sequelize instance. 
 * @param {object} DataTypes - The Sequelize DataTypes object.
 * @returns {object} - The UserConversation model.
 */
module.exports = (sequelize, DataTypes) => {
    const UserConversationsModel = sequelize.define(
        "UserConversations",
        {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: "Users", // 'Users' table
                    key: "id", // Foreign key reference
                },
            },

            conversationId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: "Conversations", // 'Conversations' table
                    key: "id", // Foreign key reference
                },
            },
        },
        {
            tableName: "user_conversations",
            timestamps: true,
            paranoid: true,
        }
    );

    return UserConversationsModel;
};
