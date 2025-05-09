const nodemailer = require("nodemailer");
const environmentVariables = require("../constants/environmentVariables");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: environmentVariables.NODEMAILER_USERNAME,
        pass: environmentVariables.NODEMAILER_PASSWORD,
    },
});

async function mailer({ recipientEmail, subject, textMessage, htmlTemplate }) {
    try {
        await transporter.sendMail({
            from: environmentVariables.NODEMAILER_USERNAME,
            to: recipientEmail,
            subject: subject,
            text: textMessage,
            html: htmlTemplate,
        });

        console.log("mailer.js: mailer(): OTP email sent successfully!");
        return true;
    } catch (error) {
        console.error("mailer.js: mailer(): Error sending OTP email:", error);
        return false;
    }
}

module.exports = mailer;
