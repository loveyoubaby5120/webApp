var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');
var cheerio = require('cheerio');

var URL = require('url');

var fs = require('fs');
var readLine = require('lei-stream').readLine;

var list = require('../public/wiki_searchs.json');
var errorWiki = require('../public/errorWiki.json');


/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , content:'不需要填写内容', action: '/wiki'});
});


router.post('/', function(req, res, next) {
	console.log('start spider');



	// for(searchs of errorWiki){
	// 	(function(search){


	// 		fs.unlink('./public/wiki/' + search.CID+ '.txt', function(err){
	// 			if(err){
	// 				// throw err;
	// 			}
	// 			console.log('文件:'+'./public/wiki/' + search.CID+ '.txt'+'删除成功！');
	// 		})
	// 	})(searchs)

	// }


	// var count = 0;

	// for(num in list){
	// 	(function(index){
	// 		fs.exists('./public/wiki/' + list[index].CID+ '.txt', function(exists) {


	// 		  	if (exists) {
	// 	  			// count ++
	// 		  		// console.log('count: ',count);
	// 		  		// console.log('index: ',index);
	// 		  		if(index != 0)
	// 		  			index--
	// 		  		fs.readFile('./public/wiki/' + list[index].CID+ '.txt', function(err,data){ 
	// 				 	if(err){ 
	// 				  		console.log(err); 
	// 				 	}else{ 
	// 				  		// console.log(data); 

	// 				  		fs.writeFile('./public/wiki2/' + list[index].CID + '.txt','',function(err){  
	// 					        if(err) throw err;  
	// 					        // console.log('write TEXT into TEXT');  
	// 					    });

	// 						fs.appendFile('./public/wiki2/' + list[index].CID + '.txt',data,function(err){  
	// 					        if(err) throw err;  
	// 					        // console.log('write TEXT into TEXT');  
	// 					    });
								      
	// 					    fs.appendFile('./public/wiki2/' + list[index].CID + '.txt','\n',function(err){  
	// 					        if(err) throw err;  
	// 					        console.log(index + ' write TEXT into TEXT ' + list[index].CID);  
	// 					    });
	// 				 	} 
	// 				})

	// 		  	}

	// 	  		// console.log('index: ',index);
	// 		});
	// 	})(num)
		
	// }

	// var index = 0,num = 0,array = [];
	

	// for(searchs of list){
	// 	(function(search){
	// 		fs.exists('./public/wiki/' + search.CID+ '.txt', function(exists) {
	// 			num ++
	// 		  	if (!exists) {
	// 		  		index ++
	// 		  		array.push({'CID': search.CID, 'FULL_NAME': search.FULL_NAME, 'SHORT_NAME': search.SHORT_NAME })
	// 		  	}

	// 	  		console.log('index: ',index,' num:',num);

	// 	  		fs.writeFile('./public/errorWiki.txt',JSON.stringify(array),function(err){  
	// 		        if(err) throw err;  
	// 		    });
	// 		});
	// 	})(searchs)
		
	// }

	// console.log(errorWiki.length)

	list = errorWiki

	wiki(0)


	// for(searchs of list){
	// 	(function(search){
	// 		wiki2(search)

	// 	})(searchs)
	// }


	console.log('end spider');

	res.render('index', { title: 'Express' ,content:'操作成功，请查看文件wiki.txt', action: '/wiki'});

});


function wiki(num){

	(function(index){

		// var gotoUrl = 'https://en.wikipedia.org/wiki/' + list[index].FULL_NAME;	

		// if(!list[index].FULL_NAME)
		// 	gotoUrl = 'https://en.wikipedia.org/wiki/' + list[index].SHORT_NAME;	

		var gotoUrl = 'https://en.wikipedia.org/wiki/' + list[index].SHORT_NAME;	

		if(!list[index].FULL_NAME)
			gotoUrl = 'https://en.wikipedia.org/wiki/' + list[index].FULL_NAME;	

		var options = {
			uri: gotoUrl
		};

		index++ 

		request(options,function(error, response,body){
			// console.log(body)
			if(!error && response.statusCode ==200){
			// if(!error && body){

				// console.log(num);

				$ = cheerio.load(body);

				var div = $('#mw-content-text>p').first().filter(function(i, el){
					$(this).find('sup').remove()

					$(this).find('a').replaceWith(function(){
						
    					return $(this).html();
					});

					return $(this)
				})


				fs.writeFile('./public/wiki/' + list[index-1].CID + '.txt','',function(err){  
			        if(err) throw err;  
			        // console.log('write TEXT into TEXT');  
			    });

				fs.appendFile('./public/wiki/' + list[index-1].CID + '.txt',div,function(err){  
			        if(err) throw err;  
			        // console.log('write TEXT into TEXT');  
			    });
					      
			    fs.appendFile('./public/wiki/' + list[index-1].CID + '.txt','\n',function(err){  
			        if(err) throw err;  
			        console.log(num + ' write TEXT into TEXT ' + list[index].CID);  
			    });

			    wiki(index)

			}else{
				wiki(index)
		  		var json = {'CID': list[index-1].CID, 'FULL_NAME': list[index-1].FULL_NAME, 'SHORT_NAME': list[index-1].SHORT_NAME }


		  		fs.appendFile('./public/errorWiki.txt',JSON.stringify(json) + ',',function(err){  
			        if(err) throw err;  
			    });
				console.log(num + "'错误-链接异常-"+response.statusCode+"-"+error+"- "+list[index-1].CID+" -"+options.uri+"'");
			}

		},function(err, result){
			if(err){
				wiki(index)
				console.log(num + "'错误-链接未发送-"+err+"-"+options.uri+"'");
			}else{
				console.log(num + '获取请求成功');
			}
			
		});

		// rp(gotoUrl)
		// 		.then(function(body){
		// 			$ = cheerio.load(body);

		// 			var div = $('#mw-content-text>p').first().filter(function(i, el){
		// 				$(this).find('sup').remove()

		// 				$(this).find('a').replaceWith(function(){
							
	 //    					return $(this).html();
		// 				});

		// 				return $(this)
		// 			})

		// 			fs.writeFile('./public/wiki/' + list[index].CID + '.txt','',function(err){  
		// 		        if(err) throw err;  
		// 		        // console.log('write TEXT into TEXT');  
		// 		    });

		// 			fs.appendFile('./public/wiki/' + list[index].CID + '.txt',div,function(err){  
		// 		        if(err) throw err;  
		// 		        // console.log('write TEXT into TEXT');  
		// 		    });
						      
		// 		    fs.appendFile('./public/wiki/' + list[index].CID + '.txt','\n',function(err){  
		// 		        if(err) throw err;  
		// 		        console.log(index + ' write TEXT into TEXT' + list[index].CID);  
		// 		    });

		// 		    index++ 

		// 		    wiki(index)

					
		// 		})
		// 		.catch(function(){
		// 			// res.render('index', { title: 'Express' ,content:'读取失败', action: '/wiki'});
		// 		});
	})(num)

	
}

function wiki2(searchs){

	(function(search){

		var gotoUrl = 'https://en.wikipedia.org/wiki/' + search.FULL_NAME;	

		if(!search.FULL_NAME)
			gotoUrl = 'https://en.wikipedia.org/wiki/' + search.SHORT_NAME;	

		var options = {
			uri: gotoUrl,
			method: 'get'
		};

		request(options,function(error, response,body){
			if(!error && response.statusCode ==200){

				$ = cheerio.load(body);

				var div = $('#mw-content-text>p').first().filter(function(i, el){
					$(this).find('sup').remove()

					$(this).find('a').replaceWith(function(){
						
    					return $(this).html();
					});

					return $(this)
				})


				fs.writeFile('./public/wiki/' + search.CID + '.txt','',function(err){  
			        if(err) throw err;  
			        // console.log('write TEXT into TEXT');  
			    });

				fs.appendFile('./public/wiki/' + search.CID + '.txt',div,function(err){  
			        if(err) throw err;  
			        // console.log('write TEXT into TEXT');  
			    });
					      
			    fs.appendFile('./public/wiki/' + search.CID + '.txt','\n',function(err){  
			        if(err) throw err;  
			        console.log(' write TEXT into TEXT ' + search.CID);  
			    });


			}else{
				console.log("错误-链接异常-"+error+"-"+options.uri+"  " + search.CID);
			}

		},function(err, result){
			if(err){
				console.log("错误-链接未发送-"+err+"-"+options.uri+"  " + search.CID);
			}else{
				console.log('获取请求成功');
			}
			
		});

		// rp(gotoUrl)
		// 		.then(function(body){
		// 			$ = cheerio.load(body);

		// 			var div = $('#mw-content-text>p').first().filter(function(i, el){
		// 				$(this).find('sup').remove()

		// 				$(this).find('a').replaceWith(function(){
							
	 //    					return $(this).html();
		// 				});

		// 				return $(this)
		// 			})

		// 			fs.writeFile('./public/wiki/' + search.CID + '.txt','',function(err){  
		// 		        if(err) throw err;  
		// 		        // console.log('write TEXT into TEXT');  
		// 		    });

		// 			fs.appendFile('./public/wiki/' + search.CID + '.txt',div,function(err){  
		// 		        if(err) throw err;  
		// 		        // console.log('write TEXT into TEXT');  
		// 		    });
						      
		// 		    fs.appendFile('./public/wiki/' + search.CID + '.txt','\n',function(err){  
		// 		        if(err) throw err;  
		// 		        console.log(' write TEXT into TEXT' + search.CID);  
		// 		    });


					
		// 		})
		// 		.catch(function(){
		// 			// res.render('index', { title: 'Express' ,content:'读取失败', action: '/wiki'});
		// 		});
	})(searchs)

	
}

function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + milliSeconds);
 };

module.exports = router;
