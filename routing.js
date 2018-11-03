const { Router } = require('./application/engine');
var router = new Router();

const MAIN = require('./routing/main')
router.use('/', MAIN);

const LOGIN = require('./routing/login')
router.use('/login', LOGIN);

const CONTACT = require('./routing/contact');
router.use('/email', CONTACT);

module.exports = router;

