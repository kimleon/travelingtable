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
  /**Get heatmap page*/
  router.get('/Heatmap', function(req, res) {
    res.render('heatmap');
  });
    /* GET home page. */
  router.get('/', function(req, res) {
    res.render('home');
  });

  router.post('/getHeatMapData', function(req, res){
    console.log('trying to get marker data for heatmaps');
    mongoose.model('Marker').find(function(err, all_markers){
      if (err) {
        console.log('error in finding all markers for heatmap', err);
        return;
      }
      return_array = []
      all_markers.forEach(function(marker){
        if (typeof marker.upvotes === 'undefined'){
          upvotes = 0;
        } else {
          upvotes = marker.upvotes;
        }
        if (typeof marker.views === 'undefined'){
          views = 0;
        } else {
          views = marker.views;
        }
        cur_array = [marker.latitude, marker.longitude, upvotes, views]
        return_array.push(cur_array);
      });
      console.log(return_array);

      res.json({
        markers: return_array
      });
    }); 
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

  
  //search works for multiple words
  //search only goes by recipe name
  router.post('/Search/:search_input', function(req, res) {
    var final_find = "";
    var search_keywords = req.param('search_input');
    console.log("the search input");
    console.log(search_keywords);
    var split = search_keywords.split(" ");
    for (i in split) {
      final_find += split[i]+"|";
    }
    //following line removes the last comma
    final_find = final_find.substring(0, final_find.length - 1);
    console.log("final find");
    console.log(final_find);
    search_array = []
    //finds recipes containing search words
    recipes.Recipe.find({ name: {$regex : '.*'+final_find+'.*'}}, function(err, results){
      results.forEach(function(recipe){
        //array of arrays with result ids, names, dish types
        cur_array = [recipe._id, recipe.name, recipe.dish_type]
        search_array.push(cur_array);
      });
      console.log("we are here");
      console.log(search_array);
      //send array of result arrays to kiran
      res.json({
        search_array: search_array
      });
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
        message: ' '
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
    res.json({ //sends info to specify what should now be shown in the nav bar
          loggedIn: true,
          message: ' '
    });  
  });

  /*Figure out if logged in user has dietary restrictions*/
  router.post('/getRestrictions', isLoggedIn, function(req, res) {
    res.json({
      vegetarian: req.user.vegetarian,
      vegan: req.user.vegan,
      allergies: req.user.allergies,
      gluten_free: req.user.gluten_free
    });
  });


  /*TRY TO ACCESS YOUR OWN PROFILE: should be protected to when you are logged in*/
  router.get('/Profile:id', isLoggedIn, function(req, res) {
    var userId = req.param('id');
    var vegetarian = req.body.vegetarian;
    var vegan = req.body.vegan;
    var allergies = req.body.allergies;
    var gluten = req.body.gluten;
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
    console.log('this post request is happening new recip');
    console.log('ingredients', req.body.ingredients)
    console.log('steps', req.body.steps);
    var newRecipe = new recipes.Recipe({
      name: req.body.recipe_name,
      image: req.body.recipe_image,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      dish_type: req.body.dish_type,
      userId: req.user._id,
      allergies: req.body.allergies,
      gluten: req.body.gluten_free,
      vegan: req.body.vegan,
      vegetarian: req.body.vegetarian,
      upvotes: 0,
      views: 0,
      ingredients: req.body.ingredients,
      prep_time: req.body.est_time,
      instructions: req.body.steps
    });
    //console.log(req.body.steps, 'steps');
    //console.log(req.body.ingredients, 'ingredients');

    newRecipe.save(function(err, result) {
      if (err)
        console.log('something with recipes going wrong', err);
      //console.log(result);
      //console.log(req.user.recipe_list)
      var newMarker = new markers.Marker({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            recipeId: result._id,
            vegetarian: result.vegetarian,
            vegan: result.vegan,
            allergies: result.allergies,
            gluten: result.gluten,
            dish_type: result.dish_type,
            upvotes: result.upvotes,
            views: result.views,
            recipe_title: result.name
          });
      console.log(newMarker);
      users.User.findOneAndUpdate(
        {_id:req.user._id}, 
        {$push: {recipe_list: result._id}}, 
        function () {
          console.log('trying to save the new marker')
          newMarker.save(function(err, result2) {
            if (err)
              console.log('what is going on savign marker', err)
            //console.log('result 2', result2);
            res.redirect('/new_recipe');  
          });
      });
    });
  });

  router.post('/updateRestrictions', isLoggedIn, function(req, res) {
    user = req.user;
    console.log(req.user.username);
    vegetarian2 = req.body.vegetarian;
    console.log(vegetarian2)
    vegan2 = req.body.vegan;
    allergies2 = req.body.allergies;
    gluten_free2 = req.body.gluten_free;
    console.log('old vegetarian', user.vegetarian)
    users.User.findOneAndUpdate({_id: user._id}, 
      {$set: {
        vegetarian: vegetarian2,
        vegan: vegan2,
        allergies: allergies2,
        gluten_free: gluten_free2}},
      function(err, result) {
        console.log('new vegetarian', result.vegetarian);
        res.redirect('/Profile')
      });
  });

/*RENDERING ALL MARKERS for new page (searches for new markers to send)*/
router.post('/findMarkers', function(req, res) {
  //initial zoom for page set
  var bottom = req.body.bottom_coord
  var top = req.body.top_coord
  var left = req.body.left_coord
  var right = req.body.right_coord
  //var locations = req.body.locations //already stored markers
  console.log(bottom, top, left, right)
  new_markers = []

  //now do a different query if the user is logged in
  if (req.isAuthenticated()) {
    if (req.user.vegetarian === true) {
      vegetarian_arr = [true]
    } else {
      vegetarian_arr = [true, false]
    }
    if (req.user.vegan === true) {
      vegan_arr = [true]
    } else {
      vegan_arr = [true, false]
    }
    if (req.user.allergies === true) {
      allergies_arr = [true]
    } else {
      allergies_arr = [true, false]
    }
    if (req.user.gluten_free === true) {
      gluten_free_arr = [true]
    } else {
      gluten_free_arr = [true, false]
    }
    mongoose.model('Marker').find({ $and: 
      [{ latitude: { $gte: bottom, $lte: top }},
      {longitude: {$gte: left, $lte: right}},
      {vegetarian: {$in: vegetarian_arr}},
      {vegan: {$in: vegan_arr}},
      {gluten: {$in: gluten_free_arr}},
      {allergies: {$in: allergies_arr}}]}, 
      function(err, returned_markers) {
        if (err) {
          console.log('find markers error', err);
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
  } else {
    mongoose.model('Marker').find({ $and: 
      [{ latitude: { $gte: bottom, $lte: top } },
      {longitude: {$gte: left, $lte: right}}]}, 
      function(err, returned_markers) {
        if (err) {
          console.log('find markers error', err);
          return;
        }        
        //push all of the marker items to send to front end
        returned_markers.forEach(function(marker) {
          var cur_array = [marker._id, marker.latitude, marker.longitude, marker.dish_type, marker.upvotes]
          new_markers.push(cur_array)
        });
        //console.log('marker array', new_markers);
        res.json( {
          new_markers: new_markers
        });
      });
    }
  });

  router.post('/findUserMarkers', function(req, res) {
    user = req.user;
    recipe_list = req.user.recipe_list;
    console.log('User recipe list', recipe_list)
    //initial zoom for page set
    var bottom = req.body.bottom_coord;
    var top = req.body.top_coord;
    var left = req.body.left_coord;
    var right = req.body.right_coord;
    //var locations = req.body.locations //already stored markers
    console.log(bottom, top, left, right)
    new_markers = []

    mongoose.model('Marker').find({ $and: 
      [{ latitude: { $gte: bottom, $lte: top }},
      {longitude: {$gte: left, $lte: right}},
      {recipeId: {$in: recipe_list}}]}, 
      function(err, returned_markers){
      if (err) {
        console.log('error in find recipes associated with this user', err);
      }
      //push all of the marker items to send to front end
      returned_markers.forEach(function(marker) {
      var cur_array = [marker._id, marker.latitude, marker.longitude]
      new_markers.push(cur_array);
      });

      console.log('new_markers array', new_markers)

      res.json({
        new_markers: new_markers
      });
    });

  });

  //recieving and displaying the recipe info for the marker on a modal
  router.post('/viewRecipe', function(req, res) {
    //console.log('getting to post reques');
    var markerID = req.body.markerID
    //console.log(markerID)
    mongoose.model('Marker').findOneAndUpdate(
      { _id: markerID }, 
      {$inc: {views: 1}},
      function(err, marker) {
      if (err) {
        console.log('error in retrieving marker below:');
        console.log(err);
        return;
      }
      //marker = markerResult[0]
      mongoose.model('Recipe').findOneAndUpdate(
      {_id: marker.recipeId}, 
      {$inc: {views: 1}},
      function(err, recipeResult) {
        if (err) {
          console.log('error in retrieving recipe shown');
          console.log(err)
          return;
        }
        //recipeResult = recipe[0]
        //console.log('current recipe name')
        //console.log(recipeResult.name);
        if (typeof recipeResult.ingredients === 'undefined') {
          var ingredients = []
        } else {
          var ingredients = recipeResult.ingredients;
        }
        if (typeof recipeResult.instructions === 'undefined') {
          var instructions = []
        } else {
          var instructions = recipeResult.instructions;
        }
        if (typeof recipeResult.prep_time === 'undefined') {
          var prep_time = 0
        } else {
          var prep_time = recipeResult.prep_time;
        }
        //console.log(prep_time, 'prep_time')
        //console.log(instructions, 'instructions')
        console.log('views', recipeResult.views);
        //console.log(ingredients, 'ingredients');
        res.json ({
          recipe_name: recipeResult.name,
          recipe_type: recipeResult.dish_type,
          recipe_image: recipeResult.image,
          vegan: recipeResult.vegan,
          vegetarian: recipeResult.vegetarian,
          gluten: recipeResult.gluten,
          allergies: recipeResult.allergies,
          upvotes: recipeResult.upvotes,
          dish_type: recipeResult.dish_type,
          ingredients: ingredients,
          instructions: instructions,
          prep_time: prep_time,
          views: recipeResult.views
        });
      });
    });
  });

  /*VIEWING ONE'S PROFILe*/
  router.get('/Profile', isLoggedIn, function(req, res) {
    console.log(req.user.username);
    var user_recipes = req.user.recipe_list
    var vegetarian = req.user.vegetarian
    var vegan = req.user.vegan;
    var gluten_free = req.user.gluten_free;
    var allergies = req.user.allergies;
    arr = []
    if (user_recipes.length !==0) {
    console.log('user recipes below:');
    console.log(user_recipes);
     mongoose.model('Recipe').find({ _id: { $in: user_recipes}}, function(err, foods) {
        if (err) {
          console.log('error in finding recipe associated with user');
          console.log(err);
          return;
        }
        
        foods.forEach(function(food) { 
        cur_array = [food.dish_type, food.name, food._id];
        arr.push(cur_array);
         });
        res.render('profile', {
          username: req.user.username,
          recipetitle: arr
        });
      });
      } else {
      res.render('profile', {
        username: req.user.username,
        recipetitle: "Sorry you have not entered any recipes! please do or else we will disown you."
      });
    }      
  });
  
  /*Decide if a user CAN vote when the recipe is opened */
  router.post('/canUpvote', isLoggedIn, function(req, res) {
    markerID = req.body.markerID
    user = req.user;
    upvoted_recipes = user.upvoted_recipes;
    mongoose.model('Marker').find(
      {_id: markerID}, function(err, result) {
        if (err) {
          console.log('error in finding can upvote info', err);
          return;
        }
        recipeID = result.recipeId;
        mongoose.model('Recipe').find({ $and: 
      [{ _id: recipeID},
      {_id: {$nin: upvoted_recipes}}]}, 
      function(err, result) {
        if (err) {
          console.log(err, "error with can upvote route")
          return;
        }
        if (typeof result !== 'undefined' && result.length > 0) {
          res.json({
            upvoted: true
          });
        } else {
          res.json({
            upvoted: false
          });
        }

      });
    });
  });

  
  router.post('/Upvote', isLoggedIn, function(req, res) {
    markerID = req.body.markerID
    user = req.user
    mongoose.model('Marker').findOneAndUpdate(
    {_id: markerID}, 
    {$inc: {upvotes: 1}},
    function(err, result){
      if (err) {
        console.log('error in finding marker associated with upvote request', err);
      }
      recipeId = result.recipeId
      mongoose.model('Recipe').findOneAndUpdate(
        {_id: recipeId}, 
        {$inc: {upvotes: 1}}, 
        function(err, recipe) {
          if (err) {
            console.log('error in finding recipe associated with this id', err);
          }
          recipe_upvotes = recipe.upvote; //store recipe upvotes
          mongoose.model('User').findOneAndUpdate(
            {_id:req.user._id}, 
            {$push: {upvoted_recipes: recipeId}}, 
            function(err, result) {
              if (err) {
              console.log('error having user upvote this recipe in database', err);
              }
              res.json({
                upvoted: true
          });
        });

        });
    });

  });


/*VIEWING A SEARCH QUERY FROM A LINK*/
router.post('/findRecipeOnMap', function(req, res) {
  var recipeId = req.body.recipeId; //info from ajax get request
  mongoose.model('Marker').find(
    {recipeId: recipeId}, 
    function(err, markers) {
      if (err){
        console.log('error in finding associated marker given the recipe id');
        console.log(err);
      }
      marker = markers[0]
      res.json({
        latitude: marker.latitude,
        longitude: marker.longitude
      });
    });
  });

/*Viewing top 5 recipes on the map within a given bounds*/
router.post('/findTop5', function(req, res) {
  var bottom = req.body.bottom_coord
  var top = req.body.top_coord
  var left = req.body.left_coord
  var right = req.body.right_coord

  //console.log(bottom, top, left, right)
  recipe_results = []
  mongoose.model('Recipe').find({ $and: 
      [{ latitude: { $gte: bottom, $lte: top }},
      {longitude: {$gte: left, $lte: right}}]},
      function(err, returned_recipes){
      if (err) {
        console.log('error in find recipes associated with this top 5 query', err);
      }
      //push all of the recipe items to send to front end
      returned_recipes.forEach(function(recipe) {
      var cur_array = [recipe._id, recipe.latitude, recipe.longitude, recipe.upvotes]
      recipe_results.push(cur_array);
      });

      res.json({
        recipes: recipe_results
      });
    });
 });
return router;
}


