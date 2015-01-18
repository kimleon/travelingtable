var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
var markersSchema = new Schema({
	latitude: Number,
	longitude: Number,
	recipeId: [{type: mongoose.Schema.ObjectId, ref: "Recipe"}]
});

var Marker = mongoose.model('Marker', markersSchema);

exports.Marker = Marker;