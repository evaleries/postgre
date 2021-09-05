const mailgun = require("mailgun-js")

const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_API_URL});

export const sendmail = function(to, subject, text, html) {
    let mail = {
        from: '"POSTGRE 2021" <postgre@pemro.id>',
        to: to,
        subject: subject,
        text: text,
        html: html
    }
    mg.messages().send(mail, function(err, res) {
        console.log(err)
        console.log(res)
        //test
        if(err)
            return err
        return res
    })
}