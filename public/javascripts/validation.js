

// $(document).ready(function(){
//     if (data.loggedIn) {
//       $("#logged_in").show();
//       $("#logged_out").hide();
//     } else {
//       $("#logged_in").hide();
//       $("#logged_out").show();
//     }
// });




console.log('Why are you inspecting the element? We feel slightly violated and hurt. Have a nice day though! -Love, the Global Gobis');

//<!--=========================== ONLOAD for button display =========================================-> 


function buttondisplay() {
    $.ajax({
        type: "POST",
        url: "/Refresh",
        success: function(data) {
          // console.log('LOGGED in var below')
          // console.log(data.authenticated);
           if (data.authenticated) {
             $("#log_out").show();
             $("#log_in").hide();
             $("#add_recipe").show();
             $("#sign_up").hide();
             $("#profile").show();
             $(".upvotebutton").hide();
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
function loginvalidate(event) {
 //$(function() {
    //console.log('Login function is happening')
    $('.error').hide();

    event.preventDefault();

    //$(".button").click(function() {
      // console.log('login button');
      // validate and process form here
      
      $('.error').hide();
      var username = $("input[name=username]").val();
      if (username === "") {
        $("label#username_error").show();
        $("input#username").focus();
        return false;
      }

      if( /[^a-zA-Z0-9]/.test( username ) ) {
        $("label#username_error2").show();
        $("input#username").focus();
        return false;
      }
      
      var password = $("input[name=password]").val();
      password = password.replace(/[^a-zA-Z 0-9&#@?!,.:;-_]+/g,'');
      password = password.replace(/</g,'');
      password = password.replace(/>/g,'');
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
          // console.log('LOGGED in var below')
          // console.log(data.loggedIn);
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
          } else {
            //$('#loginfail').html('failure to log in');
            // console.log('failure');
            var message = data.message;
            // console.log('message = '+message);
            // console.log(data.message[0]);
              $('#loginfail').html(message);
              //$('#loginfail').addClass("informatiemelding");
              //jQuery("div.informatiemelding").delay(2000).fadeOut("slow");
            //show failure to login
          }
          //$('#message').html("<h3>Login Form Submitted!</h3>")
          

          //.append("<p>Enjoy the site!</p>")
          //.hide()
          //.fadeIn(1500, function() {
           //});
        }
      });
      return false;



    $('#login_form').html("<div id='message'></div>");




    //});
  };



//<!--===========================-SIGN UP FORM-=========================================->



 // $(function() {
 //    $(".signupbutton").click(function() {
 //      // validate and process form here
 //    });
 //  }); 

 function signupvalidate(event) {
    $('.error').hide();
    event.preventDefault();

    //$(".signupbutton").click(function() {
    //$("#submit_btn.signupbutton.btn-large").submit(function() {
      // validate and process form here
      // console.log('signup happening');
      $('.error').hide();
      var new_username = $("input[name=new_username]").val();
      // console.log(new_username);
      if (new_username === "") {
        $("label#new_username_error").show();
        $("input#new_username").focus();
        return false;
      }

      if (new_username.length > 12) {
        $("label#new_username_error3").show();
        $("input#new_username").focus();
        return false;
      }
      if( /[^a-zA-Z0-9]/.test( new_username ) ) {
        $("label#new_username_error2").show();
        $("input#new_username").focus();
        return false;
      }
      
      var new_password = $("input[name=new_password]").val();
      // console.log(new_password);
      if (new_password.length > 15) {
        $("label#new_password_error3").show();
        $("input#new_password").focus();
        return false;
      }
      if( /[^a-zA-Z0-9]/.test( new_password ) ) {
        $("label#new_password_error2").show();
        $("input#new_password").focus();
        return false;
      }
      new_password = new_password.replace(/[^a-zA-Z 0-9&#@?!,.:;-_]+/g,'');
      new_password = new_password.replace(/</g,'');
      new_password = new_password.replace(/>/g,'');
      if (new_password === "") {
        $("label#new_password_error").show();
        $("input#new_password").focus();
        return false;
      }


      var confirm_password = $("input[name=confirmpassword]").val();
      if (confirm_password === '') {
        $("label#confirmpassword_error2").show();
        $("input#confirmpassword").focus();
        return false;
      }

      if (confirm_password !== new_password) {
        $("label#confirmpassword_error").show();
        $("input#confirmpassword").focus();
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
            // console.log(data.loggedIn);
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

            } else {
            $('#signupfail').html('This username is already taken!');
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




    //});
  };

  


//<!--=========================== RECIPE FORM-=========================================->



//limit input into the time estimated for prep field
  function isNumberKey(evt)
      {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode!==190 && charCode!==46 && charCode!==62)
            return false;

         return true;
      }

  function separateKey(evt)
      {
         var charCode2 = (evt.which) ? evt.which : event.keyCode
         if (charCode2===126 || charCode2===96)
            return false;

         return true;
      }

 $(function() {
    $('.error').hide();
    $(".recipebutton").click(function() {
      // console.log('recipe form submit')
      var ingredients = [];
      //console.log(counterbox);
      var last = "";
      for (var i=1; (i<counterbox+1); i++) {
        //console.log(counterbox);
        //var test = $("input[name='boxinput"+i+"']").val();
        //console.log(test);
        temp = $("input[name='boxinput"+i+"']").val();
        temp = temp.replace(/\{/g,'');
        temp = temp.replace(/\}/g,'');
        temp = temp.replace(/\$/g,'');
        temp = temp.replace(/\&/g,'and');
        temp = temp.replace(/</g,'');
        temp = temp.replace(/>/g,'');
        if (i<counterbox) {
          if (temp !== "") {
            ingredients.push(temp+"~`~");
            last = temp;
          }
        } else {
          if (temp === "") {
            ingredients.pop();
            ingredients.push(last);
          } else{
            ingredients.push(temp);
          }      
        }


      };

      var gobi = false
      var Gobi = "cauliflower"
      var Gobis = "cauliflower"
      var indiangobi = "gobi"
      var indiangobis = "gobis"
      gobi_array = [Gobi, Gobis, indiangobi, indiangobis]
      $.each(ingredients, function(ind, ingd){
        var ingd_lower= ingd.toLowerCase();
        $.each(gobi_array, function(ind, test){
          var n = ingd_lower.indexOf(test)
          if (n !== -1) {
            gobi = true
          }
        });
      });
      // console.log('gobi', gobi);

      var steps = [];
      //console.log(counterbox);
      var last2 = "";
      for (var i=1; (i<counter+1); i++) {
        //console.log(counterbox);
        //var test = $("input[name='input"+i+"']").val();
        //console.log(test);
        temp2 = $("textarea[name='input"+i+"']").val();
        temp2 = temp2.replace(/\{/g,'');
        temp2 = temp2.replace(/\}/g,'');
        temp2 = temp2.replace(/\$/g,'');
        temp2 = temp2.replace(/\&/g,'and');
        temp2 = temp2.replace(/</g,'');
        temp2 = temp2.replace(/>/g,'');
        if (i<counter) {
          if (temp2 !== "") {
            steps.push(temp2+"~`~");
            last2 = temp2;
          }       
        } else {
          if (temp2 === "") {
            steps.pop();
            steps.push(last2);
          } else {
            steps.push(temp2);
          }
        }
      };


      //console.log(steps);

      //console.log(steps);

      // validate and process form here
      
      //$('.error').hide();
      // console.log("Is this happening")
      if(latLng === false) {
        $('label#marker_error1').show();
        $('input#submit').focus();
        return false;
      } 
      var latitude = latLng.lat();
      var longitude = latLng.lng();

      var recipe_name = $("input[name=recipe_name]").val();
      if (recipe_name === "") {
        $("label#recipe_name_error").show();
        $("input#recipe_name").focus();
        return false;
      }
      recipe_name = recipe_name.replace(/\{/g,'');
      recipe_name = recipe_name.replace(/\}/g,'');
      recipe_name = recipe_name.replace(/\$/g,'');
      recipe_name = recipe_name.replace(/\&/g,'and');
      recipe_name = recipe_name.replace(/</g,'');
      recipe_name = recipe_name.replace(/>/g,'');
      var recipe_name_lower = recipe_name.toLowerCase();
      $.each(gobi_array, function(ind, test){
          var n = recipe_name_lower.indexOf(test)
          if (n !== -1) {
            gobi = true
          }
        });

      var dish_type = $("#sel1 option:selected").text();
      //var dish_type = $('#sel1 :selected').text();
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


      var ingredient1 = $("input[name=boxinput1]").val();
      if (ingredient1 ===''){
        $('label#ingredient_error').show();
        $('input#one').focus();
        return false;
      }


      var instruction1 = $("textarea[name=input1]").val();
      if (instruction1 ===''){
        $('label#instruction_error').show();
        $('textarea#two').focus();
        return false;
      }


      var recipe_image = $("input[name=recipe_image]").val();
      if (recipe_image === "") {
        $("label#recipe_image_error").show();
        $("input#recipe_image").focus();
        return false;
      }


      String.prototype.endsWith = function(suffix) {
        return this.match(suffix+"$") == suffix;
      };

      if (!recipe_image.endsWith(".png") && !recipe_image.endsWith(".jpg") && !recipe_image.endsWith(".gif") && !recipe_image.endsWith(".jpeg")) {
        $("label#recipe_image_error234").show();
        $("input#recipe_image").focus();
        return false;
      }


      var extra_info = $("textarea[name='extra_info']").val();
      extra_info = extra_info.replace(/\{/g,'');
      extra_info = extra_info.replace(/\}/g,'');
      extra_info = extra_info.replace(/\$/g,'');
      extra_info = extra_info.replace(/\&/g,'and');
      extra_info = extra_info.replace(/</g,'');
      extra_info = extra_info.replace(/>/g,'');
      //console.log('extra_info being sent over: '+extra_info);

      var vegetarian = $("input[name=vegetarian]").prop("checked");
      var vegan = $("input[name=vegan]").prop("checked");
      var gluten_free = $("input[name=gluten-free]").prop("checked");
      var allergies = $("input[name=allergies]").prop("checked");
      //console.log("are we getting here")
      var dataString2 = '&recipe_name='+ recipe_name + '&gobi=' + gobi + '&recipe_name_lower='+ recipe_name_lower +'&recipe_image=' + recipe_image + '&dish_type=' + dish_type
                        +'&vegetarian=' + vegetarian + '&vegan=' + vegan + '&gluten_free=' + gluten_free + '&allergies=' + allergies
                        +'&latitude=' + latitude + '&longitude=' + longitude + "&ingredients="+ingredients+"&steps="+steps + "&est_time="+est_time + "&extra_info="+extra_info;
      //alert (dataString);return false;
      //console.log("are we getting to this 2nd here")
      $.ajax({
        type: "POST",
        url: "/new_recipe",
        data: dataString2,
        success: function() {
          //console.log('success');
          $('#recipe_form').html("<div id='recipemessage'><h2>Recipe submitted!</h2><p>Thank you so much for your contribution!</p></div>");
          //setTimeout(function() { 

          // yo this line of code don't do shit but WHYYYYYYY
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
    //$('#recipe_form').html("<div id='recipemessage'></div>");





    });
  });






//<!--=========================== Dietary Preference Edit =========================================->

 $(function() {
    $(".dietprefbutton").click(function() {
      // console.log('diet pref button')

      var vegetarian = $("input[name=vegetarian]").prop("checked");
      var vegan = $("input[name=vegan]").prop("checked");
      var gluten_free = $("input[name=gluten-free]").prop("checked");
      var allergies = $("input[name=allergies]").prop("checked");
      // console.log("are we getting the prefs")
      
      var dataString5 = '&vegetarian=' + vegetarian + '&vegan=' + vegan + '&gluten_free=' + gluten_free + '&allergies=' + allergies;
  

      $.ajax({
            type: "POST",
            url: "/updateRestrictions",
            data: dataString5,
            success: function() {
              //$('#submitted').removeClass("hidden");
              //$('#submitted').addClass("informatiemelding");
              $('#submitted').show();
              jQuery("#submitted").delay(2500).fadeOut("slow");
              //jQuery("div.informatiemelding").delay(3000).fadeOut("slow");
              //setTimeout(hide, 5000);
            }
          });


    });
  });
          //alert (dataString);return false;

function hide(){
  $('#submitted').addClass("hidden")
}

//<!--=========================== SEARCH FORM-=========================================->

var search_array = [];
var replace = '';

$(function() {

    //console.log('Search function is happening')
    $(".search2").click(function() {
      var search_input = $("input[name=search_input]").val();
      search_input = search_input.replace(/[^a-zA-Z 0-9&#@?!,.:;-_]+/g,'');
      search_input = search_input.replace(/</g,'');
      search_input = search_input.replace(/>/g,'');
      // console.log("search input")
      // console.log(search_input)
      search_input = search_input.toLowerCase();
      if (search_input === "") {
        return false;
      } else if (search_input === "top 5"){
        // console.log("yeeeeeeeeeh")
        var current_edges = map.getBounds()
        var left_coord = current_edges.getSouthWest().lng();
        var top_coord = current_edges.getNorthEast().lat();
        var right_coord = current_edges.getNorthEast().lng();
        var bottom_coord = current_edges.getSouthWest().lat();
        // console.log('edges', top_coord, bottom_coord, right_coord, left_coord)
        $.ajax({
          type: "POST",
          url: "/Top5",
          data: '&left_coord='+left_coord+'&top_coord='+top_coord+'&right_coord='+right_coord+'&bottom_coord='+bottom_coord,
          success: function(data) {
            // console.log('success in top5');
            top5_array = data.top5_array;
            // console.log(top5_array.length);

            counter='white2';
            var replace = '';
            for (var i=0; i<top5_array.length; i++) {
              if (counter==='white2') {
                counter = 'gray2'
              } else {
                counter = 'white2'
              }
              // console.log(top5_array[i][2])
              if (top5_array[i][2]==="Appetizer/Side") {
                top5_array[i][2] = 'Appetizer2'
              }

               if (top5_array[i][2]==="Entree") {
                              top5_array[i][2] = 'entree'
                            }


              var intro = '<div class="';
              var next = '"><li><a href="#" onclick="resultClick(';
              var next2 = ')';
              var next3 = '">';
              var next4 = ': ';
              var next5 = "</a></li></div>";
              var quote = '"';
              var input = String(top5_array[i][0]);
              replace = replace+intro+counter+'"><li><a href="#" onclick="result()" id="'+input+'"><img src="/graphics/'+top5_array[i][2]+'.png" style="height:30px;width:auto;padding-right:5px;margin:0"/>'+top5_array[i][3]+' upvotes: '+top5_array[i][1]+"</a></li></div>"
              //replace=replace+"<div><li>"+top5_array[i][3]+' upvotes: '+top5_array[i][1]+', '+top5_array[i][2]+"</li></div>"
            }
            $("#search_inner").html(replace);

          }
        });
      } else{
        $.ajax({
          type: "POST",
          url: "/Search/"+search_input,
          data: '&search_input='+search_input,
          success: function(data) {
            //console.log('success in search');
            search_array = data.search_array;
            //console.log(search_array.length);

            if (search_array.length === 0) {
              // console.log('no results');
              replace = '<div class="white2">no results found</div>'
            } else {


//values in search array: array of [recipeID,name,type]

            replace='';
            counter='white2';
            for (var i=0; i<search_array.length; i++) {
              if (counter==='white2') {
                counter = 'gray2'
              } else {
                counter = 'white2'
              }
              var intro = '<div class="';
              var next = '"><li><a href="#" onclick="resultClick(';
              var next2 = ')';
              var next3 = '">';
              var next4 = ': ';
              var next5 = "</a></li></div>";
              var quote = '"';

              //console.log(intro+counter+next+search_array[i][0]+next2+next3+search_array[i][1]+next4+search_array[i][2]+next5);
              var input = String(search_array[i][0]);
              if (search_array[i][2]==="Appetizer/Side") {
                search_array[i][2] = 'Appetizer2'
              }
  
               if (search_array[i][2]==="Entree") {
                            search_array[i][2] = 'entree'
                          }
              //replace=replace+"<div class='"+counter+"'><li><a href='#' onclick='resultClick('"+search_array[i][0]+"')"+"'>"+search_array[i][1]+': '+search_array[i][2]+"</a></li></div>"
              //replace = replace+intro+counter+next+search_array[i][0]+next2+next3+search_array[i][1]+next4+search_array[i][2]+next5;
              //replace=replace+intro+counter+'"><li><a href="#" onclick="result('+quote+input+quote+');">'+search_array[i][1]+': '+search_array[i][2]+"</a></li></div>";
              replace = replace+intro+counter+'"><li><a href="#" onclick="result()" id="'+input+'"><img src="/graphics/'+search_array[i][2]+'.png" style="height:30px;width:auto;padding-right:5px;margin:0"/>     '+search_array[i][1]+"</a></li></div>"
            }
          }
            $("#search_inner").html(replace);

          }
        });
      }
      return false;
      });

})

 function result() {
    var recipeID = event.target.id;
    var markerID2;
      //console.log('recipeID:   '+recipeID)
      var dataString6 = '&recipeID=' + recipeID
  

      $.ajax({
            type: "POST",
            url: "/findRecipeOnMap",
            data: dataString6,
            success: function(data) {
              var latitude = data.latitude;
              var longitude = data.longitude;
              markerID2 = data.markerID;
              //console.log('markerid: '+markerID2);
              var panPoint = new google.maps.LatLng(latitude,longitude);
              map.panTo(panPoint);
              map.setZoom(7);
            },
            async: false
          });
        //console.log('getting here');
        //console.log(recipeID);
        var recipe_name;
        var recipe_type;
        var recipe_image;
        var vegetarian;
        var vegan;
        var gluten;
        var allergies;
        var upvotes;
        var ingredients;
        var steps;
        var est_time;
        var views;
        var extra_info;

          $.ajax({
                type: "POST",
                url: "/viewRecipe",
                data: '&markerID='+markerID2,
                success: function(data) {
                  //console.log('breakpoint 2')
                  recipe_name = data.recipe_name
                  recipe_type = data.recipe_type
                  recipe_image = data.recipe_image
                  vegetarian = data.vegetarian
                  vegan = data.vegan
                  gluten = data.gluten
                  allergies = data.allergies
                  upvotes = data.upvotes
                  ingredients = data.ingredients[0].split('~`~,');
                  steps = data.instructions[0].split('~`~,');
                  est_time = data.prep_time
                  views = data.views
                  extra_info = data.extra_info
                  //console.log('stuff', views, ingredients, steps, est_time);
                   
            if (vegetarian===true) {
              vegetarian=' checked/> Vegetarian</br>';
            } else {
              vegetarian='/> Vegetarian</br>';
            }
            if (vegan===true) {
              vegan=' checked/> Vegan</br>';
            } else {
              vegan='/> Vegan</br>';
            }
            if (gluten===true) {
              gluten=' checked/> Gluten-Free</br>';
            } else {
              gluten='/> Gluten-Free</br>';
            }
            if (allergies===true) {
              allergies =' checked/> No Peanuts/Soy</br>';
            } else {
              allergies ='/> No Peanuts/Soy</br>';
            }
          },
            async: false
          });

//check if you can upvote or no, if not, itll replace it with a thing that says you voted luls no button nemorez
    $.ajax({
        type: "POST",
        url: "/Refresh",
        data: "&markerID="+markerID2,
        success: function(data) {
          //console.log('LOGGED in var below')
          //console.log(data.authenticated);
           if (data.authenticated) {
                $.ajax({
                        type: "POST",
                        url: "/canUpvote",
                        data: "&markerID="+markerID2,
                        success: function(data) {
                           //console.log(data.upvoted+" = upvoted or not");
                           if (data.upvoted) {
                            //$('.upvotebutton').html('You upvoted this!');
                            $('.voted').show();
                            $('.upvotebutton').hide();
                           } else {
                            //$('.upvotebutton').html('<a href="#" class="upvotebutton2">Upvote</a>');
                            $('.voted').hide();
                            $('.upvotebutton').show();
                           }
                         }
                       })
              }}});

      // console.log(ingredients);
      var ingredient_display=''
      for (var i=0; i<ingredients.length;i++) {
        ingredient_display=ingredient_display+'<li>'+ingredients[i]+'</li>'
      }

      var instruction_display=''
      for (var j=0; j<steps.length;j++) {
        instruction_display=instruction_display+'<li>'+steps[j]+'</li>'
      }

      $('.recipetitle').html('<div><strong>'+recipe_name+'</strong></div>');
      $('.recipeimage').html('<img id="imagez" src="'+recipe_image+'" style="width:20vw;height:auto" />');     
      $('.recipetype').html('<div><strong>Dish Type:</strong> '+recipe_type+'</div>'); 
      $('.upvotes').html('<div><strong>'+upvotes+' </strong>upvotes</div>') 
      $('.views').html('<div><strong>'+views+'</strong> views</div>');
      $('.instructions').html('<div><strong>Instructions: </strong><ol>'+instruction_display+'</ol></div>');
      $('.ingredients').html('<div><strong>Ingredients: </strong><ul>'+ingredient_display+'</ul></div>');
      $('.est_time').html('<div><strong>Estimated cook time:</strong>   '+est_time+' hours</div>');
      $('.vegcheck').html('<div class="reciperestrictions"><strong>Meets these dietary restrictions:</strong></div><input type="checkbox" onclick="return false"'+vegetarian);
      $('.vegancheck').html('<input type="checkbox" onclick="return false"'+vegan);
      $('.gfcheck').html('<input type="checkbox" onclick="return false" '+gluten);
      $('.allergiescheck').html('<input type="checkbox" onclick="return false" '+allergies);
// console.log(extra_info);
      if (extra_info!== '' && extra_info !==undefined) {
        $('.extra_info').html('<div><strong>Extra Information:</strong><br>'+extra_info+'<br></div>');
      } else {
        $('.extra_info').html('');
      }

      var images = document.getElementById('imagez');

      images.onerror = function() {
        // console.log('this functn is being applied')
        images.src = '/graphics/GlobalGobi.png';
      }

                   if ( $("#tab").is(":hidden")) {
              //console.log('hidden')
           $("#tab").show();
         }

};




//<!--=========================== Profile Search Display =========================================->
//<!--=========================== Profile Search Display =========================================->
//<!--=========================== Profile Search Display =========================================->
//<!--=========================== Profile Search Display =========================================->





function profileresult() {
    var recipeID = event.target.id;
    recID = recipeID
    $(".deletebutton").show();
    console.log(recID)
    var markerID2;
      //console.log('recipeID:   '+recipeID)
      var dataString6 = '&recipeID=' + recipeID
  

      $.ajax({
            type: "POST",
            url: "/findRecipeOnMap",
            data: dataString6,
            success: function(data) {
              var latitude = data.latitude;
              var longitude = data.longitude;
              markerID2 = data.markerID;
              //console.log('markerid: '+markerID2);
              var panPoint = new google.maps.LatLng(latitude,longitude);
              map.panTo(panPoint);
              map.setZoom(6);
            },
            async: false
          });
        //console.log(markerID2);
        //console.log(recipeID);
        var recipe_name;
        var recipe_type;
        var recipe_image;
        var vegetarian;
        var vegan;
        var gluten;
        var allergies;
        var upvotes;
        var ingredients;
        var steps;
        var est_time;
        var views;
        var extra_info;
          $.ajax({
                type: "POST",
                url: "/viewRecipe",
                data: '&markerID='+markerID2,
                success: function(data) {
                  //console.log('breakpoint 2')
                  recipe_name = data.recipe_name
                  recipe_type = data.recipe_type
                  recipe_image = data.recipe_image
                  vegetarian = data.vegetarian
                  vegan = data.vegan
                  gluten = data.gluten
                  allergies = data.allergies
                  upvotes = data.upvotes
                  //console.log('data upvotes WAOW: '+data.upvotes)
                  ingredients = data.ingredients[0].split('~`~,');
                  steps = data.instructions[0].split('~`~,');
                  est_time = data.prep_time
                  views = data.views
                  extra_info = data.extra_info
                  //console.log('stuff', views, ingredients, steps, est_time);
            /*       
            if (vegetarian===true) {
              vegetarian=' checked/> Vegetarian</br>';
            } else {
              vegetarian='/> Vegetarian</br>';
            }
            if (vegan===true) {
              vegan=' checked/> Vegan</br>';
            } else {
              vegan='/> Vegan</br>';
            }
            if (gluten===true) {
              gluten=' checked/> Gluten-Free</br>';
            } else {
              gluten='/> Gluten-Free</br>';
            }
            if (allergies===true) {
              allergies =' checked/> No Peanuts/Soy</br>';
            } else {
              allergies ='/> No Peanuts/Soy</br>';
            }*/
          },
            async: false
          });

//check if you can upvote or no, if not, itll replace it with a thing that says you voted luls no button nemorez

      // console.log(ingredients);
      var ingredient_display=''
      for (var i=0; i<ingredients.length;i++) {
        ingredient_display=ingredient_display+'<li>'+ingredients[i]+'</li>'
      }

      var instruction_display=''
      for (var j=0; j<steps.length;j++) {
        instruction_display=instruction_display+'<li>'+steps[j]+'</li>'
      }

      $('.recipetitle').html('<div>'+recipe_name+'</div>');
      $('.recipeimage').html('<img id="images" src="'+recipe_image+'" style="width:20vw;height:auto" />');     
      $('.recipetype').html('<div><strong>Dish Type:</strong> '+recipe_type+'</div>'); 
      $('.viewsvotes').html('<strong>'+views+'</strong> views, <strong>'+upvotes+'</strong> upvotes');
      $('.instructions').html('<div><strong>Instructions: </strong><ol>'+instruction_display+'</ol></div>');
      $('.ingredients').html('<div><strong>Ingredients:</strong> <ul>'+ingredient_display+'</ul></div>');
      $('.est_time').html('<div><strong>Estimated cook time:</strong>   '+est_time+' hours</div>');
      // console.log(extra_info);
      if (extra_info!== '' && extra_info !==undefined) {
        $('.extra_info').html('<div><strong>Extra Information:</strong><br>'+extra_info+'<br></div>');
      } else {
        $('.extra_info').html('');
      }

    var image = document.getElementById('images');
      image.onerror = function() {
        image.src = '/graphics/GlobalGobi.png';
      }
      /*$('.vegcheck').html('<div class="reciperestrictions">Meets these dietary restrictions:</div><input type="checkbox" onclick="return false"'+vegetarian);
      $('.vegancheck').html('<input type="checkbox" onclick="return false"'+vegan);
      $('.gfcheck').html('<input type="checkbox" onclick="return false" '+gluten);
      $('.allergiescheck').html('<input type="checkbox" onclick="return false" '+allergies);*/


};
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
})

})
//<!--=========================== for login to link to sign up =========================================->
function linkToSignUp() {
  $('#close_modal').click();
  $('#sign_up').click();
}











