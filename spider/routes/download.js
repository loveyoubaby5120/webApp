var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require("fs");
var async = require('async');
var cheerio = require('cheerio');
var rp = require('request-promise');
var path = require("path");  

var keys = [
    'Annual Conference on Neural Information Processing Systems'
];
/* GET home page. */

router.get('/', function(req, res, next) {
	console.log('start spider');

	for(key in keys){

		var Json = [];
        var options = {
            uri: 'http://dblp.uni-trier.de/search/publ/inc',
            qs: {
                q: keys[key],
                h: 30,
                f: 0,
            },
        };

        Json.push(options);
		httpRequest(Json,0,50,res);
	}
	console.log('end spider');
});


function httpRequest(Json, str, end, res) {
	var arr = Json.slice(str,end);
    async.forEachLimit(arr, 50, function (item, callback) {
        request(item, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (body) {
                    $ = cheerio.load(body);
                    if ($) {
                        var lis = $(".entry.editor")
                        for (ele in lis) {
                            const id = lis.eq(ele).attr("id");
                            if (id){ 
                                downloadXML(id,item.qs.q);
                            }
                        }
					}
                    
				}
			}
			else{
                console.log("error", error);
                console.log("statusCode",response.statusCode)
			}

			if(arr[arr.length-1]==item && end <= Json.length){
				console.log(end);
				httpRequest(Json,end,(end+50),res);
			}
			if(Json[Json.length-1]==item){
				console.log('结束');
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

function downloadXML(id, filename) {
    let ids = id.split('/');
    ids = ids.slice(0, ids.length-1);
    let urlSuffix = `http://dblp.uni-trier.de/rec/xml/${id}.xml`;
    let filenamePath = `./public/upload/${filename}/${ids.join('/')}`;
    console.log(urlSuffix)
    request({uri: urlSuffix}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if (body) {
                console.log(urlSuffix + " success")
                mkdirs(filenamePath, function () {
                    fs.writeFile(`./public/upload/${filename}/${id}.xml`, body, function (err) {
                        if (err) throw err
                        console.log("File Saved !")
                    })
                });
            }
        }
        else{
            console.log("error", error);
            console.log("statusCode",response.statusCode)
        }

    },function(err, result){
        if(err){
            console.log('获取链接失败');
        }else{
            console.log('获取链接结束');
        }
    });
};

//递归创建目录 异步方法  
function mkdirs(dirname, callback) {  
    fs.exists(dirname, function (exists) {  
        if (exists) {  
            callback();  
        } else {  
            mkdirs(path.dirname(dirname), function () {  
                fs.mkdir(dirname, callback);  
            });  
        }  
    });  
} 

//递归创建目录 同步方法  
function mkdirsSync(dirname) {  
    if (fs.existsSync(dirname)) {  
        return true;  
    } else {  
        if (mkdirsSync(path.dirname(dirname))) {  
            fs.mkdirSync(dirname);  
            return true;  
        }  
    }  
}  


module.exports = router;
  
