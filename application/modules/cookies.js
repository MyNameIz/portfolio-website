const cookie = require('cookie');
const crypto  = require('crypto');

const config  = require('../../config/config').cookies;

var cookieOptions = config.options;

// cookieEncrypt - encrypts cookie value before serializing
const cookieEncrypt = function(str, algorithm, password)
{
    var cipher = crypto.createCipher(algorithm, password);
    var encrypted_str = cipher.update(str, 'utf8', 'hex');
    encrypted_str+=cipher.final('hex');
    return encrypted_str;
}

// cookieEncrypt - decrypts cookie value
const cookieDecrypt = function(val, algorithm, password)
{    
    var decipher = crypto.createDecipher(algorithm, password);
    var decrypted_val = decipher.update(val, 'hex', 'utf8')
    decrypted_val += decipher.final('utf8');
    return decrypted_val;
}

// module.exports.cookieDecrypt = cookieDecrypt;

// serialize - creates cookie  'key' : 'value'  pair for correct http response and returns it 
var serialize = function(name, val, options)
{
    if(options.signed)
    {
        val = cookieEncrypt(val, config.algorithm, config.secret); 
    }
    var cookies = cookie.serialize(name, val, cookieOptions);
    return cookies;
}
module.exports.serialize = serialize;

// deserialize - gets object with decrypted 'key' : 'value' cookie pairs and returns them
 var deserialize = function(req)
 {    
    var cookies = (!!req.headers.cookie) ? cookie.parse(req.headers.cookie) : undefined;
    if(!cookies)
        return {};
    for(var key in cookies)
    {
        cookies[key]=cookieDecrypt(cookies[key], config.algorithm, config.secret);
    }
    return cookies;
 }
 module.exports.deserialize = deserialize;
