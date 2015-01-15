$(document).ready(function() {
	$("#recipe_button").click(function() {
		var data = "aaa";
		var req = {
			recipe_name: document.getElementById('rec_name').value,
			recipe_image: document.getElementById('rec_image').value
		}
		$.post("/Recipes", req, function(data) {
			alert("yusss you did it");
		});
	});
});