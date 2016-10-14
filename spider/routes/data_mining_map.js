var express = require('express');
var router = express.Router();

var request = require('request');
var rp = require('request-promise');

var cheerio = require('cheerio');

var URL = require('url');

var fs = require('fs');
var readLine = require('lei-stream').readLine;

var list = require('../public/data_mining_map.json');

var mongoose = require('mongoose');
var People = mongoose.model('People');


/* GET home page. */

router.get('/', function(req, res, next) {
	var pagesize = parseInt(req.query.pagesize,10) || 10;
	var pagestart = parseInt(req.query.pagestart,10) || 10;


	People
	// .find({"org": {"$not": {"$in":[null,""]}}})
	.find({"org": {"$not": {"$in":[null,""]}},"lat":{"$exists":false}})
	.sort({'_id':-1})
	.skip((pagestart - 1) * pagesize)
	.limit(pagesize)
	.exec(function(err, docs){
		if(err){
			return next(err);
		}


		return res.render('data_mining_map', { title: 'BaiduMap', array: docs });
	});

  	
});

function isJson(obj){
	var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;    
	return isjson;
}


router.get('/google', function(req, res, next) {

	res.render('data_mining_map_google', { title: 'googleMap' });

});

router.get('/address', function(req, res, next) {

	var address = []


	list.forEach(function(el, index) {
		addr(el.contact.address)
	});




	res.json(address);

});


function addr(addr){

	(function(obj){

		var gotoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + obj.org + '&key=AIzaSyAnlGl1bMu19QXpr2BDnqx2FmHp6WIlFbI';

			gotoUrl = 'https://developers.google.com';

		var options = {
			uri: gotoUrl,
			method: 'get',
			timeout: 5000,
			headers: {
				'Host': "maps.googleapis.com",
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
				'Accept-Encoding': 'gzip, deflate, sdch, br',
				'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4',
				'Cache-Control': 'max-age=0',
				'Upgrade-Insecure-Requests': '1',
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36',
				'X-Client-Data': 'CJe2yQEIprbJAQjBtskB'

			}
		};


		request(options,function(error, response,body){

			if(!error && response.statusCode ==200){
				
				if(body.status === "OK"){

					var location = body.results[0].geometry.location;

					if(location){
						var people = {};

						people.lng = location.lng;
						people.lat = location.lng;

						// People.update({_id: req.query.id },people,function(err){});
					}
				    
				}

			}else{
				console.log("'错误-链接异常-"+error+"-"+options.uri+"'");
			}

		},function(err, result){
			if(err){
				console.log("'错误-链接未发送-"+err+"-"+options.uri+"'");
			}else{
				console.log('获取请求成功');
			}
			
		});
		
		// rp(gotoUrl)
		// 	.then(function(body){

		// 		console.log(body);

		// 		if(body.status === "OK"){

		// 			var location = body.results[0].geometry.location;

		// 			fs.appendFile('./public/obj.txt',JSON.stringify(location),function(err){  
		// 		        if(err) throw err;  
		// 		        // console.log('write TEXT into TEXT');  
		// 		    });
						      
		// 		    fs.appendFile('./public/obj.txt','\n',function(err){  
		// 		        if(err) throw err;  
		// 		        console.log(obj);  
		// 		    });
				    
		// 		}

				
		// 	},function(error){
		// 		console.log(error);
		// 	})
		// 	.catch(function(err){
		// 		console.log(err);
		// 	});


	})(addr)

	
}



function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + milliSeconds);
 };

module.exports = router;
