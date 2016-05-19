var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');

var fs = require('fs');


router.get('/', function(req, res, next) {
	console.log('start spider');
	var filesList = [];
	readFile('./public/content',filesList);
	fs.writeFile(`./public/url.txt`,JSON.stringify(filesList),function(err){  
        if(err) throw err;  
        // console.log('write TEXT into TEXT');  
    });

	for(files of filesList){

		var data = fs.readFileSync(files.read,'utf-8');

		 $ = cheerio.load(data);
        var title = $('#activity-name').text();
        var time = $('#post-date').text();
        var author = $('#post-user').text();
        var Json = {'title': title.trim(), 'time': time, 'author': author};

		fs.writeFileSync(files.write, JSON.stringify(Json));

	}




	console.log('end spider');

	res.end();

});

function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + milliSeconds);
 };


 //遍历读取文件
function readFile(path,filesList)
{
	files = fs.readdirSync(path);//需要用到同步读取
	files.forEach(walk);
	function walk(file)
	{ 
		states = fs.statSync(path+'/'+file);   
		if(states.isDirectory())
		{
			readFile(path+'/'+file,filesList);
		}
		else
		{ 
			//创建一个对象保存信息
			var obj = new Object();
			obj.size = states.size;//文件大小，以字节为单位
			obj.name = file;//文件名
			obj.path = path+'/'+file; //文件绝对路径

			obj.read = "./public/content/"+ file;
			obj.write = "./public/upload/"+ file;

			filesList.push(obj);
		}  
	}
}

module.exports = router;
