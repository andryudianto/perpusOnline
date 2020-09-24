const smtpTransport = require('../node-mailer/config')

function emailGenerator(data) {
    let mailOptions = {
        from: "test.pair.project@gmail.com",
        to: data.email,
        subject: "Perpus Online hacktiv8",
        generateTextFromHTML: true,
        html: `<h1>Thank You, ${data.firstName} ${data.lastName}, Your order is confirm! </h1> <br><br>`
    };
    return smtpTransport.sendMail(mailOptions, (error, response) => {
        error ? console.log(error) : console.log(response);
        smtpTransport.close();
    });
}

module.exports = emailGenerator