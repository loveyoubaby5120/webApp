var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');
var cheerio = require('cheerio');

var URL = require('url');

var fs = require('fs');
var readLine = require('lei-stream').readLine;



/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,content:'请输入公众号'});
});


router.post('/', function(req, res, next) {
	console.log('start spider');

	fs.writeFile('./public/url.txt','',function(err){  
        if(err) throw err;  
        // console.log('write TEXT into TEXT');  
    });


	var searchs = req.body.url.split(',');
	var bool = false;
	if(req.body.url){
		for(search in searchs){
			var gotoUrl = 'http://www.gsdata.cn/query/wx?q='+searchs[search]+'&search_field=undefined';	
		
			var Json = {};
			var url = [];
			var biz = [];
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

						    fs.appendFile('./public/url.txt',bizNum,function(err){  
						        if(err) throw err;  
						        // console.log('write TEXT into TEXT');  
						    });  
						    fs.appendFile('./public/url.txt','\n',function(err){  
						        if(err) throw err;  
						        // console.log('write TEXT into TEXT');  
						    });  

						}
					}

					Json.biz = biz;
					Json.url = url
					
				})
				.catch(function(){
					// res.render('index', { title: 'Express' ,content:'读取失败'});
				});
		}
	}

	console.log('end spider');

	res.render('index', { title: 'Express' ,content:'操作成功，请查看文件url.txt'});

});

function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + milliSeconds);
 };

module.exports = router;
