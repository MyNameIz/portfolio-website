const http = require('http');
const url  = require('url');
const fs   = require('fs');
const path = require('path');
const qs   = require('querystring');
const handlebars = require('handlebars');

const cookies = require('./cookies');

var _views  = null;
var _router = null;
var _public = null;


// 	compileRouter() - used to build together several request handlers from different modules which export Router object.
function _compileRouter()
{
    var method = function(conttype)	// method which handles requests for additional parts of page (js, css, images)
    {					// http://example.com/%part_type%/%name%
        if(typeof(conttype) == 'string')// http://example.com/js/index.js - gets index.js from public dir (_public).
        {
            conttype = 'text/'+conttype;
            return function(req, res)
            {
                var fname = url.parse(req.url).pathname.split('/'); fname = fname[fname.length - 1];
                var folder = url.parse(req.url).pathname.split('/'); folder = folder[folder.length - 2];
                var fpath = path.join(_public,folder,fname);
                fs.exists(fpath, function(ex)
                    {
                        if(ex)
                        {
                            var stat = fs.statSync(fpath);
                            var fd = fs.openSync(fpath, 'r');
                            var buff = new Buffer(stat.size);
                            fs.readSync(fd, buff, 0, buff.length, null);
                            res.writeHead(200, {'Content-Type': conttype});                                        
                            res.end(buff);
                        }
                        else
                        {
                            res.end();
                        }
                    }
                );
                
            }
        }
    }
    _router.handlers['css']={};
    _router.handlers[ 'js']={};
    _router.handlers['img']={};
    _router.handlers['css']['GET']=method('css');
    _router.handlers[ 'js']['GET']=method('javascript');
    _router.handlers['img']['GET']=method('')
}

function _checkArgs()
{
    if(!!!_views||!!!_public||!!!_router)
    {
        throw(`ERROR : Not enough args for server start.\n views = ${_views}\n public = ${_public}\n router = ${_router}`);
    }
}


// _handleRequest - takes request data and sends it to correct request handler 
async function _handleRequest(req, res)
{
    var pathname = url.parse(req.url).pathname;
    var f = null;
    console.log(`${req.method} : ${req.url}`)
    if('jscssimg'.indexOf(pathname.split('/')[1]) > -1 && req.method == 'GET' && pathname != '/')
    {
        f=_router.handlers[pathname.split('/')[1]]['GET'];
    }
    else if(!!_router.handlers[pathname])
    {
        f=_router.handlers[pathname][req.method];
    }
    if(!!f)
    {
        var data = '';
        req.on('data', function(chunk)
            {
                data+=chunk.toString('utf-8');
            }
        );
        req.on('end',function()
            {
                if(!!data)
                {
                    req.body = qs.parse(data);
                    // data=data.split('&')
                    // for(var el in data)
                    // {
                    //     req.body[data[el].split('=')[0]]=data[el].split('=')[1].replace(/\+/g, ' ');
                    // }
                }
                f(req,res);
            }
        );
    }
    else
    {
        console.log('   no handler for '+req.url)
        res.end();
    }
}

class Server { 
    constructor()
    {

    }

    // setViews(val) - sets directory from which pages will be taken 
    setViews(val)
    {
        if(fs.existsSync(val))
        {
            _views=val;
        }
    }

//  setPublic(val) - sets directory with from which js,css and images will be taken
    setPublic(val)
    {
        if(fs.existsSync(val))
        {
            _public = val;
        }
    }

//  setRouter(val) - sets module which exports main Router
    setRouter(val)
    {
        if(typeof(val) == "string" && !!val)
        {
            val = path.relative('application/modules', val)
            _router = require(val);   
        }
    }

    // db(val)
    // {
    //     router.db=val;
    // }

//  start(host, port) - starts request listener
    start(host, port)
    {
        _checkArgs();
        var self = this;

        var rooturl = null;
        _compileRouter();
        var s = http.createServer(function(req, res)
            {
                var pathname = url.parse(req.url).pathname;
                if(pathname[pathname.length-1] == '/')
                {
                    pathname = pathname.slice(0, pathname.length-1);      // to prevent some problems
                }
                res.render = function(page, data)
                {
                    var obj = (!!data) ? data : {};
                    this.writeHead(200, {'Content-Type': 'text/html'});
                    if(typeof(page) == "string" && !!page && !!_views)
                    {
                        page=path.join(_views, page);
                        if(fs.existsSync(page))
                        {
                            var stat = fs.statSync(page);
                            var fd = fs.openSync(page, 'r');
                            var buff = new Buffer(stat.size);
                            fs.readSync(fd, buff, 0, buff.length, null);
                            var hbs = buff.toString('utf-8');
                            var template = handlebars.compile(hbs);
                            obj.rooturl = rooturl;
                            res.end(template(obj));
                        }
                        else
                        {
                            res.end();
                        }
                    }
                    else
                    {
                        res.end('');
                    }                    
                }
                res.error = function(statusCode, message)
                {
                    // this.render()
                    res.end(`<h1>${statusCode}</h1><p><b>${message}</b></p>`);
                }
                req.cookie = cookies.deserialize(req);                          

                _handleRequest(req, res);


            }
        ).listen(port, host, function()
            {
                rooturl = 'http://' + host + ':' + port;
                console.log('SERVER : started;');
            }
        );
        
    }
}

module.exports = Server;
