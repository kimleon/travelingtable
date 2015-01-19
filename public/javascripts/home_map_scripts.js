
      function initialize() {
         var locations = {};

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

      }
		
      var map = new google.maps.Map(mapArea, mapOptions);
      




      google.maps.event.addListener(map, 'idle', function()  {
            console.log('function refreshmap called')
          // get edges
          //var edges = map.getBounds();
          //console.log(edges);
          //var left_coord = edges.getSouthWest().lng();
          //var top_coord = edges.getNorthEast().lat();
          //var right_coord = edges.getNorthEast().lng();
          //var bottom_coord = edges.getSouthWest().lat();
          //console.log('got all the edges');

          //ajax post edges
            $.ajax({
                type: "POST",
                url: "/newFindMarkers",
                data: '&locations='+locations,//,'&len='+len,
                success: function(data) {
                  console.log('recieving the data of markers');
                  var new_locations = data.new_markers
                }
          });



          //iterate through them if within bounds, and not already in locations (already loaded) markers, then display
          //append to locations
          var setMarkers = function(locObj) {
              $.each(locObj, function (loc) {
                  
                      loc.marker = new google.maps.Marker({
                          position: new google.maps.LatLng(loc[1], loc[2]),
                          map: map
                      });
                     
                      //Remember loc in the `locations` so its info can be displayed and so its marker can be deleted.
                      locations.push(loc[0]);
                  
           });
           }

          setMarkers(new_locations); //Create markers from the initial dataset served with the document.
          //ajaxObj.get(); //Start the get cycle.
        })
     }

      google.maps.event.addDomListener(window, 'load', initialize);
