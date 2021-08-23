const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

export const sendmail = function(to, subject, text, html) {
    let mail = {
        from: '"POSTGRE 2021" <postgre@pemro.id>',
        to: to,
        subject: subject,
        text: text,
        html: html
    }
    transport.sendMail(mail, (err, info) => {
        if(err)
            return console.log(err)
        return "Sent to " + to
    })
}