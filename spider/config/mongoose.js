var mongoose = require('mongoose');
var config = require('./config');

module.exports = function(){
	// var db = mongoose.connect(config.mongodb);
	var db = mongoose.connect(config.mongodb, config.options);

	// require('../app/models/news.server.model');
	// require('../app/models/wechat.server.model');
	// require('../app/models/newrank.server.model');
	require('../app/models/people.server.model');
	return db;
}