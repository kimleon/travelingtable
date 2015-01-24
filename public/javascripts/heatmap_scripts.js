// Adding 500 Data Points
var map, pointarray, heatmap;
var heatmapdata = []
$(document).ready(function(){
    $.ajax({
        type: 'POST',
        url: "/getHeatMapData",
        context: document.body,
        success: function(data){
          
          $.each(data.markers,function(i,r) {
            heatmapdata.push({
              location: new google.maps.LatLng(r[0], r[1]), weight: r[3]
            }); 
          });
        }, async: false
      });
  });

var heatMapData = [
  {location: new google.maps.LatLng(37.782, -122.447), weight: 3},
  new google.maps.LatLng(37.782, -122.445),
  {location: new google.maps.LatLng(37.782, -122.443), weight: 2},
  {location: new google.maps.LatLng(37.782, -122.441), weight: 3},
  {location: new google.maps.LatLng(37.782, -122.439), weight: 2},
  new google.maps.LatLng(37.782, -122.437),
  {location: new google.maps.LatLng(37.782, -122.435), weight: 0.5},

  {location: new google.maps.LatLng(37.785, -122.447), weight: 3},
  {location: new google.maps.LatLng(37.785, -122.445), weight: 2},
  new google.maps.LatLng(37.785, -122.443),
  {location: new google.maps.LatLng(37.785, -122.441), weight: 0.5},
  new google.maps.LatLng(37.785, -122.439),
  {location: new google.maps.LatLng(37.785, -122.437), weight: 2},
  {location: new google.maps.LatLng(37.785, -122.435), weight: 3}
];


function initialize() {
  var mapArea = document.getElementById('map-canvas');
        var mapOptions = {
          center: new google.maps.LatLng(40.3598, -98.0921),
          zoom: 1,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          minZoom: 3,
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
  
  console.log("hmd");
  console.log(heatmapdata);

  console.log("HMD");
  console.log(heatMapData);

  var map = new google.maps.Map(mapArea, mapOptions);

  //var pointArray = new google.maps.MVCArray(taxiData);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapdata
  });

  heatmap.setMap(map);

}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  console.log(heatmap.get('radius'));
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

google.maps.event.addDomListener(window, 'load', initialize);
