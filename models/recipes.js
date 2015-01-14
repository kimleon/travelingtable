var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipesSchema = new Schema({
	name: String,
	image: String,
	// instructions: String,
	// user: {
	// 	type: Schema.ObjectId,
	// 	ref: 'Users'
	// }
});

var Recipe = mongoose.model('Recipes', recipesSchema);