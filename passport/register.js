// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../models/users').User;

//export so the rest of the application can use this
module.exports = function(passport) {
	passport.use('signup', new LocalStrategy({
		usernameField: 'new_username',
		passwordField: 'new_password',
		passReqToCallback: true //allows us to passback the entire request to the calback
	},
	function(req, new_username, new_password, done) {
		//asyhchronous
		//User.findOne won't fire unless data is sent back
		// var new_username = new_username
		console.log(req.body);
		process.nextTick(function() {
			console.log('nexttickthing', new_username);
			User.findOne({'username': new_username}, function (err, user) {
				if (err) {
					console.log(err)
					return done(err);
				}
				if (user) {
					console.log(new_password);
					console.log('Hello');
					console.log(new_username);
					return done(null, false, req.flash('signupMessage', 'Sorry, this username is taken.  We suggest you think a little harder.'));
				} else {
					//create a new user with this email
					var newUser = new User();
					newUser.username = new_username;
					newUser.password = newUser.generateHash(new_password);
					newUser.recipe_list = [];
					newUser.vegetarian = false;
					newUser.vegan = false;
					newUser.allergies = false;
					newUser.gluten_free = false;
					newUser.upvoted_recipes = [];

					//save the user into the database
					newUser.save(function(err){
						if (err) {
							console.log(err);
							throw err;
						}
							
						return done(null, newUser);
					});					
				}
			});
		});
	}));
};