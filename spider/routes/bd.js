var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');

var mongoose = require('mongoose');
var WeChat = mongoose.model('WeChat');

/* GET home page. */

router.get('/', function(req, res, next) {

	console.log('start spider');

	var options = {
	    uri: 'http://www.gsdata.cn/newRank/getwxranks',
	    qs: {
	    	gid:'205',
			date:'2016-06-13',
			page:'1',
			type:'day',
			cp:'all',
			t:'0.9095617456105527',
			action:'',
	    },
	    headers: {
	    	'Host': 'www.gsdata.cn',
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:37.0) Gecko/20100101 Firefox/37.0',
			'Accept': 'application/json, text/javascript, */*; q=0.01',
			'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
			'Accept-Encoding': 'gzip, deflate, sdch',
			'X-Requested-With': 'XMLHttpRequest',
			'Referer': 'http://www.gsdata.cn/rank/detail',
			'Cookie': 'PHPSESSID=sk9he9uvqb7i7vfd08no2q2ho2; bdshare_firstime=1465889026970; Hm_lvt_293b2731d4897253b117bb45d9bb7023=1465887653; Hm_lpvt_293b2731d4897253b117bb45d9bb7023=1465889858',
			'Connection': 'keep-alive'
	    },
	    json: true // Automatically parses the JSON string in the response 
	};


	var reOptions = {
		url: 'http://www.gsdata.cn/newRank/getwxranks',
	    qs: {
	    	gid:'205',
			date:'2016-06-13',
			page:'1',
			type:'day',
			cp:'all',
			t:'0.9095617456105527',
			action:'',
	    },
		headers: {
	    	'Host': 'www.gsdata.cn',
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:37.0) Gecko/20100101 Firefox/37.0',
			'Accept': 'application/json, text/javascript, */*; q=0.01',
			'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
			'Accept-Encoding': 'gzip, deflate, sdch',
			'X-Requested-With': 'XMLHttpRequest',
			'Referer': 'http://www.gsdata.cn/rank/detail',
			'Cookie': 'PHPSESSID=sk9he9uvqb7i7vfd08no2q2ho2; bdshare_firstime=1465889026970; Hm_lvt_293b2731d4897253b117bb45d9bb7023=1465887653; Hm_lpvt_293b2731d4897253b117bb45d9bb7023=1465889858',
			'Connection': 'keep-alive'
	    }
	}

	var Json = {};
	var count = 0;
	var errorNum = 0;
	var success = 0;
	for(var z=0; z<365; z++){
		var d = new Date(new Date(options.qs.date).getTime()-1000*60*60*24).toISOString().slice(0,10);
		options.qs.date = d;

		reOptions.qs.date = d;
		for(var i =1 ; i<6; i++){
			options.qs.page = i;
			options.qs.t = Math.random();

			reOptions.qs.page = i;
			reOptions.qs.t = Math.random();

			(function(num,op){
				request(op,function(error, response,body){
				if(!error && response.statusCode ==200){
					success++;
					console.log('成功获取' + success + '条');
					body = JSON.parse(body); 
					console.log(body);
					if(body){
						for(var j = 0; j < body.data.rows.length; j++){
							var wechat = new WeChat(body.data.rows[j]);
							wechat.save(function(err){
								if(err){
									return next(err);
								}
								
								return j;
							});

						}
					}
				}
				else{
					errorNum++;
					console.log(error);
					console.log('一共错误' + errorNum + '条');
					console.log('第' + num + '条');

				}

			});
			})(count,reOptions);
			
			

			// (function(num,op){
			// 	rp(op)
			// 	.then(function(body){
			// 		success++;
			// 		console.log('成功获取' + success + '条');
			// 		if(body){
			// 			console.log(body.data.error);
			// 			for(var j = 0; j < body.data.rows.length; j++){
			// 				var wechat = new WeChat(body.data.rows[j]);
			// 				wechat.save(function(err){
			// 					if(err){
			// 						return next(err);
			// 					}
								
			// 					return j;
			// 				});

			// 			}
			// 		}
					
			// 	},function(error){
			// 		errorNum++;
			// 		console.log(error);
			// 		console.log('一共错误' + errorNum + '条');
			// 		console.log('第' + num + '条');
			// 	});
			// })(count,options)
			

			count++;
		}
	}

	console.log(count);
	console.log('end spider');

	var pagesize = parseInt(req.query.pagesize,10) || 10;
	var pagestart = parseInt(req.query.pagestart,10) || 10;

	WeChat
	.find()
	.exec(function(err, docs){
		if(err){
			return next(err);
		}
		return res.json(docs.length);
	});
});


function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + milliSeconds);
 };

module.exports = router;
  