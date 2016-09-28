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
  res.render('data_mining_map', { title: 'BaiduMap' });
});


router.get('/google', function(req, res, next) {

	res.render('data_mining_map_google', { title: 'googleMap' });

});

router.get('/address', function(req, res, next) {

	var address = []

	fs.writeFile('./public/obj.txt','',function(err){  
        if(err) throw err;  
        // console.log('write TEXT into TEXT');  
    });


	list.forEach(function(el, index) {
		if(el.contact.address && index == 0 ){
			address.push(el.contact.address)
			addr(el.contact.address)
		}
	});




	res.json(address);

});

function addr(addr){

	(function(obj){

		var gotoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + obj.split(',')[0] + '&key=AIzaSyAnlGl1bMu19QXpr2BDnqx2FmHp6WIlFbI';

		// gotoUrl = 'http://www.baidu.com'


		var options = {
			uri: gotoUrl,
			method: 'get',
			timeout: 5000
		};


		request(options,function(error, response,body){

			if(!error && response.statusCode ==200){
				
				if(body.status === "OK"){

					var location = body.results[0].geometry.location;

					fs.appendFile('./public/obj.txt',JSON.stringify(location),function(err){  
				        if(err) throw err;  
				        // console.log('write TEXT into TEXT');  
				    });
						      
				    fs.appendFile('./public/obj.txt','\n',function(err){  
				        if(err) throw err;  
				        console.log(obj);  
				    });
				    
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
