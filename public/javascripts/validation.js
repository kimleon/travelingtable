

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
             $("#logged_in").show();
             $("#logged_out").hide();
           } else {
             $("#logged_in").hide();
             $("#logged_out").show();
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
          $('#logged_out').hide();
          $('#logged_in').show();
		        $('#login_form').html("<div id='message'><h2>Login Form Submitted!</h2></div>");
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
      
		var dataString3 = '&new_username='+ new_username +'&new_password=' + new_password;
		  //alert (dataString);return false;

		  $.ajax({
		    type: "POST",
		    url: "/Register",
		    data: dataString3,
		    success: function(data) {
            console.log(data.loggedIn);

            $('#logged_out').hide();
            $('#logged_in').show();
		        $('#signup_form').html("<div id='signupmessage'><h2>Registration form submitted!</h2><p>Welcome gobi!</p></div>");
		      //$('#signupmessage').html("<h2>Registration form submitted!</h2>")
		      //.append("<p>Welcome gobi!</p>")
		      //.hide()
		      //.fadeIn(1500, function() {
		       //});
		    }
		  });
		  return false;


 	$('#logged_out').hide();
 	$('#logged_in').show();


    $('#signup_form').html("<div id='signupmessage'></div>");




    });
  });

  


//<!--=========================== RECIPE FORM-=========================================->



 $(function() {
    console.log('this recipe submit button is happening')
    $('.error').hide();
    $(".recipebutton").click(function() {
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
  		
  		var recipe_image = $("input[name=recipe_image]").val();
  		if (recipe_image === "") {
        $("label#recipe_image_error").show();
        $("input#recipe_image").focus();
        return false;
      }

      //dessert, entree, or appetizer
      var dish_type = $("#dish_type option:selected").text();

      var vegetarian = $("input[name=vegetarian]").prop("checked");
      var vegan = $("input[name=vegan]").prop("checked");
      var gluten_free = $("input[name=gluten-free]").prop("checked");
      var allergies = $("input[name=allergies]").prop("checked");
      console.log("are we getting here")
		  var dataString2 = '&recipe_name='+ recipe_name +'&recipe_image=' + recipe_image + '&dish_type=' + dish_type
                        +'$vegetarian=' + vegetarian + '&vegan=' + vegan + '&gluten_free=' + gluten_free + '&allergies=' + allergies
                        +'&latitude=' + latitude + '&longitude=' + longitude;
		  //alert (dataString);return false;
      console.log("are we getting to this 2nd here")
		  $.ajax({
		    type: "POST",
		    url: "/new_recipe",
		    data: dataString2,
		    success: function() {
		      $('#recipe_form').html("<div id='recipemessage'><h2>Recipe submitted!</h2><p>Thank you so much for your contribution!</p></div>");
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


//<!--=========================== Logout =========================================->

 $(function() {
    $(".logoutbutton").click(function() {
      // validate and process form here


 $(function() {
 	$('#logged_in').hide();
 	$('#logged_out').show();

		$.ajax({
		    type: "POST",
		    url: "/Logout"
		    //data: status
		});
		return false;
});

});
}); 
  