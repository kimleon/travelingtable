//this doesn't work, delete it
$(document).ready(function() {
	$("#search_button").click(function() {
		var data = "aaa";
		var recipe_search = document.getElementById('search_input').value;
		Recipe.findOne({ name: recipe_search }, function(err, recipe_search) {
		  window.location.href = '/recipes/' + recipe_search.id;
		});
		$('#search_input').val("");
	});
});
