var request = require('request');
var rp = require('request-promise');
var cheerio = require('cheerio');

var URL = require('url');

var fs = require('fs');
var readLine = require('lei-stream').readLine;


var requestPomise = function(){}

requestPomise.prototype.send=function(params){



	var searchs = params.url.split(',');
	var Json = {};
	var url = [];
	var biz = [];
	Json.biz = biz;
	Json.url = url;
	if(params.url){
		for(var j = 0; j<searchs.length; j++){
			var gotoUrl = 'http://www.gsdata.cn/query/wx?q='+searchs[j]+'&search_field=undefined';	

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


						}
					}
					console.log('j: ',j);
					
					if(searchs[j] == searchs[searchs.length-1]){
				    	// console.log(Json);
				    	// console.log(1);
				    }
					


				})
				.catch(function(){

					// res.render('index', { title: 'Express' ,content:'读取失败'});
				})
				.finally(function () {
					
			        // This is called after the request finishes either successful or not successful.
			        
			    });


		}

	}

	// return Json;

}


module.exports=new requestPomise();

