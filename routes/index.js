var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var recipes = require('../models/recipes');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { title: 'Express' });
});

//list of users
router.get('/Users', function(req, res) {
	mongoose.model('Users').find(function(err, Users) {
		res.send(Users);
	});
});

// //testing db
// var firstRecipe = new models.Recipes({
// 	name: 'gobi',
// 	image: 'http://amazing-seeds.com/images/cauliflower__22959_zoom.jpg'
// });
// //at this point newRecipe is only in memory
// firstRecipe.save(function(err, thor));



/* POST / -- adding a new recipe */
router.post('/Recipes', function(req, res) {
  // store itthe submitted recipe
  var newRecipe = new recipes.Recipe({
  	name: req.body['recipe_name'],
  	image: req.body['recipe_image'],
  });
  console.log(newRecipe);
  //at this point newRecipe is only in memory
  newRecipe.save(function(err, result) {
  	res.redirect('/Recipes/:userId');
  });
});


//list of recipes
router.get('/Recipes', function(req, res) {
	mongoose.model('Recipes').find(function(err, recipes) {
		res.send(recipes);
	});
});

//recipes from specific user by userId, also gives user info
router.get('/Recipes/:userId', function(req, res) {
	mongoose.model('Recipes').find({user: req.params.userId}, function(err, recipes) {
		mongoose.model('Recipes').populate(recipes, {path: 'User'}, function(err, recipes) {
			res.send(recipes);
		});
	});
});


module.exports = router;