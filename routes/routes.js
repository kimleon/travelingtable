var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var recipes = require('../models/recipes');
var users = require('../models/users'); //user and recipe models imported

var isLoggedIn = function(req, res, next) {
	//if the user is logged in, call next() to request the next request handler
	//Passport adds this method to request an object
	//middleware allowed to add properties to request and response objects
	if (req.isAuthenticated())
		return next();
	//If not logged in session, redirect to the home page
	res.redirect('/');
}

module.exports = function(passport) {
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

  //NOTE FOR THE TWO BELOW WE WON'T ACTUALLY NEED THEM EVENTUALLY
  //URL to view list of users to check they are getting entered into te database
  router.get('/Users', function(req, res) {
    mongoose.model('Users').find(function(err, users){
      res.send(users);
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
  //  mongoose.model('Recipes').find({user: req.params.userId}, function(err, recipes) {
  //    mongoose.model('Recipes').populate(recipes, {path: 'User'}, function(err, recipes) {
  //      res.send(recipes);
  //    });
  //  });
  // });


  /*HANDLE register things POST to submit form*/ //BUT WHAT DO WE DO IF THE SIGNUP FAILS I DONT KNOW PLS HELP ME
  router.post('/Register', passport.authenticate('signup'), function(req, res){
    res.json({ //sends info to specify what should now be shown in the nav bar
      login_button: false,
      recipe_button: true,
      loggedInHelp: true
    });
    
  });

   /*HANDLE register things POST to submit form*/ //BUT WHAT DO WE DO IF THE SIGNUP FAILS I DONT KNOW PLS HELP ME
  router.post('/Login', passport.authenticate('local-login'), function(req, res){

    res.json({ //sends info to specify what should now be shown in the nav bar
      login_button: false,
      recipe_button: true,
      loggedInHelp: true
    });
  });


  /*TRY TO ACCESS YOUR OWN PROFILE: should be protected to when you are logged in*/
  router.get('/Profile:id', isLoggedIn, function(req, res) {
    var userId = req.param('id');
    users.User.findOne({_id: userId}, function(err, result){
      console.log(result);
      res.render('profile', {
        username: result.username,
        recipetitle: "none yet"
      })
    });
  });

  /*Logging out should log you out*/
  /*Handle logouts*/
  router.get('/Logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });


  return router;
}


