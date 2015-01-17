// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../models/users').User;

module.exports = function(passport) {
	passport.use('local-login', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true //allows us to passback the entire request to the calback
	},
	function(req, username, password, done) {
		
		
		User.findOne({'username': username}, function (err, user) {
			if (err)
				return done(err);
			//if no user is found, return an error message
			if (!user) {
				return done(null, false, {message: 'Incorrect username.'});
			} 

			//else, you want to check username and password match
			if(!user.validPassword(password)){
				return done(null, false, {message: 'Incorrect password.'});					
			}

			//else, all is well, return the successful user
			return done(null, user);
			
		});
	}));
};