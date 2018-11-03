const { Client, Pool } = require('pg');

var _client = null;

var _connected = false;

//connect - open new connection with DB 
async function connect(creds)
{
    if(!!creds&&(typeof(creds)=="string"||typeof(creds)=="object"))
    {
        _client = new Pool(creds);
        await _client.connect((err) => 
            {
                if(err)
                {
                    console.error('ERROR : Connection error!', err.stack);
                    process.exit();
                }
                else
                {
                    console.log('DB : Connection opened;')
                    _connected = true;
                }
            }
        );
    }
    else
    {
        throw('ERROR : No valid credentials for connection!')
    }
}

module.exports.connect = connect;


// query - execute query with giving arguments
async function query(text, values)
{
    if(_connected)
    {
        var res = await _client.query(text, values);
        return res;
    }
    else
    {
        console.log('ERROR : Database is not connected!');
    }
}

module.exports.query = query;

// disconnect - breaks connection with DB
function disconnect()
{
    _client.end((err) => 
        {
            if(err)
            {
                console.error('ERROR : Disconnection error!', err.stack);
            }
            else
            {
                console.log('DB : Connection closed;');
                _connected = false;
            }
        }
    )
}

module.exports.disconnect = disconnect;

