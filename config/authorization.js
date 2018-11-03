const bcrypt = require('bcrypt');
// const Cookies = require('cookies');

const cookie = require('../application/engine').cookies;
const config = require('./config');
const db     = require('../application/engine').db;

// authorized - checks if user is authorized
function authorized(req, res)
{
    var cookies = (!!req.cookie) ? req.cookie : undefined;
    if(!!cookies&&cookies.userauth=='authorized')
        return true;
    return false;
}
module.exports.authorized = authorized;

// signIn - login method
async function signIn(req, res)
{
    if(req.body.login&&!!req.body.password)
    {
        var result = await db.query("SELECT * FROM users WHERE users.login = $1; ", [ req.body.login ]);
        var correct = (result.rowCount>0)?await bcrypt.compare(req.body.password, result.rows[0].password):false;
        if(!!result.rows.length&&correct)
        {
            var userauth = cookie.serialize('userauth', 'authorized', config.cookies.options);
            var userrole = cookie.serialize('userrole', result.rows[0].role, config.cookies.options);
            res.setHeader('Set-Cookie', [userauth,userrole]);
            // res.setHeader('Set-Cookie', userrole);
            res.end();
        }
        else
        {
            res.writeHead(401, 'Unauthorized.');
            res.end();
        }
    }
    else
    {
        res.writeHead(400, 'Bas Request.');
        res.end();
    }
}
module.exports.signIn = signIn;

async function signOut(req, res)
{
    var userauth = cookie.serialize('userauth', '',  {'Expires':Date.now()});
    var userrole = cookie.serialize('userrole', '',  {'Expires':Date.now()});
    res.setHeader('Set-Cookie', [userauth, userrole]);
    res.end();
}
module.exports.signOut = signOut;
