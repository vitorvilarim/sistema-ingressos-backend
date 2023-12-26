require('dotenv').config();
const nodemailer = require('nodemailer');



const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "0d731ff51645d4",
        pass: "8487079f923235"
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
