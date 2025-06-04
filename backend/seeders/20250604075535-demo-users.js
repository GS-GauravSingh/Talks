"use strict";

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const sampleUsers = [
    { firstname: "Aarav", lastname: "Sharma" },
    { firstname: "Vivaan", lastname: "Verma" },
    { firstname: "Aditya", lastname: "Mehra" },
    { firstname: "Vihaan", lastname: "Gupta" },
    { firstname: "Krishna", lastname: "Singh" },
    { firstname: "Anaya", lastname: "Kapoor" },
    { firstname: "Isha", lastname: "Malhotra" },
    { firstname: "Diya", lastname: "Rana" },
    { firstname: "Kavya", lastname: "Desai" },
    { firstname: "Myra", lastname: "Reddy" },
    { firstname: "Ayaan", lastname: "Bose" },
    { firstname: "Aryan", lastname: "Chopra" },
    { firstname: "Ishaan", lastname: "Joshi" },
    { firstname: "Rohan", lastname: "Mishra" },
    { firstname: "Saanvi", lastname: "Nair" },
    { firstname: "Tanvi", lastname: "Saxena" },
    { firstname: "Reyansh", lastname: "Patel" },
    { firstname: "Tanish", lastname: "Jain" },
    { firstname: "Navya", lastname: "Garg" },
    { firstname: "Meera", lastname: "Khanna" },
];

module.exports = {
    async up(queryInterface, Sequelize) {
        const users = [];

        for (let i = 0; i < sampleUsers.length; i++) {
            const { firstname, lastname } = sampleUsers[i];
            const email = `${firstname.toLowerCase()}${i + 1}@example.com`;
            const password = await bcrypt.hash(`Password@${i + 1}`, 12);

            users.push({
                id: uuidv4(),
                firstname,
                lastname,
                email,
                password,
                // avatar: "https://res.cloudinary.com/df7wvngsb/image/upload/v1747302148/avatar-removebg-preview_bdfweo.png",
                tagline: "Hey there! I am using Talks.",
                isVerified: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        await queryInterface.bulkInsert("users", users, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", {
            email: {
                [Sequelize.Op.in]: sampleUsers.map(
                    (user, index) =>
                        `${user.firstname.toLowerCase()}${index + 1}@example.com`
                ),
            },
        });
    },
};
