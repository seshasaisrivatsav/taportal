let express = require('express');
// parses cookies for root scope. To keep the session, we need info
// in cookies
let cookieParser = require('cookie-parser');
let session = require('express-session');
let passport = require('passport'); //core passport library initialized here
let app = express();



let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* VVVIP : session has to be initialized AFTER Cookie Parser */
app.use(cookieParser());
app.use(session({
    secret: "asdfsfsdf",
    resave: true,
    saveUninitialized: true
}));


// let connectionString = 'mongodb://127.0.0.1:27017/taportal';
let connectionString = 'mongodb://seshasaisrivatsav:mongodbpassword@cluster0.brg0p.mongodb.net/taportal?retryWrites=true&w=majority';
let mongoose = require("mongoose");
let options = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};
mongoose.connect(connectionString, options);


// First initialize passport and then tell it to use the express    session
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

//let ipaddress = process.env.OPENSHIFT_NODEJS_IP;
//let port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

let port = process.env.PORT || 3000;

let project = require("./project/app.js");
project(app);

//app.listen(port, ipaddress);

app.listen(port);

module.exports = app;