var mongoose = require('mongoose');
var config = require('./config');

module.exports = function(){
	var db = mongoose.connect(config.mongodb);

	require('../app/models/news.server.model');
	require('../app/models/wechat.server.model');
	require('../app/models/newrank.server.model');
	return db;
}