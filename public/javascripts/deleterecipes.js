function deletevalidate(event) {
	var deleteID = recID;
	var deletemarkerID;
	event.preventDefault();

	var dataString6 = '&recipeID=' + deleteID;
  	console.log(deleteID);

      $.ajax({
            type: "POST",
            url: "/findRecipeOnMap",
            data: dataString6,
            success: function(data) {
              //var latitude = data.latitude;
              //var longitude = data.longitude;
              deletemarkerID = data.markerID;
              //console.log('markerid: '+deletemarkerID);
            },
            async: false
          });

      //console.log(deletemarkerID);

    var datadelete = '&recipeID=' + deleteID + '&markerID=' + deletemarkerID;

      $.ajax({
			type: "POST",
			url: "/deleteRecipe",
			data: datadelete,
			success: function(data){
				if (data.success===true) {
					//$("#"+String(deleteID)).hide();
					//location.reload();
					alert('cool');
				}
			}
      })
}


