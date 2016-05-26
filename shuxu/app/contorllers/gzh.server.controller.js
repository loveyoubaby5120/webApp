var mysqldb = require('../../config/mysql');
var wrapper = require('co-mysql');

var connection = mysqldb();
// var pool = mysqldb('pool');

c = wrapper(connection);
// p = wrapper(pool);

// Date.prototype.format = function (format) {
//     var date = {
//         "M+": this.getMonth() + 1,
//         "d+": this.getDate(),
//         "h+": this.getHours(),
//         "m+": this.getMinutes(),
//         "s+": this.getSeconds(),
//         "q+": Math.floor((this.getMonth() + 3) / 3),
//         "S+": this.getMilliseconds()
//     };
//     if (/(y+)/i.test(format)) {
//         format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
//     }
//     for (var k in date) {
//         if (new RegExp("(" + k + ")").test(format)) {
//             format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
//         }
//     }
//     return format;
// };

// Date.prototype.timestamp = function(v){
//     if (/^(-)?\d{1,10}$/.test(v)) {
//         v = v * 1000;
//     } else if (/^(-)?\d{1,13}$/.test(v)) {
//         v = v * 1;
//     } else {
//         console.log("时间戳格式不正确");
//         return;
//     }
//     var dateObj = new Date(v);
//     if (dateObj.format('yyyy') == "NaN") { /*alert("时间戳格式不正确");*/return; }
//     return dateObj;
// }



// console.log(new Date().timestamp(1464061279).format('yyyy-MM-dd/q'));

module.exports = {
	map: function *(next){
		var sql = 'select (select from_unixtime(max(pub_time),"%m月%d日 %H整") from article_profile) as time,(select count(*) from gzh_profile) as gzhCount,(select count(*) from article_profile) as artCount,(select sum(read_num) from read_num) as readSum';
		var rows = yield c.query(sql);
		this.body = rows;
	},
	gzh_type_List: function *(next){
		var sql = 'select * from gzh_type';
		var rows = yield c.query(sql);
		this.body = rows;
	},
	gzh_profile_list: function *(next){
		var sql = 'select * from gzh_profile where type='+this.query.gzh_id;
		if(this.query.limitNum && isNaN(this.query.limitNum)){

		}
		else{
			sql += ' limit '+this.query.limitNum;
		}
		
		var rows = yield c.query(sql);
		this.body = rows;
	},
	article_profile_list: function *(next){
		var sql = 'select *,from_unixtime(pub_time,"%Y-%m-%d") as dateTime from article_profile limit 10';


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
	},
	map_info: function *(next){
		var sql = 'select * from info where id='+this.query.gzh_id;
		var rows = yield c.query(sql);
		this.body = rows;
	},
	article_profile_info: function *(next){
		var sql = 'select * from (select DISTINCT *,from_unixtime(pub_time,"%Y-%m-%d %h:%i") as dateTime from article_profile c,\
					(select * from read_num as a,(select max(time) as RMaxtime from read_num group by article_id) as b where a.time=b.RMaxtime) d,\
					(select time as zan_time,article_id as art_id,ZMaxtime,zan_num from zan_num as a,(select max(time) as ZMaxtime from zan_num group by article_id) as b where a.time=b.ZMaxtime) e \
					where c.id=d.article_id and c.id=e.art_id) as f';

		sql += ' where 1=1';
		sql += ' and gzh_id='+this.query.gzh_id;
		if(this.query.type==1){
			sql += ' and date_sub(curdate(), INTERVAL 7 DAY) <= date(f.dateTime) order by f.pub_time desc';
		}
		else{
			sql += ' order by f.pub_time desc limit 10';
		}


		var rows = yield c.query(sql);
		this.body = rows;

	}

}