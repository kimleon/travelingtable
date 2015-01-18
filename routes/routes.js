var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var recipes = require('../models/recipes');
var users = require('../models/users'); //user and recipe models imported
var markers = require('../models/markers'); //marker schema
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
    mongoose.model('User').find(function(err, Users) {
      res.send(Users);
    });
  });

  //list of recipes
  router.get('/Recipes', function(req, res) {
    mongoose.model('Recipe').find(function(err, recipes) {
      res.send(recipes);
    });
  });

  //NOTE FOR THE TWO BELOW WE WON'T ACTUALLY NEED THEM EVENTUALLY
  //URL to view list of users to check they are getting entered into te database
  router.get('/Users', function(req, res) {
    mongoose.model('User').find(function(err, users){
      res.send(users);
    });
  });

  router.get('/Markers', function(req, res) {
    mongoose.model('Marker').find(function(err, markers){
      res.send(markers);
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
    res.json ({
      loggedIn: true
    });
    });





   /*HANDLE register things POST to submit form*/ //BUT WHAT DO WE DO IF THE SIGNUP FAILS I DONT KNOW PLS HELP ME
  router.post('/Login', passport.authenticate('local-login'), function(req, res){
    console.log('above')
    console.log(req.user._id);
    console.log('Logout route happening');
    res.json({ //sends info to specify what should now be shown in the nav bar
      loggedIn: true
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

  


  /*For page refreshes-check if user is logged in*/
  router.post('/Refresh', function(req, res) {
    if (req.isAuthenticated()) {
      console.log('sending back an authenticated session');
      res.json({
        authenticated: true
      });
    }
    else {
      console.log('sending back a not authenticated session');
      res.json({
        authenticated: false
      });
    }
  });

  router.get('/Profile', isLoggedIn, function(req, res) {
    console.log(req.user);
    
    
    res.render('profile', {username: req.user.username, recipetitle: "Gobi"});
  });

  /*Logging out should log you out*/
  /*Handle logouts*/
  router.post('/Logout', function(req, res) {
    console.log('logout');
    console.log("before", req.user.username);
    console.log('logging out');
    req.logout();
    //console.log("after", req.user.username);
    res.redirect('/');
    
  });

  /*Adding a new recipe sends you to addrecipe.ejs*/
  router.get('/new_recipe', isLoggedIn, function(req, res) {
    res.render('addrecipe');
  });

  //Post on new recipe page
  router.post('/new_recipe', function(req, res) {
    // store itthe submitted recipe
    console.log('this post request is happening');
    var newRecipe = new recipes.Recipe({
      name: req.body.recipe_name,
      image: req.body.recipe_image,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      userId: req.user._id,
      allergies: req.body.allergies,
      gluten: req.body.gluten,
      vegan: req.body.vegan,
      vegetarian: req.body.vegetarian,
      upvotes: 0
    });
    console.log(req.body.vegetarian)

    newRecipe.save(function(err, result) {
      console.log(result);
      console.log(req.user.recipe_list)
      var newMarker = new markers.Marker({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            recipeId: result._id
          });
      users.User.findOneAndUpdate(
        {_id:req.user._id}, 
        {$push: {recipe_list: result._id}}, 
        function () {
          newMarker.save(function(err, result2) {
            console.log(result2);
            res.redirect('/new_recipe');  
          });
      });
    });
  });
     
  
  //How do I pass in the user IDs, How do I get the latitude and longitude 

 
  return router;
}


