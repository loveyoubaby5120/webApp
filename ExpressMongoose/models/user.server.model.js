var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	uid: Number,
	username: String,
	createTime: Date,
	lastLogin: Date
});


mongoose.model("User",userSchema);