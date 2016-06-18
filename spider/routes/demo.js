var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');

var rp = require('request-promise');


/* GET home page. */

router.get('/', function(req, res, next) {

	//获取移动端post数据
	var e = req.body;
	console.log(req.query);


	console.log('start spider');

	request('http://192.168.1.15:8080/HttpClientTest/servlet/GetTokenServlet',function(error, response,body){
		if(!error && response.statusCode ==200){
			var options = {
			    uri: 'http://61.161.203.48/yyzc/mobile/zzgl/Tzyj/getTzyjList?zmlm="XT"',
			    method: 'post',
			    form: {
			    	'username': '11',
			    	'password': '22'
			    },
			    headers: {
			    	'Cookie': body
			    },
			    json: true
			};


			request(options,function(_error, _response,_body){
				if(!_error && _response.statusCode ==200){
					var option = {};
					res.send(_body)
				}

			});

		}
		else{
			console.log(error);
		}

	});

	// var options = {
	//     uri: 'http://61.161.203.48/yyzc/mobile/zzgl/Tzyj/getTzyjList?zmlm="XT"',
	//     method: 'post',
	//     form: {
	//     	'username': '11',
	//     	'password': '22'
	//     },
	//     headers: {
	//     	'Cookie': ''
	//     },
	//     json: true
	// };


	// request(options,function(error, response,body){
	// 	if(!error && response.statusCode ==200){
	// 		var option = {};
	// 		// res.send(body)
	// 	}

	// });

	

	console.log('end spider');


});





module.exports = router;
  