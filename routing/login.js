const { Router } = require('../application/engine');
const authModule = require('../config/authorization');
var router = new Router();

router.get('/', function(req, res)
    {
        if(authModule.authorized(req, res))
        {
            res.writeHead(302, {'Location' : '/'});
            res.end();
        }
        else
        {
            res.render('login.html');
        }
    }
);

router.post('/', function(req, res)
    {
        if(!!req.body.login && !!req.body.password && !authModule.authorized(req, res))
        {
            authModule.signIn(req, res);
        }
        else
        {
            res.writeHead(400, 'Bad Request');
            res.end();
        }
    }
);

router.put('/', function(req, res)
    {
        if(authModule.authorized(req, res))
        {
            authModule.signOut(req, res);
        }
    }
);

module.exports = router;