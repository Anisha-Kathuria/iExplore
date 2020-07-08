const mongoose = require('mongoose');
//MONGOOSE_URL = mongodb+srv://ACMS:BobTheBuilder@acms-olj66.mongodb.net/test?retryWrites=true&w=majority 
//ADD THIS TO .env
var databaseUrl = process.env.MONGOOSE_URL 
var mockdatabaseUrl = "mongodb://localhost/acms"
var seedDb      = require("../seed")

function connect() {
  return new Promise((resolve, reject) => {

        //Essential mongoose commands
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);


        if (process.env.NODE_ENV === 'test') {
            mongoose.connect(mockdatabaseUrl, function (err) {
                if(err){
                    console.log("DB not connected: " + err.message);
                    return reject(err);
                }
                else{
                    console.log("DB connected");
                    //seedDb();
                    resolve();
                }
            });

        } else{
                mongoose.connect(databaseUrl, function (err) {
                    if(err){
                        console.log("DB not connected: " + err.message);
                        return reject(err);
                    }
                    else{
                        console.log("DB connected");
                        resolve();
                    }
                });
        }

  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };

