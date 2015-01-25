var map;
var currentID;
var markers = []
var markerClusterer;
clusterSettings = {
    maxZoom: 4,
    styles: [{
            height:55,
            url: "/graphics/cluster1.png",
            width: 55,
            anchorIcon: ["27px", "28px"],
            anchor: [6,0]
            //anchorIcon: [20, 140]
            },
            {
            height:55,
            url: "/graphics/cluster2.png",
            width: 55,
            anchorIcon: ["27px", "28px"],
            anchor: [6,0]
            //anchorIcon: [20, 140]
            },
            {
            height:55,
            url: "/graphics/cluster3.png",
            width: 55,
            anchorIcon: ["27px", "28px"],
            anchor: [6,0]
            //anchorIcon: [20, 140]
            }]}
        clusterSettings3 = {
          maxZoom: 4,
          styles:[{
            height:42,
            width:43,
            url:"/graphics/cluster.png"
          }]
        }

        clusterSettings2 = {
          maxZoom: 4
        }
      function initialize() {
        
         //var locations = [];
        var new_locations = [];
        var mapArea = document.getElementById('map');
        var mapOptions = {
          center: new google.maps.LatLng(42.3598, -71.0921),
          zoom: 6,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
    		  minZoom: 3,
    		  maxZoom:7,
    		  mapTypeControl: false,
    		  streetViewControl: false,
    		  zoomControl: false,
    		  panControl: false,
          //v:2.184,
          styles: [

            {
              "featureType": "landscape.natural",
              "elementType": "geometry.fill",
              "stylers": [
                { "color": "#f5f5f2" },
                { "visibility": "on" }
              ]
            },{
              "featureType": "poi",
              "stylers": [
                { "visibility": "off" }
              ]
            },{
                  "featureType": "poi.park",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
                      {
                          "color": "#9BE4C4"
                      }
                  ]
              },{
              "featureType": "transit",
              "stylers": [
                { "visibility": "off" }
              ]
            },{
              "featureType": "landscape.man_made",
              "elementType": "geometry.fill",
              "stylers": [
                { "color": "#ffffff" },
                { "visibility": "on" }
              ]
            },{
              "featureType": "road.arterial",
              "stylers": [
                { "visibility": "simplified" },
                { "color": "#fee379" }
              ]
            },{
              "featureType": "road.highway",
              "elementType": "labels.icon",
              "stylers": [
                { "visibility": "off" }
              ]
            },{
              "featureType": "landscape",
              "stylers": [
                { "color": "#F7F8FF" }
              ]
            },{
              "featureType": "road",
              "stylers": [
                { "color": "#ffffff" }
              ]
            },{
              "featureType": "water",
              "stylers": [
                { "color": "#A9D5F1" }
              ]
            },{
              "featureType": "landscape",
              "stylers": [
                { "visibility": "off" }
              ]
            },
          ],

      }
		
      map = new google.maps.Map(mapArea, mapOptions);

      google.maps.event.addListener(map, 'idle', function()  {
            //console.log('function refreshmap called')
            //console.log(locations)
          // get edges
          var edges = map.getBounds();
          //console.log(edges);
          var left_coord = edges.getSouthWest().lng();
          var top_coord = edges.getNorthEast().lat();
          var right_coord = edges.getNorthEast().lng();
          var bottom_coord = edges.getSouthWest().lat();
          //console.log('got all the edges');
          //console.log(left_coord, top_coord, right_coord, bottom_coord);

          //ajax post edges
            $.ajax({
                type: "POST",
                url: "/findMarkers",
                data: '&left_coord='+left_coord+'&top_coord='+top_coord+'&right_coord='+right_coord+'&bottom_coord='+bottom_coord,
                success: function(data) {
                  //console.log('recieving the data of markers');
                  //console.log(data.new_markers)
                  new_locations = data.new_markers
                }
          });



          //iterate through them if within bounds, and not already in locations (already loaded) markers, then display
          //append to locations
          var setMarkers = function(locObj) {
              markers = []
              $.each(locObj, function (index, loc) {
                    //console.log(loc)
                  
                      loc.marker = new google.maps.Marker({
                          position: new google.maps.LatLng(loc[1], loc[2]),
                          map: map,
                          customInfo: loc[0],
                          icon:'/graphics/marker.png',
                          animation: google.maps.Animation.DROP
                      });

                      setListener(loc.marker);
                      markers.push(loc.marker);
                     
                      //Remember loc in the `locations` so its info can be displayed and so its marker can be deleted.
                      //locations.push(loc[0]);
                  
           });
           }

          setMarkers(new_locations);
          //setImagePath(imagePath:'/graphics/cluster');
          //setImageExtension(imageExtension:'.png');
          var markerCluster = new MarkerClusterer(map, markers, clusterSettings2);
          //var markerCluster = new MarkerClusterer(map, markers);
          //refreshMapCluster(); 
          //Create markers from the initial dataset served with the document.
          //ajaxObj.get(); //Start the get cycle.
        });




       setInterval(function(){ 
    
      google.maps.event.addDomListener(map, 'load', function()  {
            //console.log('function refreshmap called')
            //console.log(locations)
          var edges = map.getBounds();
          //console.log(edges);
          var left_coord = edges.getSouthWest().lng();
          var top_coord = edges.getNorthEast().lat();
          var right_coord = edges.getNorthEast().lng();
          var bottom_coord = edges.getSouthWest().lat();
          //console.log('got all the edges');
          //console.log(left_coord, top_coord, right_coord, bottom_coord);
          //ajax post edges
            $.ajax({
                type: "POST",
                url: "/findMarkers",
                data: '&left_coord='+left_coord+'&top_coord='+top_coord+'&right_coord='+right_coord+'&bottom_coord='+bottom_coord,
                success: function(data) {
                  //console.log('recieving the data of markers');
                  //console.log(data.new_markers)
                  new_locations = data.new_markers
                }
          });
          var setMarkers = function(locObj) {
            markers = []
              $.each(locObj, function (index, loc) {
                    //console.log(loc)
                      loc.marker = new google.maps.Marker({
                          position: new google.maps.LatLng(loc[1], loc[2]),
                          map: map,
                          customInfo: loc[0],
                          icon:'/graphics/marker.png',
                          //animation: google.maps.Animation.DROP
                      });
                      setListener(loc.marker);
                      markers.push(loc.marker);
           });
           }
          setMarkers(new_locations);
          //setImagePath(imagePath:'/graphics/cluster');
          //setImageExtension(imageExtension:'.png');
          var markerCluster = new MarkerClusterer(map, markers, clusterSettings2);
 //Create markers from the initial dataset served with the document.
          //ajaxObj.get(); //Start the get cycle.
          //refreshMapCluster();
        });
      }, 5000);

    var setListener = function(marker) {

      var recipe_name 
      var recipe_type 
      var recipe_image
      var vegetarian
      var vegan
      var gluten
      var allergies
      var upvotes
      var steps
      var ingredients
      var est_time
      var views
      var extra_info
      google.maps.event.addListener(marker,'click',function() {
            //console.log('marker info');
            //console.log(this.customInfo);
            currentID = marker.customInfo;
            $.ajax({
                type: "POST",
                url: "/viewRecipe",
                data: '&markerID='+marker.customInfo,
                success: function(data) {
                  //console.log('recieving the marker ID');
                  //console.log(data);
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
                  console.log('extra: '+data.extra_info)
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
             /*
     var contentString = '<div id="window"><div id="title">'+recipe_name+'</div><div id="inside"><div class="label">
     Dish type:</div></br>'+recipe_type+'</br><div class="label">Recipe Image</div></br><img src="'+recipe_image
     ' class="image"></br><div class="label">Dietary Restrictions:</div></br>'+'<input type="checkbox" class="checkbox"
      disabled="disabled" '+vegetarian+' Vegetarian <input type="checkbox" class="checkbox" disabled="disabled" '+vegan+
      'Vegan <input type="checkbox" class="checkbox" disabled="disabled" '+gluten+'Gluten-Free <input type="checkbox"
       class="checkbox" disabled="disabled" '+allergies+'No peanuts/soy <div class="label">Upvotes: </div>'+upvotes+'</div></div>';
       */

//check if you can upvote or no, if not, itll replace it with a thing that says you voted luls no button nemorez
    $.ajax({
        type: "POST",
        url: "/Refresh",
        data: "&markerID="+marker.customInfo,
        success: function(data) {
          //console.log('LOGGED in var below')
          //console.log(data.authenticated);
           if (data.authenticated) {
                $.ajax({
                        type: "POST",
                        url: "/canUpvote",
                        data: "&markerID="+marker.customInfo,
                        success: function(data) {
                           console.log(data.upvoted+" = upvoted or not");
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

      //var newing = ingredients.split(',');
      console.log('totals');
      console.log(ingredients.length);
      console.log(steps.length);
      console.log(ingredients[0]);


      var ingredient_display=''
      for (var i=0; i<ingredients.length;i++) {
        ingredient_display=ingredient_display+'<li>'+ingredients[i]+'</li>'
      }
      //console.log(newing)

      var instruction_display=''
      for (var j=0; j<steps.length;j++) {
        instruction_display=instruction_display+'<li>'+steps[j]+'</li>'
      }



      var contentString = recipe_name + recipe_image;
      //<div class="checkbox"><label><input type="checkbox" name="upvote" value="">Upvote</label></div>'; 
      var infowindow = new google.maps.InfoWindow({
      content: contentString
       });   
      //infowindow.open(map,marker);

      //console.log(vegetarian);
      /**
      console.log('extra info: '+extra_info);
      $.ajax({
        type: 'GET',
        url:recipe_image,
        success: function(val) {
          console.log("hi")
          $('.recipeimage').html('<img src="'+recipe_image+'" style="width:20vw;height:auto" />');  
        },
        error: function(err) {
          console.log('happening')
          recipe_image = "/graphics/GlobalGobi.png"
          $('.recipeimage').html('<img src="'+recipe_image+'" style="width:20vw;height:auto" />');  
        }, crossDomain: true

      });

*/
/**
    var image = new Image(); 
    image.src = recipe_image
    if (image.width===0) {
        recipe_image = '/graphics/GlobalGobi.png'
    }
    **/

      map.panTo(marker.getPosition());
      $('.recipetitle').html('<div>'+recipe_name+'</div>');
      $('.recipeimage').html('<img id="image" src="'+recipe_image+'" style="width:20vw;height:auto" />');     
      $('.recipetype').html('<div><strong>Dish Type:</strong> '+recipe_type+'</div>'); 
      $('.upvotes').html('<div><strong>Total Votes: </div><div>'+upvotes+' </strong>upvotes</div>') 
      $('.views').html('<div><strong>'+views+'</strong> views</div>');
      $('.instructions').html('<div><strong>Instructions:</strong> <ol>'+instruction_display+'</ol></div>');
      $('.ingredients').html('<div><strong>Ingredients:</strong> <ul>'+ingredient_display+'</ul></div>');
      $('.est_time').html('<div><strong>Estimated cook time:  </strong> '+est_time+' hours</div>');
      $('.vegcheck').html('<div class="reciperestrictions"><strong>Meets these dietary restrictions:</strong></div><input type="checkbox" onclick="return false"'+vegetarian);
      $('.vegancheck').html('<input type="checkbox" onclick="return false"'+vegan);
      $('.gfcheck').html('<input type="checkbox" onclick="return false" '+gluten);
      $('.allergiescheck').html('<input type="checkbox" onclick="return false" '+allergies);

            if (extra_info!== '') {
        $('.extra_info').html('<div><strong>Extra Information:</strong><br>'+extra_info+'</div>');
      }

      var image = document.getElementById('image');
      console.log('this one is happening');
      image.onerror = function() {
        image.src = '/graphics/GlobalGobi.png';
      }


//$('.').html('');
      }
      });

      });
    }

  }

      google.maps.event.addDomListener(window, 'load', initialize);

//if you can vote and you choose to...
$(function() {
    $(".upvotebutton2").click(function() {
      console.log('are we gettitng here', currentID);
    $.ajax({
        type: "POST",
        url: "/Upvote",
        data: "&markerID="+currentID,
        success: function(data) {
          upvotes = data.upvotes;
          console.log('current upvotes,', upvotes)
          //$('.upvotebutton').html('You upvoted this!');
          $('.voted').show();
          $('.upvotebutton').hide();
          $('.upvotes').html('<div>'+upvotes+' upvotes</div>') 
        }
      });
  });
});

function refreshMapCluster() {
        console.log('refresh map is called');
        if (markerClusterer != null) {
          markerClusterer.clearMarkers();
        }
        markerClusterer = new MarkerClusterer(map, markers);
        console.log(markerClusterer);
      }

      