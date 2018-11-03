const config = require('./config/config');
const Application = require('./application/engine');

var app = new Application(); // creates application object

app.usePublicDir(config.path.public); // set directory which contents js,css and images
app.useRouting(config.path.routing); // set module which exports Router object 
app.useViewsDir(config.path.views); // set directory which contents page templates
app.connectDB(config.db); // open connection with database

app.start(config.host, config.port); 
