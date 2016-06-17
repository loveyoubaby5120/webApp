var mongoose = require('mongoose');

var NewRankSchema = new mongoose.Schema({
	name: String,
	account: String,
	getTime: Date,
	createTime: {
		type: Date,
		default: Date.now
	}
});


var News = mongoose.model("NewRank",NewRankSchema);