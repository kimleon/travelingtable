//for a custom error page, we used this tutorial as a guide: http://www.hacksparrow.com/express-js-custom-error-pages-404-and-500.html
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

//added mongoose 
var mongoose = require('mongoose');
var fs = require('fs');




// mongoose.connect('mongodb://heroku_app33378596:ifr25qah0moht23oesduahbqno@ds031571.mongolab.com:31571/heroku_app33378596');


mongoose.connect('mongodb://localhost/test');


// //require the AWS module
// var AWS = require('aws-sdk');
// // load the json file in
// AWS.config.loadFromPath('/s3/config.json');
// //Create a new instance of S3
// var s3 = new AWS.S3();

// //create bucket
// var bucketParams = {Bucket: 'myBucket'};
// s3.createBucket(bucketParams)

// //connect directly to that bucket when instantiating an 
// //AWS.S3 object by passing in the bucket name as a paramter
// var s3Bucket = new AWS.S3( { params: {Bucket: 'myBucket'} } )

var app = express();

//passport imports
var passport = require('passport');
//configure session so user can stay logged in
var session      = require('express-session');

var init = require('./passport/init')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

//more for configuring passport-configure session


app.use(session({secret: 'mySecretKey',
                saveUninitialized: true,
                resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())


console.log(init);
init(passport);

var routes = require('./routes/routes')(passport);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        //res.render('error', {
            //message: err.message,
            //error: err
        //});
        res.render('404');
    });
}

//load all files in models.dir
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
    if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    /*res.render('error', {
        message: err.message,
        error: {}
    });*/
    res.render('404');
});


module.exports = app;
