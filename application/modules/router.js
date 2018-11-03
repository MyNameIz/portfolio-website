class Router {
    constructor()
    {
	// [ get(), put(), post(), delete() ] methods are used to add new request handler according to its request method.
        this.get = (pathname, method)=>
        {
            if(typeof(pathname) == 'string' && !!pathname && typeof(method) == 'function')
            {
                if(!!!this.handlers)
                {
                    this.handlers = {};
                }
                if(!!!this.handlers[pathname])
                {
                    this.handlers[pathname] = {};
                }
                this.handlers[pathname]['GET'] = method;
            }
            else
            {
                throw `Invalid arguments: \n !!pathname = ${!!pathname} \n typeof pathname = ${typeof(pathname)} \n pathname = ${pathname}\n method = ${method} \n typeof method = ${typeof(method)}`
            }
        }

        this.put = (pathname, method)=>
        {
            if(typeof(pathname) == 'string' && !!pathname && typeof(method) == 'function')
            {
                if(!!!this.handlers)
                {
                    this.handlers = {};
                }
                if(!!!this.handlers[pathname])
                {
                    this.handlers[pathname] = {};
                }
                this.handlers[pathname]['PUT'] = method;
            }
            else
            {
                throw `Invalid arguments: \n !!pathname = ${!!pathname} \n typeof pathname = ${typeof(pathname)} \n pathname = ${pathname}\n method = ${method} \n typeof method = ${typeof(method)}`
            }
        }

        this.post = (pathname, method)=>
        {
            if(typeof(pathname) == 'string' && !!pathname && typeof(method) == 'function')
            {
                if(!!!this.handlers)
                {
                    this.handlers = {};
                }
                if(!!!this.handlers[pathname])
                {
                    this.handlers[pathname] = {};
                }
                this.handlers[pathname]['POST'] = method;
            }
            else
            {
                throw `Invalid arguments: \n !!pathname = ${!!pathname} \n typeof pathname = ${typeof(pathname)} \n pathname = ${pathname}\n method = ${method} \n typeof method = ${typeof(method)}`
            }
        }

        this.delete = (pathname, method)=>
        {
            if(typeof(pathname) == 'string' && !!pathname && typeof(method) == 'function')
            {
                if(!!!this.handlers)
                {
                    this.handlers = {};
                }
                if(!!!this.handlers[pathname])
                {
                    this.handlers[pathname] = {};
                }
                this.handlers[pathname]['DELETE'] = method;
            }
            else
            {
                throw `Invalid arguments: \n !!pathname = ${!!pathname} \n typeof pathname = ${typeof(pathname)} \n pathname = ${pathname}\n method = ${method} \n typeof method = ${typeof(method)}`
            }
        }

	// use - is used to import request handlers from another module which exports router object to current object.
        this.use = (pathname, router)=>
        {
            if(!!!this.handlers)
            {
                this.handlers = {};
            }   
            if(typeof(pathname) == 'string' && router instanceof Router && !!router.handlers)
            {
                var handlers = router.handlers;
                for(var reqPath in handlers)
                {
                    for(var method in handlers[reqPath])
                    {
                        var fullUrl = (reqPath == '/') ? pathname : pathname+reqPath.replace('/','');
                        if(!!!this.handlers[fullUrl])
                        {
                            this.handlers[fullUrl] = {};
                        }
                        this.handlers[fullUrl][method] = handlers[reqPath][method];
                    }
                }
            }   
            else
            {
                throw 'Invalid arguments.';
            }
            // console.log(this) 
        }
    }
}

module.exports.Router = Router;
