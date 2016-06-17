var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');

var rp = require('request-promise');

var mongoose = require('mongoose');
var WeChat = mongoose.model('WeChat');

/* GET home page. */

router.get('/', function(req, res, next) {

	console.log('start spider');

	var date = '2016-06-13';

	var Json = [];
	var count = 0;
	var errorNum = 0;
	var success = 0;
	for(var z=0; z<365; z++){
		var d = new Date(new Date(date).getTime()-1000*60*60*24).toISOString().slice(0,10);
		date = d;

		for(var i =1 ; i<6; i++){

			var options = {
			    uri: 'http://www.gsdata.cn/newRank/getwxranks',
			    qs: {
			    	gid:'205',
					date:d,
					page:i,
					type:'day',
					cp:'all',
					t:Math.random(),
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
			

			Json.push(options);

			// (function(num,op){
			// 	request(op,function(error, response,body){
			// 		if(!error && response.statusCode ==200){
			// 			success++;
			// 			console.log('成功获取' + success + '条');
			// 			if(body){
			// 				for(var j = 0; j < body.data.rows.length; j++){
			// 					// var wechat = new WeChat(body.data.rows[j]);
			// 					// wechat.save(function(err){
			// 					// 	if(err){
			// 					// 		return next(err);
			// 					// 	}
									
			// 					// 	return j;
			// 					// });

			// 				}
			// 			}
			// 			else{
			// 				console.log(response.request.path);
			// 			}
			// 		}
			// 		else{
			// 			errorNum++;
			// 			console.log(error);
			// 			console.log('一共错误' + errorNum + '条');
			// 			console.log('第' + num + '条');

			// 		}

			// 	});
			// })(count,options);
			
			

			// (function(num,op){
			// 	rp(op)
			// 	.then(function(body){
			// 		success++;
			// 		console.log('成功获取' + success + '条');
			// 		if(body){
			// 			console.log(body.data.error);
			// 			for(var j = 0; j < body.data.rows.length; j++){
			// 				// var wechat = new WeChat(body.data.rows[j]);
			// 				// wechat.save(function(err){
			// 				// 	if(err){
			// 				// 		return next(err);
			// 				// 	}
								
			// 				// 	return j;
			// 				// });

			// 			}
			// 		}
					
			// 	},function(error){
			// 		errorNum++;
			// 		console.log(error);
			// 		console.log('一共错误' + errorNum + '条');
			// 		console.log('第' + num + '条');
			// 	});
			// })(count,options);
			

			count++;
		}
	}

	
	httpRequest(Json,0,50);
	

	console.log(count);
	console.log('end spider');


	// WeChat.remove(function(err){
	//     if(!err){
	//         console.log('删除数据');
	//     }
	// });

});



function httpRequest(Json,str,end){
	var arr = Json.slice(str,end);
	async.forEachLimit(arr, 50, function(item, callback){
		request(item,function(error, response,body){
			if(!error && response.statusCode ==200){
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
				else{
					console.log(response.request.path);
				}
			}
			else{
				console.log(error);
				console.log(response);
			}
			if(arr[arr.length-1]==item && end <= Json.length){
				console.log(end);
				httpRequest(Json,end,(end+50));
			}

		},function(err, result){
			if(err){
				console.log('获取链接失败');
			}else{
				console.log('获取链接结束');
			}
			
		});
	});
}


module.exports = router;
  