var mongoose = require('mongoose');
require('./model.js');

var Book = mongoose.model('Book');

Book.findOne({author:"pankai"},function(err,docs){
	if(err){
		console.log('err: ',err);
		return;
	}

	if(docs){
		docs.remove();
	}
});