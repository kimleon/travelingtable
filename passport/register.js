// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../models/users').User;

//export so the rest of the application can use this
module.exports = function(passport) {
	passport.use('signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true //allows us to passback the entire request to the calback
	},
	function(req, email, password, done) {
		//asyhchronus
		//User.findOne won't fire unless data is sent back
		process.nextTick(function() {
			User.findOne({'username': username}, function (err, user) {
				if (err)
					return done(err);
				if (user) {
					return done(null, false, req.flash('signupMessage', 'That username is already taken'));
				} else {
					//create a new user with this email
					var newUser = new User();
					newUser.username = username;
					newUser.password = newUser.generateHash(password);

					//save the user into the database
					newUser.save(function(err){
						if (err)
							throw err;
						return done(null, newUser);
					});					
				}
			});
		});
	}));
};