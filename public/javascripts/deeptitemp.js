//var locations5 = []
var initialize = function () {
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
  google.maps.event.addListenerOnce(map, 'idle', refreshMap());

}

var refreshMap = function() {
  //console.log()
  console.log('function refreshmap called')
  // get edges
  var edges = map.getBounds();
  console.log('dsjfldajlkjs')
  console.log(edges);
  var left_coord = edges.getSouthWest().lng();
  var top_coord = edges.getNorthEast().lat();
  var right_coord = edges.getNorthEast().lng();
  var bottom_coord = edges.getSouthWest().lat();
  console.log('bottomcoord', bottom_coord)
  //console.log('locations', locations)

  //ajax post edges
    $.ajax({
        type: "POST",
        url: "/findMarkers",
        data: '&bottom_coord='+bottom_coord+'&left_coord='+left_coord+'&top_coord='+top_coord+'&right_coord='+right_coord,
        success: function(data) {
          console.log('recieving the data of markers');
          console.log(data);
        
  		}
	});

}
google.maps.event.addDomListener(window, 'load', initialize);