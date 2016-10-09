var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');

var rp = require('request-promise');

var nodeXlsx = require('node-xlsx');

var md5 = require('md5');

var mongoose = require('mongoose');
var NewRank = mongoose.model('NewRank');

var key = ['跑步','科技','母婴','商业','旅行','运动'];
var form_rank_name_group_arr = ['资讯','生活'];
var form_rank_name_arr = ['科技','学术','财富','商业','旅行'];

var form_Date = [
				{key_index:1,group:'资讯',name:'科技'},{key_index:1,group:'资讯',name:'学术'},{key_index:3,group:'资讯',name:'财富'},
				{key_index:3,group:'暂无',name:'商业'},{key_index:4,group:'生活',name:'旅行'}
			];

var form_Date_index = 0;

var index = form_Date[form_Date_index].key_index;

var form_rank_name_group = form_Date[form_Date_index].group;
var form_rank_name = form_Date[form_Date_index].name;

/* GET home page. */

router.get('/', function(req, res, next) {


	// var newrank = {};

	// newrank.key = '其他';

	// NewRank.update({_id: req.query.id },newrank,function(err){});


	form_Date_index = req.query.index;

	index = form_Date[form_Date_index].key_index;

	form_rank_name_group = form_Date[form_Date_index].group;
	form_rank_name = form_Date[form_Date_index].name;

	console.log('start spider');


	var obj = nodeXlsx.parse("./WeChat.xlsx");
	var noXlsx = {};
	for(var i = 0; i< obj[0].data.length; i++){
		noXlsx[obj[0].data[i][0]] = obj[0].data[i];
	}


	var date = new Date().toISOString().slice(0,10);
	var Json = [];
	var count = 0;
	var errorNum = 0;
	var success = 0;
	for(var z=0; z<7; z++){
		var d = new Date(new Date(date).getTime()-1000*60*60*24).toISOString().slice(0,10);
		date = d;
		var formDate = {
		    	'end': d,
				'rank_name': form_rank_name,
				'rank_name_group': form_rank_name_group,
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
	
	httpRequest(Json,0,50,noXlsx,res);
	

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


function httpRequest(Json,str,end,noXlsx,res){
	var arr = Json.slice(str,end);
	async.forEachLimit(arr, 50, function(item, callback){
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
						// var editJson = body.value[j];
						// editJson.getTime = item.form.start;
						// var newrank = new NewRank(editJson);
						// newrank.save(function(err){
						// 	if(err){
						// 		return next(err);
						// 	}
							
						// 	return j;
						// });

						var editJson = body.value[j];
						if(noXlsx[editJson.name]){
							// console.log(rows.wx_name);
							// console.log(noXlsx[rows.wx_name]);
							// console.log(j);
						}
						else{
							editJson.key = key[index];
							editJson.tag = index;
							editJson.account = editJson.wx_name;
							editJson.name = editJson.wx_nickname;
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
				httpRequest(Json,end,(end+50),noXlsx,res);
			}
			if(Json[Json.length-1]==item){
				console.log('结束');
				res.send('结束');
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
  