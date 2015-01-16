var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipesSchema = new Schema({
	name: String,
	image: String
	// instructions: [String]
	// userId: Schema.Types.ObjectId
	//ingredients: [String]
});

var Recipe = mongoose.model('Recipes', recipesSchema);


var checkLength = function(s) {
  return s.length > 0;
};

// Validators for our model. When we save or modify our model, these validators
// get run. If they return false, an error happens.
//We will make more checks later for checking through more
Recipe.schema.path('name').validate(checkLength, "Name cannot be empty");
Recipe.schema.path('image').validate(checkLength, "Image url cannot be empty");

exports.Recipe = Recipe;