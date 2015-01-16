/*

 $(function() {
    $(".button").click(function() {
      // validate and process form here
    });
  }); 

 $(function() {
    $('.error').hide();
    $(".button").click(function() {
      // validate and process form here
      
      $('.error').hide();
      var username = $("input#username").val();
      if (username == "") {
        $("label#username_error").show();
        $("input#username").focus();
        return false;
      }
      
      var password = $("input#password").val();
      if (password == "") {
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
        success: function() {
          $('#login_form').html("<div id='message'></div>");
          $('#message').html("<h2>Login Form Submitted!</h2>")
          .append("<p>Enjoy the site!</p>")
          .hide()
          //.fadeIn(1500, function() {
           //});
        }
      });
      return false;


    $('#login_form').html("<div id='message'></div>");




    });
  });


*/
//<!---SIGN UP FORM-->



 $(function() {
    $(".signupbutton").click(function() {
      // validate and process form here
    });
  }); 

 $(function() {
    $('.error').hide();
    $(".signupbutton").click(function() {
      // validate and process form here
      
      $('.error').hide();
      var new_username = $("input#new_username").val();
      if (new_username == "") {
        $("label#new_username_error").show();
        $("input#new_username").focus();
        return false;
      }
      
      var new_password = $("input#new_password").val();
      if (new_password == "") {
        $("label#new_password_error").show();
        $("input#new_password").focus();
        return false;
      }
      
    var dataString = '&new_username='+ new_username +'&new_password=' + new_password;
      //alert (dataString);return false;
      $.ajax({
        type: "POST",
        url: "/Register",
        data: dataString,
        success: function() {
          $('#signup_form').html("<div id='message'></div>");
          $('#signupmessage').html("<h2>Register Form Submitted!</h2>")
          .append("<p>Enjoy the site!</p>")
          .hide()
          //.fadeIn(1500, function() {
           //});
        }
      });
      return false;


    $('#signup_form').html("<div id='signupmessage'></div>");




    });
  });

  
  