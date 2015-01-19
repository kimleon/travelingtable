//add function call for dragend event and refresh every 5s, resizing
	var locations = []; //A repository for markers (and the data from which they were contructed).//var edges = null;


	var refreshMap = function(map) {
		console.log('function refreshmap called')
	// get edges
	var edges = map.getBounds();
	var left_coord = edges.getSouthWest().lat();
	var top_coord = edges.getSouthWest().lng();
	var right_coord = edges.getNorthEast().lat();
	var bottom_coord = edges.getNorthEast().lng();


	//ajax post edges
    $.ajax({
        type: "POST",
        url: "/findMarkers",
        data: '&bottom_coord='+bottom_coord+'&left_coord='+left_coord+'&top_coord='+top_coord+'&right_coord='+right_coord+'&locations='+locations,//,'&len='+len,
        success: function(data) {
        	console.log(data.new_markers);
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
}


