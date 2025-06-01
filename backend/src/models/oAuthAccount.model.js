module.exports = (sequelize, DataTypes) => {
    const OAuthAccountModel = sequelize.define(
        "OAuthAccounts",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },

            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },

            provider: {
                type: DataTypes.ENUM("GOOGLE", "GITHUB"),
                allowNull: false,
            },

            provider_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "oauth_accounts",
            timestamps: true,
            paranoid: true,
        }
    );

    OAuthAccountModel.associate = (models) => {
        OAuthAccountModel.belongsTo(models.Users, {
            foreignKey: "user_id",
            onDelete: "CASCADE",
        });
    };

    return OAuthAccountModel;
};
