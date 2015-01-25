var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var recipes = require('../models/recipes');

var isLoggedIn = function(req, res, next) {
	//if the user is logged in, call next() to request the next request handler
	//Passport adds this method to request an object
	//middleware allowed to add properties to request and response objects
	if (req.isAuthenticated())
		return next();
	//If not logged in session, redirect to the home page
	res.redirect('/');
}


/* GET home page. */
router.get('/', function(req, res) {
  res.render('home');
});

//list of users
router.get('/Users', function(req, res) {
	mongoose.model('Users').find(function(err, Users) {
		res.send(Users);
	});
});

/* POST / -- adding a new recipe */
router.post('/Recipes', function(req, res) {
  // store itthe submitted recipe
  var newRecipe = new recipes.Recipe({
  	name: req.body['recipe_name'],
  	image: req.body['recipe_image'],
  });
  
  //at this point newRecipe is only in memory
  newRecipe.save(function(err, result) {
  	// console.log(result);
  	//this is not redirecting at the moment
  	res.redirect('/recipes/' + result._id);
  });
});


//list of recipes
router.get('/Recipes', function(req, res) {
	mongoose.model('Recipes').find(function(err, recipes) {
		res.send(recipes);
	});
});


/* GET /Recipes/123 
	view a specific recipe */
router.get('/Recipes/:id', function(req, res) {
  var recipeId = req.param('id');
  recipes.Recipe.findOne({_id: recipeId}, function(err, result) {
    // console.log(result);
    res.render('singlerecipe', { recipe: result });
  });
});


module.exports = router;