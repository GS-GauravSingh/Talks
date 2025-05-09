const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
    const UserModel = sequelize.define(
        "Users",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            firstname: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            lastname: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            passwordChangedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },

            avatar: {
                type: DataTypes.STRING /* cloudinary URL */,
                defaultValue: null,
                allowNull: true,
            },

            bio: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            jobTitle: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            country: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            otp: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            otpExpiryTime: {
                type: DataTypes.DATE,
                allowNull: true,
            },

            isVerified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: true,
            },
        },
        {
            tableName: "users",
            timestamps: true,
            indexes: [
                {
                    unique: true,
                    fields: ["email"],
                },
            ],
        }
    );

    // Custom Hooks
    // `beforeCreate` hook is called just before a new record is inserted nto the database via `.create()`.
    UserModel.addHook("beforeCreate", async (user, options) => {
        // `user`: `user` is the actual instance being created or updated (an object representing a row in the table).
        // `options`: `options` is an object that holds metadata or extra configuration related to the Sequelize operation (like .create(), .update(), etc.).
        if (user.password) {
            const hashedPassword = await bcrypt.hash(user.password, 12);
            user.password = hashedPassword;
        }
    });

    // `beforeUpdate` hook is called when you update an existing record.
    // Only triggers if .save() or .update() is called on an existing record
    UserModel.addHook("beforeUpdate", async (user, options) => {
        if (user.changed("password")) {
            const hashedPassword = await bcrypt.hash(user.password, 12);
            user.password = hashedPassword;
        }

        if (user.changed("otp")) {
            const hashedOTP = await bcrypt.hash(user.otp, 12);
            user.otp = hashedOTP;
        }
    });

    // Custom Instance Methods
    // Instance method to compare the password provided by the user.
    UserModel.prototype.comparePassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    };

    // Instance method to compare the otp provided by the user during the registration phase.
    UserModel.prototype.compareOTP = async function (enteredOTP) {
        return await bcrypt.compare(enteredOTP, this.otp);
    };

    // Instance methods to verify Json Web Token.
    UserModel.prototype.isTokenValidAfterPasswordChanged = function (
        jwtTimestamp
    ) {
        // If the user has changed their password after the token was issued. Then `this.passwordChangedAt` is not `undefined` it must contain a date object.
        if (this.passwordChangedAt) {
            // JWT timestamps (iat - issued at) are in seconds.
            // Convert JWT timestamp to milliseconds and compare
            return jwtTimestamp * 1000 > this.passwordChangedAt.getTime();
        }

        // if passwordChangedAt is undefined (i.e., the password was never changed after token issuance).
        return true;
    };

    return UserModel;
};
