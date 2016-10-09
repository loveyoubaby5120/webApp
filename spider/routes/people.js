var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');

var rp = require('request-promise');


var mongoose = require('mongoose');
// var People = mongoose.model('People');


/* GET home page. */

router.get('/', function(req, res, next) {


	// var newrank = {};

	// newrank.key = '其他';

	// NewRank.update({_id: req.query.id },newrank,function(err){});



	console.log('start spider');


	console.log('end spider');


	// NewRank.remove(function(err){
	//     if(!err){
	//         console.log('删除数据');
	//     }
	// });

});


function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + milliSeconds);
 };

module.exports = router;
  