var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

var rp = require('request-promise');

var URL = require('url');

/* GET home page. */

router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});


router.post('/', function(req, res, next) {
	console.log('start spider');
	var searchs = req.body.url.split(',');
	for(search in searchs){
		var gotoUrl = 'http://www.gsdata.cn/query/wx?q='+searchs[search]+'&search_field=undefined';	
	
		console.log('gotoUrl: '+gotoUrl);
		
		var Json = {};
		var url = [];
		var biz = [];
		// request('http://www.gsdata.cn/query/wx?q=caixinwang&search_field=undefined',function(error, response,body){
		// 	if(!error && response.statusCode ==200){
		// 		$ = cheerio.load(body);
		// 		var list = $('#content .container .row .article-container .article-ul li');
				
		// 		if(list.length>0){
		// 			for(var i = 0; i<list.length; i++){
		// 				var aUrl = list.find('.number-img .img-bg').attr('href');
		// 				var gotoUrl = 'http://www.gsdata.cn/' + aUrl;
		// 				url.push(gotoUrl);

		// 				// request(gotoUrl,function(error2, response2,body2){
		// 				// 	if(!error2 && response2.statusCode ==200){
		// 				// 		$2 = cheerio.load(body2);
		// 				// 		var li = $2('#content .container .row .article-container .article-ul li');
		// 				// 		if(li.length>0){
		// 				// 			biz.push(li.find('.wx-img a').attr('href'));
		// 				// 		}
		// 				// 	}
		// 				// });

		// 			}
		// 		}

		// 		Json.biz = biz;
		// 		Json.url = url

		// 	}

		// });

		rp(gotoUrl)
			.then(function(body){
				$ = cheerio.load(body);
				var list = $('#content .container .row .article-container .article-ul li');
				if(list.length>0){
					for(var i = 0; i<list.length; i++){
						var aUrl = list.find('.number-img .img-bg').attr('href');
						var gotoUrl = 'http://www.gsdata.cn/' + aUrl;
						url.push(gotoUrl);

						var bizUrl = list.find('.number-txt .wx-sp .sp-txt').eq(1).find('a').attr('href');

						var arg = URL.parse(bizUrl,true).query

						bizNum = arg['__biz'];

						biz.push(bizNum);

		// 				rp(gotoUrl)
		// 					.then(function(body2){
		// 						$2 = cheerio.load(body2);
		// 						var script = $2('script').get(5).children[0].data;

		// 						var li = $2('#content .container .row .article-container .article-ul li');
		// 						if(li.length>0){
		// 							biz.push(li.find('.wx-img a').attr('href'));
		// 						}
		// 						// res.json(Json);
		// 					});


					}
				}

				Json.biz = biz;
				Json.url = url
				
				res.json(Json);
			});


		console.log('end spider');
	}
});


function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + milliSeconds);
 };

module.exports = router;
  