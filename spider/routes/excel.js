var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var nodeXlsx = require('node-xlsx');
var path = require('path');
var excelPort = require('excel-export');
var parseXlsx = require('excel');
var xlsx = require('xlsx');

var exportExcel=require('./do-ecxel.js');

var requestPomise=require('./request-promise.js');

var TITLE = 'formidable上传示例';
var AVATAR_UPLOAD_FOLDER = '/avatar/';


var mysqldb = require('../config/mysql');
var pool = mysqldb('pool');



//内部对mysql的封装，执行sql语句
function execQuery(sql, callback) {
    var errinfo;

    pool.getConnection(function(err, connection) {
        if (err) {
            errinfo = 'DB-获取数据库连接异常！';
            throw errinfo;
        } else {
            var querys = connection.query(sql, function(err, rows) {
                release(connection);
                if (err) {
                    errinfo = 'DB-SQL语句执行错误:' + err;
                    callback(err);
                } else {
                    callback(null,rows);        //注意：第一个参数必须为null
                }
            });
        }
    });
}

function release(connection) {
    try {
        connection.release(function(error) {
            if (error) {
                console.log('DB-关闭数据库连接异常！');
            }
        });
    } catch (err) {}
}
//对外接口返回Promise函数形式
function querySql(sql){
    return new Promise(function(resolve, reject){
        execQuery(sql, function(err, rows){
            if(err){
                reject(err);
            }else{
                resolve(rows);
            }
        })
    });
}

/* GET home page. */
// router.get('/download', function(req, res) {

// 	exportExcel.exportExcel(req,res);
//   res.render('excel', { title: TITLE ,content:'上传文件'});
// });

router.get('/', function(req, res) {

	var sql = `call gzh_info("*"," and type = 4 and time=maxTime group by id","","rank","")`;

	querySql(sql).then(function(data){
		var conf = {};
		conf.cols = [
			{caption: '微信号', type: 'string', width:80},
			{caption: 'ID', type: 'string', width:80},
			{caption: '影响力', type: 'string', width:80}
		];

		conf.rows = [];

		data[0].forEach(function(item, index){
			var array = [];
			array.push(item.nick_name);
			array.push(item.english_id);
			array.push(item.w_index);

			conf.rows.push(array);
		});

	    
	    var result = excelPort.execute(conf);

	    var random = Math.floor(Math.random()*10000+0);
	    var filename = 'filename';  //只支持字母和数字命名
	    var uploadDir = 'public/upload/';
	    var filePath = uploadDir + filename + random + ".xlsx";

	    fs.writeFile(filePath, result, 'binary',function(err){
	        if(err){
	            console.log(err);
	        }
	    });



	    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
	    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
	    res.end(result, 'binary');

	});


	// var Json = {'biz':[],'url':[]};
	// var parmas = {url: 'caixinwang,rmrbwx',"Json": Json};
	// requestPomise.send({
	// 	url: 'caixinwang,rmrbwx',
	// });

	// var workbook = xlsx.readFile('a.xlsx');

	// // 获取 Excel 中所有表名
	// var sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
	// // 根据表名获取对应某张表
	// var worksheet = workbook.Sheets[sheetNames[0]];

	// console.log(sheetNames);

	// console.log(worksheet);


	// res.render('excel', { title: TITLE ,content:'上传文件'});

	// var xlsxPath = path.resolve(__dirname, './a.xlsx');

	// parseXlsx(xlsxPath, function(err, data) {
	// 	console.log(data);
	// 	if(err) throw err;
	//     // data is an array of arrays
	// });

    // var datas = [['a','b','c','d','e','f','g','h','i'],['a2','b2','c2','d2','e2','f2','g2','h2','i2']];
    // var conf = {};
    // var filename = 'filename';  //只支持字母和数字命名
    
    // conf.cols = [
    //    {caption:'名称', type:'string', width:20},
    //    {caption:'简介', type:'string', width:40},
    //    {caption:'报酬', type:'string', width:20},
    //    {caption:'时间', type:'date', width:40},
    //    {caption:'人员', type:'string', width:30},
    //    {caption:'编号', type:'string', width:30},
    //    {caption:'金额', type:'number', width:30},
    //    {caption:'手机号', type:'string', width:30}
    // ];
	
    // var array = [];
    
    // array[0] = [
    //     datas[0][0],
    //       datas[0][1],
    //       datas[0][2],
    //       datas[0][3],
    //       datas[0][4],
    //       datas[0][5],
    //       datas[0][6],
    //       datas[0][7]
    // ];

    //  array[1] = [
    //     datas[1][0],
    //       datas[1][1],
    //       datas[1][2],
    //       datas[1][3],
    //       datas[1][4],
    //       datas[1][5],
    //       datas[1][6],
    //       datas[1][7]
    // ];


    // conf.rows = array;
    // var result = excelPort.execute(conf);


    // var random = Math.floor(Math.random()*10000+0);

    // var uploadDir = 'public/upload/';
    // var filePath = uploadDir + filename + random + ".xlsx";

    // console.log('uploadDir '+uploadDir);
    // console.log('filePath '+filePath);
    // fs.writeFile(filePath, result, 'binary',function(err){
    //     if(err){
    //         console.log(err);
    //     }
    // });

    // res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    // res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    // res.end(result, 'binary');



	// var xlsxPath = path.resolve(__dirname, '../public/avatar/0.0.5849197695497423.xlsx');
	// console.log(xlsxPath);


	// var obj = nodeXlsx.parse("./a.xlsx");
	// console.log(obj);

	// var obj = nodeXlsx.parse('./a.xlsx');
	// //第一个工作表的数据
	// var data = obj.worksheets[0].data;
	// //列数
	// var maxCol = obj.worksheets[0].maxCol;
	// //行数
	// var maxRow = obj.worksheets[0].maxRow;

	// for(var i=0;i<maxRow;i++) {
	// 	console.log("第"+(i+1)+"行的数据：");
	// 	for(var j=0;j<maxCol;j++) {
	// 		console.log(data[i][j].value);
	// 	}
	// }

	// var obj = {"worksheets":[{"data":[["姓名","性别","年龄"],["李晓龙","男","24"]]}]};
 //    var file = nodeXlsx.build(obj);
 //    fs.writeFileSync('b.xlsx', file, 'binary');

	// var file = nodeXlsx.build(obj);
	// fs.writeFileSync('b.xlsx', file, 'binary');




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



	// res.locals.success = '上传成功';
	// res.render('excel', { title: TITLE ,content:'上传文件'});
});

module.exports = router;