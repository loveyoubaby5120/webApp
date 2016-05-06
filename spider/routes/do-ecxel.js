var excel=require('./excel-demo.js');

exports.exportExcel=function(req,res){
	var conf ={};
	conf.cols = [
		{caption:'string', type:'string'},
		{caption:'date', type:'string'},
		{caption:'bool', type:'bool'},
		{caption:'number', type:'number'}
	];
	conf.rows = [
		['pi', '2015-06-29', true, 3.14],
		["e", '2015-06-29', false, 2.7182]
	];
	var filename ="导出excel.xlsx";
	res.setHeader('Content-Disposition', 'attachment; filename='+encodeURIComponent(filename));
	excel.createExcel({
		data:conf,
		savePath:"uploadFile/excel/",
		cb:function(path){
			excel.download(path,req, res,true);
		}
	});
}