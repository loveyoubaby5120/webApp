var express = require('express');
var router = express.Router();

var nodeXlsx = require('node-xlsx');


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

router.get('/', function(req, res, next) {


	console.log('start spider');


	var obj = nodeXlsx.parse("./result.xlsx");
	var noXlsx = {};
	for(var i = 1; i< obj[0].data.length; i++){
		// if(i>2){
		// 	break;
		// }
		var biz = obj[0].data[i][1];
		var receiver = obj[0].data[i][3];
		var growth = obj[0].data[i][4];
		var viscous = Math.exp(obj[0].data[i][5]);

		var sql = `update gzh_profile set viscous=${viscous},growth=${growth},receiver=${receiver} where english_id like '${biz}'`;

		console.log(sql);

		querySql(sql).then(function(data){
		    console.log(i);

		});
	}



	


	console.log('end spider');


});



function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + milliSeconds);
 };

module.exports = router;
  