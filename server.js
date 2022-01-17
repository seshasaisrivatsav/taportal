let express = require('express');
// parses cookies for root scope. To keep the session, we need info
// in cookies
let cookieParser = require('cookie-parser');
let session      = require('express-session');
let passport = require('passport'); //core passport library initialized here
let app = express();

// let connectionString = 'mongodb://127.0.0.1:27017/taportal';
let connectionString = 'mongodb+srv://seshasaisrivatsav:mongodbpassword@cluster0.brg0p.mongodb.net/taportal?retryWrites=true&w=majority';
let mongoose = require("mongoose");
mongoose.connect(connectionString);

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* VVVIP : session has to be initialized AFTER Cookie Parser */
app.use(cookieParser());
app.use(session({secret: "asdfsfsdf"}));


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