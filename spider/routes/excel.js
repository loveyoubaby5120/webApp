var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var xlsx = require('node-xlsx');
var path = require('path');
var SpreadsheetReader = require('pyspreadsheet').SpreadsheetReader;

var TITLE = 'formidable上传示例';
var AVATAR_UPLOAD_FOLDER = '/avatar/';

/* GET home page. */
router.get('/', function(req, res) {
  res.render('excel', { title: TITLE ,content:'上传文件'});
});

router.post('/', function(req, res) {


	// SpreadsheetReader.read('a.xlsx', function (err, workbook) {
	// 	// Iterate on sheets
	// 	workbook.sheets.forEach(function (sheet) {
	// 		console.log('sheet: %s', sheet.name);
	// 			// Iterate on rows
	// 		sheet.rows.forEach(function (row) {
	// 			// Iterate on cells
	// 			row.forEach(function (cell) {
	// 				console.log('%s: %s', cell.address, cell.value);
	// 			});
	// 		});
	// 	});
	// });

	// var xlsxPath = path.resolve(__dirname, '../public/avatar/0.0.5849197695497423.xlsx');
	// console.log(xlsxPath);

	// var obj = xlsx.parse('a.xlsx');
	// console.log(JSON.stringify(obj));

	// var file = xlsx.build(obj);
	// fs.writeFileSync('b.xlsx', file, 'binary');

	console.log('end');

	// var form = new formidable.IncomingForm();   //创建上传表单
	// form.encoding = 'utf-8';		//设置编辑
	// form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;	 //设置上传目录
	// form.keepExtensions = true;	 //保留后缀
	// form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

	// form.parse(req, function(err, fields, files) {

	// 	if (err) {
	// 		res.locals.error = err;
	// 		res.render('index', { title: TITLE });
	// 		return;		
	// 	}  
		 
	// 	var extName = '';  //后缀名
	// 	switch (files.fulAvatar.type) {
	// 		case 'image/pjpeg':
	// 			extName = 'jpg';
	// 			break;
	// 		case 'image/jpeg':
	// 			extName = 'jpg';
	// 			break;		 
	// 		case 'image/png':
	// 			extName = 'png';
	// 			break;
	// 		case 'image/x-png':
	// 			extName = 'png';
	// 			break;
	// 		default:
	// 			extName = 'xlsx';
	// 			break;		
	// 	}

	// 	// if(extName.length == 0){
	// 	//     res.locals.error = '后缀名有误';
	// 	//     res.render('excel', { title: TITLE ,content:'上传文件'});
	// 	//     return;				   
	// 	// }

	// 	var avatarName = Math.random() + '.' + extName;
	// 	var newPath = form.uploadDir + avatarName;

	// 	console.log(newPath);
	// 	fs.renameSync(files.fulAvatar.path, newPath);  //重命名
	// });



	res.locals.success = '上传成功';
	res.render('excel', { title: TITLE ,content:'上传文件'});
});

module.exports = router;