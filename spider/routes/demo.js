var express = require('express');
var router = express.Router();
var request = require('request');
var request = request.defaults({jar: true});
var async = require('async');
var cheerio = require('cheerio');
var fs = require('fs');
var path="c:/nodeError.log";
var yyzc = require('../routes/yyzc');
console.log("----------------");

/* GET home page. */
router.get(/yyzc(\/.*)*$/, function(req, res, next) {

	// 获取移动端post数据
	var e = req.url;
	//console.log(e);
	var urlSuffix="http://61.161.203.48";
	// var tokenServer="http://localhost:8080/HttpClientTest/servlet/GetTokenServlet";
	var tokenServer="http://www.baidu.com";
	console.log('start spider');
	request(tokenServer,function(error, response,body){
		if(!error && response.statusCode ==200){
			var options = {
			    uri: urlSuffix+e,
			    method: 'get',
			    headers: {
			    	'Cookie': 'session.id=aaaaaa'
			    },
			    json: true
			};
			
			request(options,function(_error, _response,_body){
				//console.log(options.uri);
				if(!_error && _response.statusCode ==200){
					var option = {};
					// res.send(_response.request.uri.pathname.split(';')[1]);
					// res.send(_response);
					res.append('Set-Cookie','session.id=aaaaaa');
					res.send(_body);
					// $ = cheerio.load(_body);
					//if($){
						//var src=$(".mid.validateCode").attr("src")
						//console.log(src);
						//downloadImg(urlSuffix.replace("/yyzc","")+src,src,null);
					//}else{
						//var src="/yyzc"+e;
						//downloadImg(urlSuffix.replace("/yyzc","")+src,src,null);
					//}

				}else{
					console.log("'错误-链接异常-"+_error+"-"+options.uri+"'");
				}

			},function(err, result){
				if(err){
					console.log("'错误-链接未发送-"+err+"-"+options.uri+"'");
				}else{
					console.log('获取请求成功');
				}
				
			});

		}
		else{
			console.log("'错误-获取token失败-"+error+"-"+tokenServer+"'");
		}

	},function(err, result){
		if(err){
			console.log("'错误-请求未发送-"+err+"-"+tokenServer+"'");
		}else{
			console.log('请求结束');
		}
		
	});
	console.log('end spider');
});

//post
router.post(/yyzc(\/.*)*$/, function(req, res, next) {

	// 获取移动端post数据
	var e = req.url;
	var v_body=req.body;
	var urlSuffix="http://61.161.203.48";
	// var tokenServer="http://localhost:8080/HttpClientTest/servlet/GetTokenServlet";
	var tokenServer="http://www.baidu.com";
	console.log('start spider');
	request(tokenServer,function(error, response,body){
		if(!error && response.statusCode ==200){
			var options = {
			    uri: urlSuffix+e,
			    method: 'post',
			    form: v_body,
			    headers: {
			    	// 'Cookie': 'session.id=aaaaaa'
			    },
			    json: true
			};
			
			console.log(v_body);

			request(options,function(_error, _response,_body){
				//console.log(options.uri);
				//console.log(_response.statusCode);
				if(!_error && _response.statusCode ==200){
					//console.log("---- COOKIE---- : "+_response.headers['set-cookie']);
					// res.send(_response);
					// res.append('Set-Cookie','session.id=aaaaaa');
					res.send(_body);
					//$ = cheerio.load(_body);
					//if($){
						//var src=$(".mid.validateCode").attr("src")
						//console.log(src);
						//downloadImg(urlSuffix.replace("/yyzc","")+src,src,null);
					//}else{
						//var src="/yyzc"+e;
						//downloadImg(urlSuffix.replace("/yyzc","")+src,src,null);
					//}

				}else{
					console.log("'错误-链接异常-"+_error+"-"+options.uri+"'");
				}

			},function(err, result){
				if(err){
					console.log("'错误-链接未发送-"+err+"-"+options.uri+"'");
				}else{
					console.log('获取请求成功');
				}
				
			});

		}
		else{
			console.log("'错误-获取token失败-"+error+"-"+tokenServer+"'");
		}

	},function(err, result){
		if(err){
			console.log("'错误-请求未发送-"+err+"-"+tokenServer+"'");
		}else{
			console.log('请求结束');
		}
		
	});
	console.log('end spider');
});

function writeError(error){
	// fs.appendFile(path,error,function(err){  
	// 	if(err) throw err;  
	// 	// console.log('write TEXT into TEXT');
	// });
						      
	// fs.appendFile(path,'\n',function(err){  
	// 	 if(err) throw err;  
	// 	// console.log('write TEXT into TEXT');
	// });
}

function downloadImg(_url, filename, callback){
	request.head(_url, function(err, res, body){
		//console.log('content-type:', res.headers['content-type']);  //这里返回图片的类型
		//console.log('content-length:', res.headers['content-length']);  //图片大小
		if(err){
			console.log('err: ' + err);
			return false;
		}
		//console.log('res: '+ res);
		//调用request的管道来下载到 images文件夹下
		request(_url)
			.pipe(fs.createWriteStream('./public' + filename));  
	});
};

module.exports = router;
  