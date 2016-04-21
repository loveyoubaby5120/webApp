var mongoose = require('mongoose');
require('./model.js');

var Book = mongoose.model('Book');

var  cond_or = {
	$or: [
		{author:'pankai'},
		{author:'kai'}
	]
};	

var  cond_add = {
	$add: [
		{author:'pankai'},
		{author:'kai'}
	]
};

Book.find(cond_or,function(err,docs){
	if(err){
		console.log('err: ',err);
		return;
	}

	console.log('cond: ',cond_or,'result: ',docs);

});