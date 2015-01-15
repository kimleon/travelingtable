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
	function(req, email, password, done) {
		
		
		User.findOne({'username': username}, function (err, user) {
			if (err)
				return done(err);
			//if no user is found, return an error message
			if (!user) {
				return done(null, false, req.flash('loginMessage', 'No user with this email is found in our directory.'));
			} 

			//else, you want to check username and password match
			if(!user.validPassword(password)){
				return done(null, false, req.flash('loginMessage', 'Oops! Looks like you have entered the wrong password.'));					
			}

			//else, all is well, return the successful user
			return done(null, user);
			
		});
	}));
};