const { Router } = require('../application/engine');
var db = require('../application/engine').db
var auth = require('../config/authorization').authorized;

var router = new Router();


router.get('/', async function(req, res)
    {
        var data = {};
        await db.query("SELECT * FROM prog_langs;").then(result=>
            {
                data.diagrams = [];
                if(result.rowCount > 0)
                {
                    for(var key in result.rows)
                    {
                        data.diagrams.push(result.rows[key]);
                    }
                }
            }
        );
        data.vars = {
            // @VAR_NAME  :  @DB_NAME
            'langs'      : 'langs',
            'add_skills' : 'add_skills',
            'education'  : 'education',
            'exp'        : 'exp'
        }
        for(var key in data.vars)
        {
            await db.query(`SELECT * FROM ${data.vars[key]};`).then(result=>
                {
                    data[key] = [];
                    if(result.rowCount > 0)
                    {
                        for(var k in result.rows)
                        {                           
                            data[key].push(Object.values(result.rows[k])[0]);
                        }
                    }
                }
            );
        }
        data.auth=(!!req.cookie.userauth&&req.cookie.userauth=='authorized')?true:false;
        res.render('index.hbs', data);
    }
);

router.post('/diagram', async function(req, res)
    {
        if(auth(req, res)&&!!req.body.name&&!!req.body.val)
        {
            var data = req.body;
            var result = await db.query("INSERT INTO prog_langs (name, skill) VALUES($1,$2);", [data.name, data.val]);
            if(result.rowCount > 0)
            {
                res.writeHead(200);
                res.end();    
            }
            else
            {
                result=await db.query(`SELECT * FROM prog_langs WHERE prog_langs.name = "${data.name.toString()}";`, [data.name]);
                res.writeHead(500, 'Server Error.');
                res.end();
            }
        }
        else
        {
            res.writeHead(400, 'Bad Request.');
            res.end();
        }
    }
);


router.put('/diagram', async function(req, res)
    {
        if(auth(req, res)&&!!req.body.name&&!!req.body.val&&!!req.body.prevName)
        {
            var data = req.body;
            var result = await db.query("UPDATE prog_langs SET name = $2, skill = $3 WHERE prog_langs.name = $1;", [data.prevName, data.name, data.val]);
            if(result.rowCount > 0)
            {
                res.writeHead(200);
                res.end();    
            }
            else
            {
                res.writeHead(500, 'Server Error.');
                res.end();
            }
        }
        else
        {
            res.writeHead(400, 'Bad Request.');
            res.end();
        }
    }
);

router.delete('/diagram', async function(req, res)
    {
        if(auth(req, res)&&!!req.body.prevName)
        {
            var data = req.body;
            var result = await db.query("DELETE FROM prog_langs WHERE name = $1;", [data.prevName]);
            if(result.rowCount > 0)
            {
                // console.log(result);
                res.writeHead(200);
                res.end();    
            }
            else
            {
                res.writeHead(500, 'Server Error.');
                res.end();
            }
        }
        else
        {
            res.writeHead(400, 'Bad Request.');
            res.end();
        }
    }
);

var getTableFromVarName = function(name)
{
    if(!!name && typeof(name)=="string")
    {
        if(name=="language")
        {
            return 'langs';
        }
        if(name=="additional")
        {
            return 'add_skills';
        }
        if(name=="education")
        {
            return 'education';
        }
        if(name=="expierence")
        {
            return 'exp';
        }
        // if(name=="interests")
        // {
        //     return 'interests';
        // }
    }
    return false;
}

router.post('/data', async function(req, res)
    {
        var table  = getTableFromVarName(req.body.name);
        if(auth(req, res)&&!!table&&!!req.body.val)
        {
            var data = req.body;
            var result = await db.query(`INSERT INTO ${table} (${table}) VALUES($1);`, [data.val]);
            if(result.rowCount > 0)
            {
                res.writeHead(200);
                res.end();    
            }
            else
            {
                res.writeHead(500, 'Server Error.');
                res.end();
            }
        }
        else
        {
            res.writeHead(400, 'Bad Request.');
            res.end();
        }
    }
);


router.put('/data', async function(req, res)
    {
        var table = getTableFromVarName(req.body.name);
        if(auth(req, res)&&!!table&&!!req.body.val&&!!req.body.prevVal)
        {
            var data = req.body;
            var result = await db.query(`UPDATE ${table} SET ${table} = $1 WHERE ${table}.${table} = $2;`, [data.val, data.prevVal]);
            if(result.rowCount > 0)
            {
                res.writeHead(200);
                res.end();    
            }
            else
            {
                res.writeHead(500, 'Server Error.');
                res.end();
            }
        }
        else
        {
            res.writeHead(400, 'Bad Request.');
            res.end();
        }
    }
);

router.delete('/data', async function(req, res)
    {
        var table = getTableFromVarName(req.body.name);
        if(auth(req, res)&&!!req.body.prevVal&&!!table)
        {
            var data = req.body;
            var result = await db.query(`DELETE FROM ${table} WHERE ${table}.${table} = $1;`, [data.prevVal]);
            if(result.rowCount > 0)
            {
                // console.log(result);
                res.writeHead(200);
                res.end();    
            }
            else
            {
                res.writeHead(500, 'Server Error.');
                res.end();
            }
        }
        else
        {
            res.writeHead(400, 'Bad Request.');
            res.end();
        }
    }
);

module.exports = router;