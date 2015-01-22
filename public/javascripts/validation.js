

// $(document).ready(function(){
//     if (data.loggedIn) {
//       $("#logged_in").show();
//       $("#logged_out").hide();
//     } else {
//       $("#logged_in").hide();
//       $("#logged_out").show();
//     }
// });






//<!--=========================== ONLOAD for button display =========================================-> 


function buttondisplay() {
    $.ajax({
        type: "POST",
        url: "/Refresh",
        success: function(data) {
          console.log('LOGGED in var below')
          console.log(data.authenticated);
           if (data.authenticated) {
             $("#log_out").show();
             $("#log_in").hide();
             $("#add_recipe").show();
             $("#sign_up").hide();
             $("#profile").show();
             $(".upvotebutton").show();
             $(".voted").hide();
           } else {
             $("#log_out").hide();
             $("#log_in").show();
             $("#add_recipe").hide();
             $("#sign_up").show();
             $("#profile").hide();
             $(".upvotebutton").hide();
             $(".voted").hide();
           }
}
});
};


//<!--=========================== LOGIN FORM =========================================-> 

 $(function() {
    console.log('Login function is happening')
    $('.error').hide();
    $(".button").click(function() {
      // validate and process form here
      
      $('.error').hide();
  	  var username = $("input[name=username]").val();
  		if (username === "") {
        $("label#username_error").show();
        $("input#username").focus();
        return false;
      }
  		
  		var password = $("input[name=password]").val();
  		if (password === "") {
        $("label#password_error").show();
        $("input#password").focus();
        return false;
      }
      
		var dataString = '&username='+ username +'&password=' + password;
		  //alert (dataString);return false;
		  $.ajax({
		    type: "POST",
		    url: "/Login",
		    data: dataString,
		    success: function(data) {
          console.log('LOGGED in var below')
          console.log(data.loggedIn);
          if (data.loggedIn===true) {
            $("#log_out").show();
            $("#log_in").hide();
            $("#add_recipe").show();
            $("#sign_up").hide();
  		      $('#login_form').addClass("hidden");
            $('#loginmessage').removeClass("hidden");
            $("#profile").show();
            $(".upvotebutton").show();
            $(".voted").hide();
            location.reload(true);
		      }
          //$('#message').html("<h2>Login Form Submitted!</h2>")
		      

          //.append("<p>Enjoy the site!</p>")
		      //.hide()
		      //.fadeIn(1500, function() {
		       //});
		    }
		  });
		  return false;



    $('#login_form').html("<div id='message'></div>");




    });
  });



//<!--===========================-SIGN UP FORM-=========================================->



 // $(function() {
 //    $(".signupbutton").click(function() {
 //      // validate and process form here
 //    });
 //  }); 

 $(function() {
    $('.error').hide();
    console.log("asdf");
    console.log($(".signupbutton"));
    $(".signupbutton").click(function() {
    //$("#submit_btn.signupbutton.btn-large").submit(function() {
      // validate and process form here
      console.log('button click happening');
      $('.error').hide();
      var new_username = $("input[name=new_username]").val();
      console.log(new_username);
      if (new_username === "") {
        $("label#new_username_error").show();
        $("input#new_username").focus();
        return false;
      }
      
      var new_password = $("input[name=new_password]").val();
      console.log(new_password);
      if (new_password === "") {
        $("label#new_password_error").show();
        $("input#new_password").focus();
        return false;
      }
      

      var vegetarian = $("input[name=vegetarian]").prop("checked");
      var vegan = $("input[name=vegan]").prop("checked");
      var gluten_free = $("input[name=gluten-free]").prop("checked");
      var allergies = $("input[name=allergies]").prop("checked");


		  var dataString3 = '&new_username='+ new_username +'&new_password=' + new_password+'&vegetarian=' + vegetarian + '&vegan=' + vegan + '&gluten_free=' + gluten_free + '&allergies=' + allergies;
		  //alert (dataString);return false;

		  $.ajax({
		    type: "POST",
		    url: "/Register",
		    data: dataString3,
		    success: function(data) {
            console.log(data.loggedIn);
            if (data.loggedIn===true) {
            $("#log_out").show();
             $("#log_in").hide();
             $("#add_recipe").show();
             $("#sign_up").hide();
             $("#profile").show();
             $(".upvotebutton").show();
             $(".voted").hide();
             //$("#" + signupmessage).toggle();
            //$('#signup_form').html("<div id='signupmessage'><h2>Registration form submitted!</h2><p>Welcome gobi!</p></div>");
            $('#signup_form').addClass("hidden");
            //$('#signup_message').show();
            $('#signupmessage1').removeClass("hidden");

            location.reload(true);

            }
            
		      //$('#signupmessage').html("<h2>Registration form submitted!</h2>")
		      //.append("<p>Welcome gobi!</p>")
		      //.hide()
		      //.fadeIn(1500, function() {
		       //});
		    }
		  });
		  return false;



    //$('#signup_form').html("<div id='signupmessage'></div>");




    });
  });

  


//<!--=========================== RECIPE FORM-=========================================->
//limit input into the time estimated for prep field
  function isNumberKey(evt)
      {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode!==190 && charCode!==46 && charCode!==62)
            return false;

         return true;
      }


 $(function() {
    console.log('this recipe submit button is happening')
    $('.error').hide();
    $(".recipebutton").click(function() {
      //console.log(counterbox);
      //console.log(counter);
      //var test = $("input[name='boxinput1']").val();
      //console.log(test);


      var ingredients = [];
      //console.log(counterbox);

      for (var i=1; (i<counterbox+1); i++) {
        //console.log(counterbox);
        //var test = $("input[name='boxinput"+i+"']").val();
        //console.log(test);
        ingredients.push($("input[name='boxinput"+i+"']").val());
      };

      //console.log(ingredients);

      //console.log(ingredients);


      var steps = [];
      //console.log(counterbox);

      for (var i=1; (i<counter+1); i++) {
        //console.log(counterbox);
        //var test = $("input[name='input"+i+"']").val();
        //console.log(test);
        steps.push($("textarea[name='input"+i+"']").val());
      };
      console.log(steps);

      //console.log(steps);

      // validate and process form here
      
      $('.error').hide();
      console.log("Is this happening")

      var latitude = latLng.lat();
      var longitude = latLng.lng();
  	  var recipe_name = $("input[name=recipe_name]").val();
  		if (recipe_name === "") {
        $("label#recipe_name_error").show();
        $("input#recipe_name").focus();
        return false;
      }
  		
  		 var dish_type = $('#sel1 :selected').text();
      if (dish_type === "Choose one!") {
        $('label#dish_type_error').show();
        $('input#sel1').focus();
        return false;
      }





      var est_time = $("input[name=est_time]").val();
      if (est_time === "") {
        $('label#est_time_error1').show();
        $('input#est_time').focus();
        return false;
      }
      if (typeof est_time-1 === 'number' && est_time !== "") {
        $('label#est_time_error2').show();
        $('input#est_time').focus();
        return false;
      }


      var recipe_image = $("input[name=recipe_image]").val();
  		if (recipe_image === "") {
        $("label#recipe_image_error").show();
        $("input#recipe_image").focus();
        return false;
      }

      //dessert, entree, or appetizer
      //var dish_type = $("#dish_type option:selected").text();


      var vegetarian = $("input[name=vegetarian]").prop("checked");
      var vegan = $("input[name=vegan]").prop("checked");
      var gluten_free = $("input[name=gluten-free]").prop("checked");
      var allergies = $("input[name=allergies]").prop("checked");
      console.log("are we getting here")
		  var dataString2 = '&recipe_name='+ recipe_name +'&recipe_image=' + recipe_image + '&dish_type=' + dish_type
                        +'&vegetarian=' + vegetarian + '&vegan=' + vegan + '&gluten_free=' + gluten_free + '&allergies=' + allergies
                        +'&latitude=' + latitude + '&longitude=' + longitude + "&ingredients="+ingredients+"&steps="+steps + "&est_time="+est_time;
		  //alert (dataString);return false;
      console.log("are we getting to this 2nd here")
		  $.ajax({
		    type: "POST",
		    url: "/new_recipe",
		    data: dataString2,
		    success: function() {
		      $('#recipe_form').html("<div id='recipemessage'><h2>Recipe submitted!</h2><p>Thank you so much for your contribution!</p></div>");
          //setTimeout(function() { 
              window.location.href = '/'; 
            //}, 2000);
          //$('#recipemessage').html("<h2>Recipe submitted!</h2>")
		      //.append("<p>Thank you so much for your contribution!</p>")
		      //.hide()
		      //.fadeIn(1500, function() {
		       //});
		    }
		  });
		  return false;


    $('#recipe_form').html("<div id='recipemessage'></div>");




    });
  });






//<!--=========================== Dietary Preference Edit =========================================->

 $(function() {
    $(".dietprefbutton").click(function() {
      console.log('this is being called')

      var vegetarian = $("input[name=vegetarian]").prop("checked");
      var vegan = $("input[name=vegan]").prop("checked");
      var gluten_free = $("input[name=gluten-free]").prop("checked");
      var allergies = $("input[name=allergies]").prop("checked");
      console.log("are we getting the prefs")
      
      var dataString5 = '&vegetarian=' + vegetarian + '&vegan=' + vegan + '&gluten_free=' + gluten_free + '&allergies=' + allergies;
  

      $.ajax({
            type: "POST",
            url: "/updateRestrictions",
            data: dataString5,
            success: function() {
              $('#submitted').removeClass("hidden");
              $('#submitted').addClass("informatiemelding");
              jQuery("div.informatiemelding").delay(2000).fadeOut("slow");

            }
          });


    });
  });
          //alert (dataString);return false;





//<!--=========================== SEARCH FORM-=========================================->
/*
$(function() {
    console.log('Search function is happening')
    $('.error').hide();
    $(".search_button").click(function() {
      // validate and process form here
      
      $('.error').hide();
      var search_input = $("input[name=search_input]").val();
      if (search_input === "") {
        //$("label#search_input_error").show();
        //$("input#search_input").focus();
        return false;
      }
    var search_text = search_input; 
    console.log("hereeee");
    console.log(search_text); 
      //alert (dataString);return false;
      $.ajax({
        type: "POST",
        url: "/Search/"+search_text,
        data: dataString
          //$('#message').html("<h2>Login Form Submitted!</h2>")
          

          //.append("<p>Enjoy the site!</p>")
          //.hide()
          //.fadeIn(1500, function() {
           //});
        }
      });
      return false;



    $('#search_form').html("<div id='message'></div>");




    });
  });

*/





//<!--=========================== Logout =========================================->

 $(function() {
    $(".logoutbutton2").click(function() {
      // validate and process form here

             $("#log_out").hide();
             $("#log_in").show();
             $("#add_recipe").hide();
             $("#sign_up").show();
             $("#profile").hide();
             $('#signup_form').removeClass("hidden");
             $("#login_form").removeClass("hidden");
             $("#loginmessage").addClass("hidden");
             $(".upvotebutton").hide();
             $(".voted").hide();
            //$('#signup_message').show();
            $('#signupmessage1').addClass("hidden");

            location.reload(true);

		$.ajax({
		    type: "POST",
		    url: "/Logout",
		    //data: status
		});
		return false;
});

});