////We used the google maps API for this part: https://developers.google.com/maps/

var map;
      

      function initialize() {
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

		}//mapoptions
		
    map = new google.maps.Map(mapArea, mapOptions);
    google.maps.event.addListener(map, 'bounds_changed', function() {
         var edges = map.getBounds()
          var left_coord = edges.getSouthWest().lng();
          var top_coord = edges.getNorthEast().lat();
          var right_coord = edges.getNorthEast().lng();
          var bottom_coord = edges.getSouthWest().lat();
         $.ajax({
                type: "POST",
                url: "/findUserMarkers",
                data: '&left_coord='+left_coord+'&top_coord='+top_coord+'&right_coord='+right_coord+'&bottom_coord='+bottom_coord,
                success: function(data) {
                  //console.log('recieving the data of markers');
                  //console.log(data.new_markers)
                  new_locations = data.new_markers
                }
          });

      });
      google.maps.event.addListener(map, 'idle', function()  {
            // console.log('function refreshmap called')
            //console.log(locations)
          // get edges
          var edges = map.getBounds();
          // console.log(edges);
          var left_coord = edges.getSouthWest().lng();
          var top_coord = edges.getNorthEast().lat();
          var right_coord = edges.getNorthEast().lng();
          var bottom_coord = edges.getSouthWest().lat();
          var pinIcon = new google.maps.MarkerImage(
    "/graphics/marker.png",
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new google.maps.Size(30,31)
);  
          // console.log('got all the edges');
          // console.log(left_coord, top_coord, right_coord, bottom_coord);

          //ajax post edges
            $.ajax({
                type: "POST",
                url: "/findUserMarkers",
                data: '&left_coord='+left_coord+'&top_coord='+top_coord+'&right_coord='+right_coord+'&bottom_coord='+bottom_coord,
                success: function(data) {
                  // console.log('recieving the data of markers');
                  // console.log(data.new_markers)
                  new_locations = data.new_markers
                }
          });



          //iterate through them if within bounds, and not already in locations (already loaded) markers, then display
          //append to locations
          var setMarkers = function(locObj) {
              $.each(locObj, function (index, loc) {
                    // console.log('location of marker', loc)
                    
                      loc.marker = new google.maps.Marker({
                          position: new google.maps.LatLng(loc[1], loc[2]),
                          map: map,
                          customInfo: loc[0],
                          icon:pinIcon
                      });

                      setListener(loc.marker);
                     
                      //Remember loc in the `locations` so its info can be displayed and so its marker can be deleted.
                      //locations.push(loc[0]);
                  
           });
           }

          setMarkers(new_locations); //Create markers from the initial dataset served with the document.
          //ajaxObj.get(); //Start the get cycle.
        }); //send the idle function call


      google.maps.event.addDomListener(map, 'load', function()  {
            // console.log('function refreshmap called')
            //console.log(locations)
          var edges = map.getBounds();
          // console.log(edges);
          var left_coord = edges.getSouthWest().lng();
          var top_coord = edges.getNorthEast().lat();
          var right_coord = edges.getNorthEast().lng();
          var bottom_coord = edges.getSouthWest().lat();
          var pinIcon = new google.maps.MarkerImage(
    "/graphics/marker.png",
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new google.maps.Size(30,31)
);  
          // console.log('got all the edges for USERS');
          // console.log(left_coord, top_coord, right_coord, bottom_coord);
          //ajax post edges
            $.ajax({
                type: "POST",
                url: "/findUserMarkers",
                data: '&left_coord='+left_coord+'&top_coord='+top_coord+'&right_coord='+right_coord+'&bottom_coord='+bottom_coord,
                success: function(data) {
                  // console.log('recieving the data of markers');
                  // console.log(data.new_markers)
                  new_locations = data.new_markers
                }
          });
          var setMarkers = function(locObj) {
              $.each(locObj, function (index, loc) {
                    // console.log(loc)
                      loc.marker = new google.maps.Marker({
                          position: new google.maps.LatLng(loc[1], loc[2]),
                          map: map,
                          customInfo: loc[0],
                          icon: pinIcon
                                                });
                      setListener(loc.marker);
           });
           }
          setMarkers(new_locations); //Create markers from the initial dataset served with the document.
          //ajaxObj.get(); //Start the get cycle.
        });


    var setListener = function(marker) {
        google.maps.event.addListener(marker,'click',function() {
        var markerID2 = marker.customInfo;
        var recipe_position = marker.getPosition();
        map.panTo(recipe_position);
        map.setZoom(6);
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
          $.ajax({
                type: "POST",
                url: "/viewRecipe",
                data: '&markerID='+markerID2,
                success: function(data) {
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
                  //console.log('breakpoint 2')
                 
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
      $('.recipeimage').html('<img id="imagez" src="'+recipe_image+'" style="width:20vw;height:auto" />');     
      $('.recipetype').html('<div><strong>Dish Type:</strong> '+recipe_type+'</div>'); 
      $('.viewsvotes').html('<strong>'+views+'</strong> views, <strong>'+upvotes+'</strong> upvotes');
      $('.instructions').html('<div><strong>Instructions: </strong><ol>'+instruction_display+'</ol></div>');
      $('.ingredients').html('<div><strong>Ingredients:</strong> <ul>'+ingredient_display+'</ul></div>');
      $('.est_time').html('<div><strong>Estimated cook time:</strong>   '+est_time+' hours</div>');
      
      var images = document.getElementById('imagez');

      images.onerror = function() {
        // console.log('this functn is being applied')
        images.src = '/graphics/GlobalGobi.png';
      }
      });

      
      }//closes marker click function


      //});

     // });
    //}

  }

      google.maps.event.addDomListener(window, 'load', initialize);

      setInterval(function(){ 
      google.maps.event.addDomListener(window, 'load', initialize);    
      }, 5000);
	  
