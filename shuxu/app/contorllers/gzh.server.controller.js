var mysqldb = require('../../config/mysql');
var wrapper = require('co-mysql');

var connection = mysqldb();
// var pool = mysqldb('pool');

c = wrapper(connection);
// p = wrapper(pool);

module.exports = {
	list: function *(next){
		var sql = 'select * from article_profile limit 2';


		var rows = yield c.query(sql);
		this.body = rows;

		// pool.getConnection(function(err, connection) {
	 //        if (err) throw err;
	 //        connection.query(sql, function(err, rows) {
	 //            if (err) throw  err;
	 //        });
	 //        //回收pool
	 //        connection.release();
	 //    });



		// connection.query(sql, function (error, results, fields) {
		// 	if(error) throw error
		// });
	}
}