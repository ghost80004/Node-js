const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config();
const sendOTP = async ({ email, subject, message }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.OTP_USER,
                pass: process.env.OTP_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: process.env.OTP_USER,
            to: email,
            subject,
            text: message,
        });

        console.log("Email Sent:", info.response);
    } catch (error) {
        console.log("Email Error:", error);
        throw error; 
    }
};

module.exports = sendOTP;