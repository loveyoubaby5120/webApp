var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require("fs");
var async = require('async');
var cheerio = require('cheerio');
var rp = require('request-promise');
var path = require("path");  

let conference = [
    'Annual Conference on Neural Information Processing Systems',
    // 'International Conference on Machine Learning',
    // 'Annual Conference on Computational Learning Theory',
    // 'International Conference on Uncertaintyin Artificial Intelligence',
    // 'International Conference on Learning Representations',
    // 'International Joint Conference on Artificial Intelligence',
    // 'AAAI Conference on Artificial Intelligence',
    // 'International Conference on Artificial Intelligence and Statistics',
    // 'European Conference on Artificial Intelligence',
    // 'International Conference on Principles of Knowledge Representation and Reasoning',
    // 'International Conference on Case- Based Reasoning',
    // 'ACM Knowledge Discovery and Data Mining',
    // 'International Conference on Data Mining',
    // 'IEEE International Conference on Data Engineering',
    // 'International Conference on Research on Development in Information Retrieval',
    // 'ACM International Conference on Web Search and Data Mining',
    // 'SIAM International Conference on Data Mining',
    // 'European Conference on Machine Learning and Principles and Practice of Knowledge Discovery in Databases',
    // 'International World Wide Web Conferences',
    // 'ACM International Conference on Information and Knowledge Management',
    // 'International Conference on Very Large Data Bases',
    // 'IEEE Conference on Computer Vision and Pattern Recognition',
    // 'International Conference on Computer Vision',
    // 'European Conference on Computer Vision',
    // 'ACM International Conference on Multimedia',
    // 'Asian Conference on Computer Vision',
    // 'Annual Meeting of the Association for Computational Linguistics',
    // 'Conference on Empirical Methods on Natural Language Processing',
    // 'International Conference on Computational Linguistics',
    // 'Applied Natural Language Processing Conference (ANLP)',
    // 'European Chapter of ACL (EACL)',
    // 'North American Chapter of ACL (NAACL)',
    // 'IEEE International Conference on Robotics and Automation',
    // 'International Conference on Automated Planning and Scheduling',
    // 'International Joint Conference on Autonomous Agents and Multi- agent Systems',
    // 'International Conference on Intelligent RObots and Systems - IROS',
    // 'Robotics: Science and Systems(http://www.roboticsproceedings.org/)',
];

let journal = [
    'Journal of Machine Learning Research (JMLR)',
    'Pattern Recognition',
    'IEEE Trans on Pattern Analysis and Machine Intelligence',
    'ACM Transactions on Intelligent Systems and Technology (TIST)',
    'Artificial Intelligence',
    'IEEE Transactions on Knowledge and Data Engineering',
    'ACM Transactions on Information Systems',
    'ACM Transactions on Knowledge Discovery from Data',
    'International Journal of Computer Vision',
    'Computer Vision and Image Understanding',
    'IEEE Transactions on Image Processing',
    'IEEE/ ACM Transactions on Audio, Speech, and Language Processing',
    'Transactions of the Association of the Computational Linguistics',
    'Computational Linguistics Journal',
    'ACM Transactions on Speech and Language Processing',
    'IEEE Transactions on Robotics',
    'The International Journal of Robotics Research (IJRR)',
];
/* GET home page. */

router.get('/', function(req, res, next) {
	console.log('start spider');

	for(key in conference){
        let Json = [];
        let size = 1000;
        for (i = 0; i < 2; i++){
            let options = {
                uri: 'http://dblp.uni-trier.de/search/publ/inc',
                qs: {
                    q: conference[key],
                    h: size,
                    f: i * size,
                },
            };
    
            Json.push(options);
        }

		httpRequest(Json,0,50,res);
	}
	console.log('end spider');
});


function httpRequest(Json, str, end, res) {
    var arr = Json.slice(str, end);
    async.forEachLimit(arr, 50, function (item, callback) {
        console.log(item)
        requestHtml(item, function (error, response, body) {
            console.log(body)
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
                // console.log("statusCode",response.statusCode)
			}

			if(arr[arr.length-1]==item && end <= Json.length){
				console.log(end);
				httpRequest(Json,end,(end+50),res);
			}
			if(Json[Json.length-1]==item){
				console.log('结束');
			}

        });
	});
}

function downloadXML(id, filename) {
    let ids = id.split('/');
    ids = ids.slice(0, ids.length-1);
    let urlSuffix = `http://dblp.uni-trier.de/rec/xml/${id}.xml`;
    let filenamePath = `./public/upload/${filename}/${ids.join('/')}`;
    // console.log(urlSuffix)
    requestHtml({ uri: urlSuffix }, function (error, response, body) {
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
            // console.log("statusCode",response.statusCode)
        }

    });
};

function requestHtml(option, callback) { 
    request(option, callback, function(err, result){
        if(err){
            console.log('获取链接失败');
        }else{
            console.log('获取链接结束');
        }
    });
}

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

function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + milliSeconds);
 };

module.exports = router;
  
