// necessary arguments for application

module.exports = {
    host : null,
    port : null,
    path : {
        views   : null,
        routing : null,
        public  : null
    },
    db : {
        user     : null,
        host     : null,
        database : null,
        password : null,
        port     : null
    },
    cookies : {
        secret : null,
        algorithm : 'aes-256-ofb',
        options : {
            maxAge   : 60 * 60 * 24 * 7,
            httpOnly : true,
            signed   : true
        }
    },
    email : {
        host : null,
        port : 465,
        secure : true,
        pool : true,
        auth : {
            user : null,
            pass : null
        }
    }
}
