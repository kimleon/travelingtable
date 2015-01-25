//TO PROVIDE USER AUTHENTICATION, we used the Passport library along with these tutorials/documentation:
//http://passportjs.org/guide/authenticate/
//http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
//https://scotch.io/tutorials/easy-node-authentication-setup-and-local


//load all the things we need
var localStrategy = require('passport-local').Strategy;

//load up the user model
var models = require('../models/users');
var User = models.User;
var register = require('./register');

var login = require('./login');

module.exports = function(passport) {
	console.log('Init function is being called')
	//first we have to set up the passport session
	//passport needs the ability to set up persistent login sessions
	//passport needs to serialize and unserialize sers out of session

	//used to serialize the user for the session
	passport.serializeUser(function(user, done){
		done(null, user._id);
		//console.log('serialize function getting called');

	});

	//used to deserialize the user for the session
	passport.deserializeUser(function(id, done){
		User.findOne({_id: id}, function(err, user){
			done(err, user);
			//console.log('deserializefunction getting called');
		});
	});

	//now use the signup object to handle signins
	login(passport);
	register(passport);
	
};