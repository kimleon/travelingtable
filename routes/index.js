var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var recipes = require('../models/recipes');


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
  	console.log(result);
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
    console.log(result);
    res.render('singlerecipe', { recipe: result });
  });
});


// //recipes from specific user by userId, also gives user info
// router.get('/Recipes/:userId', function(req, res) {
// 	mongoose.model('Recipes').find({user: req.params.userId}, function(err, recipes) {
// 		mongoose.model('Recipes').populate(recipes, {path: 'User'}, function(err, recipes) {
// 			res.send(recipes);
// 		});
// 	});
// });


module.exports = router;