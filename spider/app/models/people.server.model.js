var mongoose = require('mongoose');

var PopleSchema = new mongoose.Schema({
	lng: {
		type: String,
		default: ''
	},
	lat: {
		type: String,
		default: ''
	},
	org: {
		type: String,
		default: ''
	},
	name: {
		type: String,
		default: ''
	}
});


var People = mongoose.model("People",PopleSchema, 'people');