require('dotenv').config();
var express     = require("express"),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    seedDb      = require("./seed"),
    app         = express();
    db          = require('./db/index.js');


/**********CORS COMMANDS *************/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
/***********************************/

//Require models
var User                    = require("./models/user");
var Building                = require("./models/building");
var Floor                   = require("./models/floor");


//Require routes
var webappRoutes        = require("./routes/webappRoutes"),
    androidRoutes       = require("./routes/androidRoutes");

app.use(bodyParser.json());  //req.body undefined

//To use routes/routefile.js
app.use(webappRoutes);
app.use(androidRoutes);

 

//=========================================
//To initialize db: seedDB 
//seedDb();
//=========================================

db.connect()
  .then(() => {
    app.listen(3000, function(){
      console.log("Server listening on port 3000");
    });
});