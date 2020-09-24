const smtpTransport = require('../node-mailer/config')

function emailGenerator(data, book) {
    let mailOptions = {
        from: "test.pair.project@gmail.com",
        to: data.email,
        subject: "Perpus Online hacktiv8",
        generateTextFromHTML: true,
        html: `<h1>Thank You, ${data.firstName} ${data.lastName}</h1><br><h4>Your order is confirm!</h4><br><br><h3>${book.title}</h3><br><h3>${book.isbn}</h3><br><h3>${book.authors}</h3><br><h3>${book.category}</h3><br><h3>${book.publishedDate}</h3>`
    };
    return smtpTransport.sendMail(mailOptions, (error, response) => {
        error ? console.log(error) : console.log(response);
        smtpTransport.close();
    });
}

module.exports = emailGenerator