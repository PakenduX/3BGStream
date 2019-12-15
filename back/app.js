const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const logger = require('morgan');
const cors = require('cors')
const passport = require('passport')
const authSilo = require('./silo/AuthSilo');
require('./security/passport')
const videoSilo = require('./silo/VideoSilo')
//require('./models/playListDBConnect')
//require('./models/userDBConnect')

const app = express();

app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(logger('dev'));
app.use(bodyParser.urlencoded({'limit': '10mb', 'extended': 'true'}));
app.use(bodyParser.json({'limit': '10mb', 'extended': 'true'}));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(cookieParser());
app.use(passport.initialize())

app.use('/auth', authSilo);
app.use('/video', videoSilo);

module.exports = app;
