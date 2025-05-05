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

            receiverId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            message: {
                type: DataTypes.STRING,
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
            indexes: [
                { fields: ["senderId"] },
                { fields: ["receiverId"] },
                { fields: ["senderId", "receiverId"] },
            ],
        }
    );

    return MessageModel;
};
