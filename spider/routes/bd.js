var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');

var rp = require('request-promise');

var nodeXlsx = require('node-xlsx');

var mongoose = require('mongoose');
// var WeChat = mongoose.model('WeChat');
var NewRank = mongoose.model('NewRank');

var key = ['跑步','科技','母婴','商业','旅行','运动'];
var qs_gzh_id_Arr = [30174,242,12480,43201,43176,42,8527,26488,26377,26482,4267,196,4485,27502,28082,28226];
var qs_gzh_id_str_Arr = [
					{key_index:0,name:'生活->跑步',id:30174},{key_index:1,name:'行业->大数据',id:242},{key_index:1,name:'行业->学术',id:12480},
					{key_index:1,name:'行业->VR',id:43201},{key_index:1,name:'行业->无人机',id:43176},{key_index:1,name:'生活->科技',id:42},
					{key_index:1,name:'商业->手机',id:8527},{key_index:2,name:'生活->亲子',id:26488},{key_index:3,name:'商业->企业家',id:26377},
					{key_index:3,name:'商业->企业',id:26482},{key_index:3,name:'行业->财经',id:4267},{key_index:4,name:'行业->旅游',id:196},
					{key_index:5,name:'生活->运动',id:4485},{key_index:5,name:'生活->足球',id:27502},{key_index:5,name:'生活->篮球',id:28082},
					{key_index:5,name:'生活->高尔夫',id:28226}
				];
var qs_option_index = 0;
var index = qs_gzh_id_str_Arr[qs_option_index].key_index;
var qs_gzh_id = qs_gzh_id_str_Arr[qs_option_index].id;
/* GET home page. */

router.get('/', function(req, res, next) {
	


	var obj = nodeXlsx.parse("./WeChat.xlsx");
	var noXlsx = {};
	for(var i = 0; i< obj[0].data.length; i++){
		noXlsx[obj[0].data[i][0]] = obj[0].data[i];
	}

	console.log('start spider');




	for(var eee = 0; eee < qs_gzh_id_str_Arr.length;eee++){
		qs_option_index = eee;
		index = qs_gzh_id_str_Arr[qs_option_index].key_index;
		qs_gzh_id = qs_gzh_id_str_Arr[qs_option_index].id;

		var key_index = qs_gzh_id_str_Arr[qs_option_index].key_index;
		var date = '2016-06-17';

		date = new Date().toISOString().slice(0,10);

		var Json = [];
		var count = 0;
		var errorNum = 0;
		var success = 0;
		for(var z=0; z<7; z--){
			var d = new Date(new Date(date).getTime()-1000*60*60*24).toISOString().slice(0,10);
			date = d;
			if(d=='2014-11-30'){
				break;
			}
			for(var i =1 ; i<6; i++){

				var options = {
				    uri: 'http://www.gsdata.cn/newRank/getwxranks',
				    qs: {
				    	gid: qs_gzh_id,
						date:d,
						page:i,
						type:'day',
						cp:'all',
						t:Math.random(),
						action:'',
						key_index:key_index
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
				    json: true
				};
				

				Json.push(options);

				count++;
			}
		}

		
		httpRequest(Json,0,50,noXlsx,res);
	}

	console.log(count);
	console.log('end spider');



});



function httpRequest(Json,str,end,noXlsx,res){
	var arr = Json.slice(str,end);
	async.forEachLimit(arr, 50, function(item, callback){
		request(item,function(error, response,body){
			if(!error && response.statusCode ==200){
				// res.send(response.request);
				// return false;
				if(body && body.data && body.data.rows){
					for(var j = 0; j < body.data.rows.length; j++){
						var rows = body.data.rows[j];
						
						if(noXlsx[rows.wx_name]){
							// console.log(rows.wx_name);
							// console.log(noXlsx[rows.wx_name]);
							// console.log(j);
						}
						else{
							rows.key = key[item.qs.key_index];
							rows.tag = item.qs.key_index;
							rows.account = rows.wx_name;
							rows.name = rows.wx_nickname;
							rows.getTime = item.qs.date;
							var newrank = new NewRank(rows);
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
					console.log(response.request.path);
				}
			}
			else{
				console.log(error);
				console.log(response);
			}

			if(arr[arr.length-1]==item && end <= Json.length){
				console.log(end);
				httpRequest(Json,end,(end+50),noXlsx,res);
			}
			if(Json[Json.length-1]==item){
				console.log('结束');
				// res.send('结束');
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
  