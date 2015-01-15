//User Schema page: defines user object and associated information
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//Mongoose schema for users
//currently only password and username
var usersSchema = new mongoose.Schema({
	username: String,
	password: String
});

//Associated method for usersSchema:
//generating a hash for the person
usersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

//checking if a password is valid
usersSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
//create entire model to expose it to the entire application
var User = mongoose.model('Users', usersSchema);
exports.User = User;


