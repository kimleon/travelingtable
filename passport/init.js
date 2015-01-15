//load all the things we need
var localStrategy = require('passport-local').Strategy;

//load up the user model
var models = require('../models/users');
var User = models.User;
var register = require('./register');

var login = require('./login');

module.exports = function(passport) {
	//first we have to set up the passport session
	//passport needs the ability to set up persistent login sessions
	//passport needs to serialize and unserialize sers out of session

	//used to serialize the user for the session
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	//used to deserialize the user for the session
	passport.deserializeUser(function(id, done){
		User.findOne({_id: id}, function(err, user){
			done(err, user);
		});
	});

	//now use the signup object to handle signins
	login(passport);
	register(passport);
	
};