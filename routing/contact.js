const { Router } = require('../application/engine');
const email      = require('../config/email');

var router = new Router();

router.post('/', async function(req, res)
    {
        var body = req.body;
        if(!!body.name&&!!body.email&&!!body.message)
        {
            var userExists = await email.emailExists(body.name, body.email, body.message);
            if(!userExists)
            {
                res.writeHead(400, `Email ${body.email} doesn't exist.`);
                res.end();
                return false;
            }
            var messageDelivered = await email.deliverContactMessage(body.name, body.email, body.message);
            if(messageDelivered)
            {
                res.writeHead(200);
                res.end();
                return true;
            }
            else
            {
                res.writeHead(500, 'Server Error.');
                res.end();
                return false;
            }
        }
        else
        {
            res.writeHead(400, 'Bad request');
            res.end();
        }
    }
);

module.exports = router;