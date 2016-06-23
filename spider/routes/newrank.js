var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');

var rp = require('request-promise');

var md5 = require('md5');

var mongoose = require('mongoose');
var NewRank = mongoose.model('NewRank');

/* GET home page. */

router.get('/', function(req, res, next) {

	NewRank.remove(function(err){
	    if(!err){
	        console.log('删除数据');
	    }
	});

	console.log('start spider');

	var date = new Date().toISOString().slice(0,10);
	date = new Date(new Date(date).getTime()-1000*60*60*24).toISOString().slice(0,10);

	var Json = [];
	var count = 0;
	var errorNum = 0;
	var success = 0;
	for(var z=0; z<365; z++){
		var d = new Date(new Date(date).getTime()-1000*60*60*24).toISOString().slice(0,10);
		date = d;
		var formDate = {
		    	'end': d,
				'rank_name': '汽车',
				'rank_name_group': '资讯',
				'start': d,
		    };
		var url = '/xdnphb/list/day/rank?AppKey=joker';
		for(var jj in formDate){
			url += "&" + jj + "=" + formDate[jj]
		}
		var nonceInfo = nonce();
		url += '&nonce='+nonceInfo;
		// console.log(url);
		// console.log(md5(url));
		formDate.nonce = nonceInfo;
		formDate.xyz = md5(url);
		var options = {
		    uri: 'http://www.newrank.cn/xdnphb/list/day/rank',
		    method: 'post',
		    form: formDate,
		  //   form: {
		  //   	'end': d,
				// 'rank_name': '汽车',
				// 'rank_name_group': '资讯',
				// 'start': d,
				// 'nonce': nonceInfo,
				// 'xyz': md5(url)
				// // 'nonce': '01c291ffb',
				// // 'xyz': '9ee78e5ae3828561ed7a92a471e1a542'
		  //   },
		    headers: {
		    	'Host': 'www.newrank.cn',
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:46.0) Gecko/20100101 Firefox/46.0',
				'Accept': 'application/json, text/javascript, */*; q=0.01',
				'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
				'Accept-Encoding': 'gzip, deflate',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'X-Requested-With': 'XMLHttpRequest',
				'Referer': 'http://www.newrank.cn/xdnphb/list/day/rank',
				'Content-Length': '148',
				'Cookie': 'Hm_lvt_a19fd7224d30e3c8a6558dcb38c4beed=1466086110; Hm_lpvt_a19fd7224d30e3c8a6558dcb38c4beed=1466086145; CNZZDATA1253878005=1061856738-1466084097-%7C1466084097',
				'Connection': 'keep-alive'
		    },
		    json: true // Automatically parses the JSON string in the response 
		};
		

		Json.push(options);
		

		count++;
	}
	// console.log(Json);

	// request(Json[3],function(error, response,body){
	// 	if(!error && response.statusCode ==200){
	// 		res.send(body);
	// 		if(body){
	// 		}
	// 		else{
	// 			console.log(response.request.path);
				
	// 		}
	// 	}
	// 	else{
	// 		console.log(error);

	// 	}

	// });
	
	httpRequest(Json,0,1);
	

	console.log(count);
	console.log('end spider');


	// NewRank.remove(function(err){
	//     if(!err){
	//         console.log('删除数据');
	//     }
	// });

});


function nonce(){
	// for (var a = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"], b = 0; 500 > b; b++) 
	var a = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
	for (var c = "",d = 0; 9 > d; d++) {
        var e = Math.floor(16 * Math.random());
        c += a[e]
    }
    return c
}


function httpRequest(Json,str,end){
	var arr = Json.slice(str,end);
	async.forEachLimit(arr, 1, function(item, callback){
		request(item,function(error, response,body){
			if(!error && response.statusCode ==200){
				if(body){
					if(body.value.length ==0){
						var url;
						for(var jj in item.form){
							url += "&" + jj + "=" + item.form[jj]
						}
						// console.log(url);
					}
					else{
						console.log(body.value.length);
					}
					for(var j = 0; j < body.value.length; j++){
						var editJson = body.value[j];
						editJson.getTime = item.form.start;
						var newrank = new NewRank(editJson);
						newrank.save(function(err){
							if(err){
								return next(err);
							}
							
							return j;
						});

					}
				}
				else{
					console.log('body is null');
					console.log(item.form);
				}
			}
			else{
				console.log(error);
			}
			if(arr[arr.length-1]==item && end <= Json.length){
				console.log(end);
				sleep(2000);
				httpRequest(Json,end,(end+1));
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


function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + milliSeconds);
 };

module.exports = router;
  