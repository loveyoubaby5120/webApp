var mongoose = require('mongoose');

var NewRankSchema = new mongoose.Schema({
	key: {
		type: String,
		default: ''
	},
	tag: {
		type: String,
		default: '0'
	},
	name: String,
	account: String,
	getTime: {
		type: Date,
		default: Date.now
	},
	createTime: {
		type: Date,
		default: Date.now
	}
});


var News = mongoose.model("NewRank",NewRankSchema);