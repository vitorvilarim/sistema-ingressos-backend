require('dotenv').config();
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});


const send = async (to, subject, body) => {
    await transport.sendMail({
        from: `${process.env.MAIL_NAME} <> ${process.env.MAIL_FROM}`,
        to,
        subject,
        text: body
    })
};


module.exports = send;
