var nodemailer = require('nodemailer');
// var log = require('../log/log.js');

var email;
var subject;
var message;
var site;
var error;

function Email(email, subject, message, site) {
    this.email = email;
    this.subject = subject;
    this.message = message;
    this.site = site;
}

function messageFormat(email, message, subject, site) {
    var htmlMessage = '';
    htmlMessage = '<h1>' + subject + '</h1>';
    htmlMessage = htmlMessage + '<p>' + message + '</p>';
    htmlMessage = htmlMessage + '<h3>' + email + ' from ' + site + '</h3>';

    return htmlMessage;
}

Email.prototype.send = function () {

    return new Promise((res, erro) => {
        var transporte = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'contatojanh@gmail.com',
                pass: 'contato2018'
            }
        });

        var email = {
            from: 'contatojanh@gmail.com',
            to: 'roger.zabka@gmail.com',
            subject: 'Contato do site ' + this.site + ' de: ' + this.email,
            html: messageFormat(this.email, this.message, this.subject, this.site)
        };

        transporte.sendMail(email, function (err, info) {

            if (err) {
                res(err);
            }
            else {
                res(info);
            }
        });
    });
}

module.exports = { Email };