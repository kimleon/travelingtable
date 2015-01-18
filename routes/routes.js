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
  router.get('/RegisterFail', function(req, res){
    console.log(req.flash('signupMessage'))
    res.json ({
      loggedIn: false,
      message: req.flash('signupMessage')
    });
    });

  router.get('/Register', function(req, res){
    console.log(req.flash('signupMessage'))
    res.json ({
      loggedIn: true,
      message: req.flash('signupMessage')
    });
    });

  /*Actual form for register*/
  router.post('/Register', passport.authenticate('signup', {
    successRedirect: '/Register',
    failureRedirect: '/RegisterFail',
    failureFlash: true
  }))

  /*Actual form for login*/
  router.post('/Login', passport.authenticate('local-login', {
    successRedirect: '/Login',
    failureRedirect: '/LoginFail',
    failureFlash: true
  }))

  router.get('/LoginFail', function(req, res) {
    console.log(req.flash('loginMessage'))
    res.json({
      loggedIn: false,
      message: req.flash('loginMessage')
    });
  });


   /*HANDLE login things POST to submit form*/ //BUT WHAT DO WE DO IF THE SIGNUP FAILS I DONT KNOW PLS HELP ME
  router.get('/Login', function(req, res){
    console.log(mongoose.model('Marker').find().count());
    res.json({ //sends info to specify what should now be shown in the nav bar
      loggedIn: true,
      message: req.flash('loginMessage')
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
      dish_type: req.body.dish_type,
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

/*RENDERING ALL MARKERS for new page*/
/*
router.post('/findMarkers', function(req, res) {
  //initial zoom for page set
  var bottom = req.body.bottom_coord
  var top = req.body.top_coord
  var left = req.body.left_coord
  var right = req.body.right_coord
  var locations = req.body.locations //already stored markers
  var length = req.body.len //SEND kiran current length of the database
  markers_to_post = []
  markers.Marker.find().forEach(function(marker) {
    if ((left <= marker.longitude) && (marker.longitude<= right)) {
      if ((bottom <= marker.latitude) && (marker.latitude<= top)) {
        if (locations.indexOf(marker._id) !== -1)
          cur_marker = [marker._id, marker.latitude, marker.longitude];
          markers_to_post.push(cur_marker);
      }
    }

  res.json({
    locs: markers_to_post
    len: length
  });

  });
});
*/
     
  
  //How do I pass in the user IDs, How do I get the latitude and longitude 

 
  return router;
}


