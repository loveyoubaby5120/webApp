var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

/* GET home page. */

router.get('/servlet/validateCodeServlet', function(req, res, next) {
	// 获取移动端post数据
	var urlSuffix="http://61.161.203.48/yyzc/servlet/validateCodeServlet?"+new Date().getTime();
	// var tokenServer="http://192.169.1.15:8080/HttpClientTest/servlet/GetTokenServlet";
	console.log('start spider');


	// request(urlSuffix).pipe(fs.createWriteStream('../public/yyzc/servlet'));
	

	var opts={
        url:urlSuffix
    }
    console.log(urlSuffix);


    var stream = request(urlSuffix);
    req.pipe(stream);
    stream.pipe(res);
    
    // request.get(opts, function (err, response, body) {
    //     var type = response.headers["content-type"];
    //     // res.writeHead(200,{
    //     // 	'Cache-Control' : response.headers["cache-control"],
    //     // 	'Content-Type' : response.headers["content-type"],
    //     // 	'Date' : response.headers["date"],
    //     // 	'Expires' : response.headers["expires"],
    //     // 	'Pragma' : response.headers["pragma"],
    //     // 	'Server' : response.headers["server"],
    //     // 	'Transfer-Encoding' : response.headers["transfer-encoding"]
    //     // });
    //     res.writeHead(200,{"Content-Type":type});
    //     res.write(body);
    //     res.end();
    // })

	// request(urlSuffix,function(error, response,body){
	// 	if(!error && response.statusCode ==200){

	//         var base64 = new Buffer(body, 'binary').toString('base64');
	//         var data = {
	//         	type   : 'image/jpeg;charset=UTF-8' ,
	//         	base64 : base64 
	//         };
	// 		res.send(base64);
	// 		// var src='/yyzc/'+e;
	// 		// downloadImg(urlSuffix.replace("/yyzc","")+src,src,null);
	// 	}
	// 	else{
	// 		console.log("'错误-获取图片失败-"+error+"-"+urlSuffix+"'");
	// 	}

	// },function(err, result){
	// 	if(err){
	// 		console.log("'错误-请求未发送-"+err+"-"+urlSuffix+"'");
	// 	}else{
	// 		console.log('请求结束');
	// 	}
		
	// });
	console.log('end spider');
});


module.exports = router;
  