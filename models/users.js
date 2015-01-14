var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
	name: String
});

var User = mongoose.model('Users', usersSchema);