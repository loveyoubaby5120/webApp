var express = require('express');
var router = express.Router();
var request = require('request');
var request = request.defaults({jar: true});
var async = require('async');

var rp = require('request-promise');


var mongoose = require('mongoose');
var People = mongoose.model('People');


/* GET home page. */

router.get('/', function(req, res, next) {

	var people = {};

	if(req.query.lng){

		// var urlSuffix="https://api.aminer.org/api/person/geo/548effd5dabfaef989f09725";
		
		// var v_body = { 'lat': 54.0101034, 'lng': -2.7850105 }
		// // var v_body = { "email": "273377900@qq.com","password": "Pk444988281", "persist": true}
		
		// var options = {
		// 	uri: urlSuffix,
		// 	method: 'PUT',
		// 	form: JSON.stringify(v_body),
		// 	headers: {
		// 		'Accept': 'application/json, text/plain, */*',
		// 		'Accept-Encoding': 'gzip, deflate, sdch, br',
		// 		'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4',
		// 		'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyLVBEb2dkemcxMG55TEVrV0hVK0pFMGdcL2wyTkJVUUlZYkJYNFpqN2YyVEJOSmp5TVFnRktkTmFcLzJyT08ySWR6QllxUnhCc01IRnRZeTl5aTNvYjduY1wvS205VTBcLysrYzdcL2V5N3RBUT0iLCJpc3MiOiJwbGF5LWFuZ3VsYXItc2lsaG91ZXR0ZSIsImV4cCI6MTQ3OTM1MzM3NiwiaWF0IjoxNDc2NzYxMzc2LCJqdGkiOiIxNDM3ZTg4NDA2YWE3MTIyYzJmNzI2ODdiMDk0ZjRmNWUyNzlmNTJmYjZjZDViNDczMjM5NDViMzc0MTkzN2E2NGMyN2QwNDk3MjRlNzExNjVmMmY3NzUwZWI0NzM2YTRlZTA5YTI2YjcxYmQyNDNlZDdlOTY3MWQ2OWFhYzVmYWJkNmNlZDNjOGRlMWJkYmFkZGQ2MzlkYTgzOWQyZmFkMmE3MWU1NzUxODVhMDlkOGQ3NjczODViNTRhZTcwZDJhNzVhZTQ0Mjg1YTg1MmZmOTIwYWFmZWNiOGMzZDVmZTY1MmYwNWVhM2Q3YWU0OGE1N2FmMmE3MTIxM2I0YTI3In0.zm1KhRBqH-KuGoNr7uoeKcxeSCX1HO7dMRGEQZgq7ro',
		// 		'Connection': 'keep-alive',
		// 		'Host': 'api.aminer.org',
		// 		'Origin': 'http://localhost:3000',
		// 		'Referer': 'http://localhost:3000/map?t=b&q=Data%20Mining',
		// 		'Content-Length':82,
		// 		'Content-Type':'application/json;charset=UTF-8',
		// 		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',

		//     }
		// };
			
		// request(options,function(error, response,body){
		// 	// console.log(response.statusCode);
		// 	if(!error && response.statusCode ==200){
				
		// 		res.send(body)
		// 	}else{
		// 		console.log("'错误-链接异常-"+error+"-"+options.uri+"'");
		// 		// res.send(response.statusCode)
		// 	}

		// },function(err, result){
		// 	if(err){
		// 		console.log("'错误-链接未发送-"+err+"-"+options.uri+"'");
		// 	}else{
		// 		console.log('获取请求成功');
		// 	}
		// 	res.send("xxxxx")
			
		// });

		people.lng = req.query.lng;
		people.lat = req.query.lat;


		People.update({_id: req.query._id },people,function(err){
			if(err)
				res.json({message: false})
			else
				res.json({message: true})
		});
	}
	else{
		res.send("OK")
	}


	// var pagesize = parseInt(req.query.pagesize,10) || 10;
	// var pagestart = parseInt(req.query.pagestart,10) || 10;

	// People
	// .find()
	// .sort({'_id':-1})
	// .skip((pagestart - 1) * pagesize)
	// .limit(pagesize)
	// .exec(function(err, docs){
	// 	if(err){
	// 		return next(err);
	// 	}


	// 	docs.forEach(function(el, index) {
	// 		addr(el)
	// 	});

	// 	return res.json(docs);
	// });



});


function addr(addr){
	console.log(addr);

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

						People.update({_id: req.query.id },people,function(err){});
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
  