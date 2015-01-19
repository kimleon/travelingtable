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
  res.json({
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
    //was trying things out will delete this later this is useful for doing markers
    mongoose.model('User').find({ username: { $nin: [ 'deepti', 'victorhung' ] }}, function(err, items) {
        if (err) {
        console.log(err);
        return;
        }
        arr = []
        items.forEach(function(user) { 
          arr.push(user.username)
        });
        console.log(arr)

        res.json({ //sends info to specify what should now be shown in the nav bar
          loggedIn: true,
          message: req.flash('loginMessage')
    });
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
  //NOT SURE YET HOW TO DO THE OTHER THING OR EVEN WHY IT IS IMPORTANT LIKE WTF

  


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

/*RENDERING ALL MARKERS for new page (searches for new markers to send)*/

router.post('/findMarkers', function(req, res) {
  //initial zoom for page set
  var bottom = req.body.bottom_coord
  var top = req.body.top_coord
  var left = req.body.left_coord
  var right = req.body.right_coord
  var locations = req.body.locations //already stored markers
 

  new_markers = []
  mongoose.model('Marker').find({ $and: 
    [{ latitude: { $gte: bottom, $lte: top } },
    {longitude: {$gte: left, $lte: right}},
    {_id: {$nin: locations}}]}, function(err, returned_markers) {
      if (err)
        return;
      //push all of the marker items to send to front end
      returned_markers.forEach(function(marker) {
        var cur_array = [marker._id, marker.latitude, marker.longitude]
        new_markers.push(cur_array)
      });
      console.log('marker array', new_markers);
      res.json( {
        new_markers: new_markers
      });
    });

  });

     
  
  //How do I pass in the user IDs, How do I get the latitude and longitude 

  router.post('/newFindMarkers', function(req, res) {
  //initial zoom for page set
  //var locations = req.body.locations //already stored markers
  //console.log('locations')
  //console.log(locations)
  new_markers = []
  mongoose.model('Marker').find(
    {}, function(err, returned_markers) {
      if (err) {
        console.log(err)
        return;
      }
        
      //push all of the marker items to send to front end
      returned_markers.forEach(function(marker) {
        var cur_array = [marker._id, marker.latitude, marker.longitude]
        new_markers.push(cur_array)
      });
      console.log('marker array', new_markers);
      res.json( {
        new_markers: new_markers
      });
    });

  });

  //recieving and displaying the recipe info for the marker on a modal
  router.post('/viewRecipe', function(req, res) {
    var markerID = req.body.markerID
    mongoose.model('Marker').find(
      { _id: markerID }, function(err, markerResult) {
      if (err) {
        console.log('error in retrieving marker below:');
        console.log(err);
        return;
      }
      mongoose.model('Recipe').find(
      {_id: markerID.recipeId}, 
      function(err, recipeResult) {
        if (err) {
          console.log('error in retrieving recipe shown');
          console.log(err)
          return;
        }
        res.json ({
          recipe_name: recipeResult.name,
          recipe_type: recipeResult.dish_type,
          recipe_image: recipeResult.image,
          vegan: recipeResult.vegan,
          vegetarian: recipeResult.vegetarian,
          gluten: recipeResult.gluten,
          allergies: recipeResult.allergies,
          upvotes: recipeResult.upvotes
        });
      });
    });
  });

  /*VIEWING ONE'S PROFILe*/
  router.get('/Profile', isLoggedIn, function(req, res) {
    console.log(req.user);
    mongoose.model('User').find(
      {_id: req.user._id},
      function(err, user_result) {
        if (err) {
          console.log('error in finding the user below:');
          console.log(err);
          return;
        }
        var user_recipes = user_result.recipe_list
         mongoose.model('Recipe').find({ _id: { $in: user_recipes}}, function(err, foods) {
            if (err) {
              console.log('error in finding recipe associated with user');
              console.log(err);
              return;
            }
            arr = []
            foods.forEach(function(food) { 
            cur_array = [food.dish_type, food.name, food._id];
            arr.push(cur_array);
             });
            res.json({
              user_recipes: arr
            });
         });
      });
    });


/*VIEWING A SEARCH QUERY FROM A LINK*/
router.post('/findRecipeOnMap', function(req, res) {
  var recipeId = req.body.recipeId; //info from ajax get request
  mongoose.model('Recipe').find(
    {_id: recipeId}, 
    function(err, recipe) {
      if (err){
        console.log('error in finding associated recipe given the id');
        console.log(err);
      }
      res.json({
        latitude: recipe.latitude,
        longitude: recipe.longitude
      });
    });
});
 
return router;
}


