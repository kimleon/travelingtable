//add function call for dragend event and refresh every 5s, resizing






	var locations = []; //A repository for markers (and the data from which they were contructed).
	//var edges = null;
//this will contain the markers loaded within map edges? idk initialize this with existing db maybe?

//new markers that are scanned and passed in
	//initial dataset for markers
	var data.len = 0;



	// get edges
	var edges = map.getBounds();
	var bottom_coord = edges[0][0];
	var left_coord = edges[1][0];
	var top_coord = edges[0][1];
	var right_coord = edges[1][1]; 




	//ajax get request - length


	//ajax post edges
    $.ajax({
        type: "POST",
        url: "/findMarkers",
        data: '&bottom_coord='+bottom_coord+'&left_coord='+left_coord+'&top_coord='+top_coord+'&right_coord='+right_coord+'&locations='+locations,'&len='+len,
        success: function(data) {
        	//$.each(data, function())
        	//data.locs
        	//len sent back

        }
	});






	//compare lengths, if length_Received > len, ajax get request of last length_Received-len values within bounds
//map info ya know the usual

	var map = new google.maps.Map(document.getElementById('#map'), {
	    zoom: 1,
	    maxZoom: 8,
	    minZoom: 1,
	    streetViewControl: false,
	    center: new google.maps.LatLng(30, 30),
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	});



	//iterate through them if within bounds, and not already in locations (already loaded) markers, then display
	//append to locations
	function setMarkers(locObj) {
	    $.each(locObj, function (loc) {
	        //if (!locations[loc[0]] && loc[1] !== undefined && loc[2] !== undefined) {

			//if ($.inArray(loc[0],locations)!== -1 && loc[1] !== undefined && loc[2] !== undefined) {


	        	//$.inArray(value, array)
	            //Marker has not yet been made (and there's enough data to create one).
	            //ALSO ADD AN EXTRA LINE FOR IF IT IS WITHIN OUR BOUNDS, if lat in range(bounds), and lng in range(bounds)

	            //Create marker
	            loc.marker = new google.maps.Marker({
	                position: new google.maps.LatLng(loc[1], loc[2]),
	                map: map
	            });

	            //what is this click listener business, oh crap this displays the usernames okay
	            //Attach click listener to marker
	            /*google.maps.event.addListener(loc.marker, 'click', (function (key) {
	                return function () {
	                    infowindow.setContent(locations[key].info);
	                    infowindow.open(map, locations[key].marker);
	                }
	            })(key));*/

	            //Remember loc in the `locations` so its info can be displayed and so its marker can be deleted.
	            locations.push(loc[0]);

	        } /*else if (locations[key] && loc.remove) {
	            //Remove marker from map
	            if (locations[key].marker) {
	                locations[key].marker.setMap(null);
	            }
	            //Remove element from `locations`
	            delete locations[key];
	        } else if (locations[key]) {
	            //Update the previous data object with the latest data.
	            $.extend(locations[key], loc);
	            if (loc.lat !== undefined && loc.lng !== undefined) {
	                //Update marker position (maybe not necessary but doesn't hurt).
	                locations[key].marker.setPosition(
	                new google.maps.LatLng(loc.lat, loc.lng));
	            }
	            //locations[key].info looks after itself.
	        }*/
	    });
	}
/*
	var ajaxObj = { //Object to save cluttering the namespace.
	    options: {
	        url: "........", //The resource that delivers loc data.
	        dataType: "json" //The type of data tp be returned by the server.
	    },
	    delay: 10000, //(milliseconds) the interval between successive gets.
	    errorCount: 0, //running total of ajax errors.
	    errorThreshold: 5, //the number of ajax errors beyond which the get cycle should cease.
	    ticker: null, //setTimeout reference - allows the get cycle to be cancelled with clearTimeout(ajaxObj.ticker);
	    get: function () { //a function which initiates 
	        if (ajaxObj.errorCount < ajaxObj.errorThreshold) {
	            ajaxObj.ticker = setTimeout(getMarkerData, ajaxObj.delay);
	        }
	    },
	    fail: function (jqXHR, textStatus, errorThrown) {
	        console.log(errorThrown);
	        ajaxObj.errorCount++;
	    }
	};

	//Ajax master routine
	function getMarkerData() {
	    $.ajax(ajaxObj.options)
	        .done(setMarkers) //fires when ajax returns successfully
	    .fail(ajaxObj.fail) //fires when an ajax error occurs
	    .always(ajaxObj.get); //fires after ajax success or ajax error
	}
*/
	setMarkers(data.locs); //Create markers from the initial dataset served with the document.
	//ajaxObj.get(); //Start the get cycle.