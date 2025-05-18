/**
 * This model is used to store which user is part of which conversation.
 *
 * @params {object} sequelize - The Sequelize instance.
 * @params {object} DataTypes - The Sequelize DataTypes object.
 * @returns {object} - The UserConversation model.
 */

module.exports = (sequelize, DataTypes) => {
    const UserConversationModel = sequelize.define(
        "UserConversations",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            conversationId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "user_conversations",
            timestamps: true,
            indexes: [{ fields: ["userId"] }, { fields: ["conversationId"] }],
            paranoid: true,
        }
    );

    return UserConversationModel;
};
