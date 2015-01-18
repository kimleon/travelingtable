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

				return done(null, false, req.flash('loginMessage', 'Are you sure this is the correct username?  It is okay, you can try again!'));
			} 

			//else, you want to check username and password match
			if(!user.validPassword(password)){
				console.log('The username is wrong we are reaching to this point')
				return done(null, false, req.flash('loginMessage', 'You did bad, the password is WRONG.  Sorry dude.'));					
			}

			//else, all is well, return the successful user
			return done(null, user);
			
		});
	}));
};