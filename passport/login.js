//TO PROVIDE USER AUTHENTICATION, we used the Passport library along with these tutorials/documentation:
//http://passportjs.org/guide/authenticate/
//http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
//https://scotch.io/tutorials/easy-node-authentication-setup-and-local




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

				return done(null, false, req.flash('loginMessage', 'This username does not seem to exist in our database.  Sorry about that.'));
			} 

			//else, you want to check username and password match
			if(!user.validPassword(password)){
				console.log('The username is wrong we are reaching to this point')
				return done(null, false, req.flash('loginMessage', 'Sorry, this password seems to be incorrect.  Try again, we believe in you!'));					
			}

			//else, all is well, return the successful user
			return done(null, user);
			
		});
	}));
};