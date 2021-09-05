const nodemailer = require("nodemailer")
const fs = require("fs")

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
        if(err) {
            fs.writeFileSync("public/assets/log.json", JSON.stringify(err))
            return err
        }
        fs.writeFileSync("public/assets/log.json", JSON.stringify(info))
        return "Sent to " + info
    })
}