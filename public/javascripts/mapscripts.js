var elevator;
var map;
var marker = false;
var latLng = false;

function initialize() {

  elevator = new google.maps.ElevationService();
  var mapOptions = {
      center: new google.maps.LatLng(42.3598, -7.0921),
      zoom: 3,
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

		};
  map = new google.maps.Map(document.getElementById('map'),
      mapOptions);

  // This event listener will call addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng);
    latLng = event.latLng;
  });

  // Adds a marker at the center of the map.
}



// Add a marker to the map and push to the array.
function addMarker(location) {
  var locations = [];
  locations.push(location);
  var elevation;
  var pinIcon = new google.maps.MarkerImage(
    "/graphics/addsmall.png",
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new google.maps.Size(39,40)
);  

   //var icon = {"/graphics/add.png",new google.maps.Size(40,39)};

  var positionalRequest = { 'locations': locations }
    elevator.getElevationForLocations(positionalRequest, function(results, status) {
    if (status == google.maps.ElevationStatus.OK && results[0]) {
      // Retrieve the first result
      if (results[0].elevation>-50) {
        elevation = true;
      } else {
        elevation = false;
      }
      // console.log(elevation);


  if (marker) {
    marker.setMap(null);
  } 
  if (elevation){
  marker = new google.maps.Marker({
    position: location,
    map: map,
  icon: pinIcon
  //icon:icon
});
  };
    }});

}


google.maps.event.addDomListener(window, 'load', initialize);




