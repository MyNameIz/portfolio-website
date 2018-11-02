'use strict';
const http = require('http');
const url  = require('url');
const fs   = require('fs');
const path = require('path');

const { Router } = require('./modules/router');
const Server = require('./modules/server');

var server = null;

class Application{
    constructor()
    {
        server  = new Server();
    }

    connectDB(creds)
    {
        try
        {
            require('./modules/db').connect(creds);
        }
        catch(err)
        {
            console.log(err);
            process.exit();
        }
    }

    useRouting(Path)
    {
        server.setRouter(Path)
    }

    useViewsDir(dir)
    {
        server.setViews(dir);
    }

    usePublicDir(dir)
    {
        server.setPublic(dir);
    }

    start(host, port)
    {
        if(!!host, !!port)
        {
            server.start(host, port);
        }
    }
}

module.exports = Application;

module.exports.Router = Router;

module.exports.db = require('./modules/db');

module.exports.cookies = require('./modules/cookies');
