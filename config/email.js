const config    = require('./config');
const transport = require('nodemailer').createTransport(config.email);

var msg = function(from, to, subj, text)
{
    return {
        to      : to,
        subject : subj,
        text    : text,
    }
}

// emailExists - sends confirmation letter to check email address existence
var emailExists = async function(name, email, message)
{
    var confirm_message = `Hi, ${name}. My name is Alexey and I'am software developer.`+
                          `Recently you have sent email to me using my portfolio web-site.`+
                          `The message was:\n"${message}"\nYou'll receive an answer soon.\n`+
                          `Best regards! Alexey.\n`;
    var result = await transport.sendMail(msg(config.email.auth.user, email, 'Feedback', confirm_message))
        .then(info =>
            {
                return true;
            })
        .catch(err =>
            {
                return false;
            }
        );
    return result;
}

module.exports.emailExists = emailExists;

// deliverContactMessage - sends feedback message
var deliverContactMessage = async function(name, email, message)
{
    try
    {
        var result = await transport.sendMail(msg(email, config.email.auth.user, `Feedback from ${name}: ${email}`, message))
            .then(info => 
                {
                    return true;
                }
            )
            .catch(err => 
                {
                    console.log(err)
                    throw(err);
                }
            );
        return result;
    }
    catch(error)
    {
        console.log(error)
        return false;
    }
}

module.exports.deliverContactMessage = deliverContactMessage;

