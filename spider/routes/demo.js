var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');
var cheerio = require('cheerio');
//var rp = require('request-promise'); 
var fs = require('fs');
var path="c:/nodeError.log";
console.log("----------------");

/* GET home page. */

router.get('/', function(req, res, next) {

	// 获取移动端post数据
	var e = req.query.param;
	var urlSuffix="http://61.161.203.48/yyzc/";
	// var tokenServer="http://192.169.1.15:8080/HttpClientTest/servlet/GetTokenServlet";
	var tokenServer="http://www.baidu.com";
	console.log('start spider');
	request(tokenServer,function(error, response,body){
		if(!error && response.statusCode ==200){
			var options = {
			    uri: urlSuffix+e,
			    method: 'post',
			    form: {
			    	'username': '11',
			    	'password': '22'
			    },
			    headers: {
			    	'Cookie': 'body'
			    },
			    json: true
			};

			request(options,function(_error, _response,_body){
				if(!_error && _response.statusCode ==200){
					var option = {};
					res.send(_body);
					$ = cheerio.load(_body);
					// var src=$(".mid.validateCode").attr("src");
					// downloadImg(urlSuffix.replace("/yyzc","")+src,src,null);

				}else{
					console.log("'错误-链接异常-"+_error+"-"+options.uri+"'");
					writeError("'错误-链接异常-"+_error+"-"+options.uri+"'");
				}

			},function(err, result){
				if(err){
					writeError("'错误-链接未发送-"+err+"-"+options.uri+"'");
					console.log("'错误-链接未发送-"+err+"-"+options.uri+"'");
				}else{
					console.log('获取请求成功');
				}
				
			});

		}
		else{
			writeError("'错误-获取token失败-"+error+"-"+tokenServer+"'");
			console.log("'错误-获取token失败-"+error+"-"+tokenServer+"'");
		}

	},function(err, result){
		if(err){
			writeError("'错误-请求未发送-"+err+"-"+tokenServer+"'");
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

function downloadImg(url, filename, callback){
	console.log(url);
	console.log(filename);
	request.head(url, function(err, res, body){
		//console.log('content-type:', res.headers['content-type']);  //这里返回图片的类型
		//console.log('content-length:', res.headers['content-length']);  //图片大小
		if(err){
			console.log('err: ' + err);
			return false;
		}
		//console.log('res: '+ res);
		//调用request的管道来下载到 images文件夹下
		request(url)
			.pipe(fs.createWriteStream('../public' + filename));
	});
};

module.exports = router;
  