var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');
var cheerio = require('cheerio');

var URL = require('url');

var fs = require('fs');
var readLine = require('lei-stream').readLine;

var list = require('../public/data_mining_map.json');



/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('data_mining_map', { title: 'MAP' });
});


router.get('/', function(req, res, next) {

	res.json(list);

});

function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + milliSeconds);
 };

module.exports = router;
