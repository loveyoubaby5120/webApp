var mysqldb = require('../../config/mysql');
var wrapper = require('co-mysql');

// var connection = mysqldb();
var pool = mysqldb('pool');

// c = wrapper(connection);
// p = wrapper(pool);

Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};

Date.prototype.timestamp = function(v){
    if (/^(-)?\d{1,10}$/.test(v)) {
        v = v * 1000;
    } else if (/^(-)?\d{1,13}$/.test(v)) {
        v = v * 1;
    } else {
        console.log("时间戳格式不正确");
        return;
    }
    var dateObj = new Date(v);
    if (dateObj.format('yyyy') == "NaN") { /*alert("时间戳格式不正确");*/return; }
    return dateObj;
}




function GetDateDiff(startTime, endTime, diffType) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");

    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    var sTime = new Date(startTime);      //开始时间
    var eTime = new Date(endTime);  //结束时间
    //作为除数的数字
    var divNum = 1;
    switch (diffType) {
        case "second":
            divNum = 1000;
            break;
        case "minute":
            divNum = 1000 * 60;
            break;
        case "hour":
            divNum = 1000 * 3600;
            break;
        case "day":
            divNum = 1000 * 3600 * 24;
            break;
        default:
            break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
}



// console.log(new Date().timestamp(1464061279).format('yyyy-MM-dd/q'));

function querySql2(sql){
		// connection = mysqldb();
		// c = wrapper(connection);
		// var rows = c.query(sql);
		// connection.end();
		var rows = [];

		var connection = mysqldb();
		connection.query(sql, function (error, results, fields) {
			if(error) throw error;
			rows = results;
			console.log('The solution is: ', rows[0]);
		});

		connection.end();
		return rows;
}




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

module.exports = {
	map: function *(next){
		var sql = 'select (select from_unixtime(max(pub_time),"%m月%d日 %H时整") from article_profile) as time,(select count(*) from gzh_profile) as gzhCount,(select count(*) from article_profile) as artCount,(select sum(read_num) from article_profile) as readSum';

		var rows = yield querySql(sql);

		this.body = rows;
	},
	gzh_type_List: function *(next){
		var sql = 'select * from gzh_type';

		var rows = yield querySql(sql);

		this.body = rows;
	},
	gzh_profile_list: function *(next){
		var sql = ``;
		if(this.query.limitNum && isNaN(this.query.limitNum)){
			sql = `call doSql("*"," and type = ${this.query.type}","","w_index","desc","gzh_profile")`;
		}
		else{
			sql = `call doSql("*"," and type = ${this.query.type}","${this.query.limitNum}","w_index","desc","gzh_profile")`;
		}

		var rows = yield querySql(sql);

		this.body = rows[0];
	},
	article_profile_list: function *(next){
		var limit = '10';
		var where = ` and date_sub(curdate(), INTERVAL 7 DAY) <= date(from_unixtime(pub_time,'%Y-%m-%d %h:%i'))`;

		var sql = `call doSql("*,from_unixtime(pub_time,'%Y-%m-%d %h:%i') as dateTime","${where}","${limit}","pub_time","desc","article_profile")`;

		var rows = yield querySql(sql);
		this.body = rows[0];

		
	},
	topic_hot: function *(next){
		var array = [];
		var zd = ``;
		var tj = ``;

		var ztj = tj + ` and type=${this.query.gzh_type}`;
		var sql = `call doSql("${zd}","${tj}","","type","desc",'(select 1 as type)')`;
		var rows = yield querySql(sql);
		this.body = rows;
	},
	map_info: function *(next){
		var sql = 'select * from info where id='+this.query.gzh_id;
		var rows = yield querySql(sql);
		this.body = rows;
	},
	ranking_info: function *(next){
		var array = [];
		var dateArray = [];
		var map = {};
		var zd = `*,from_unixtime(time,'%Y-%m-%d %h:%i') dataTime`;
		var tj = ` and gzh_id=${this.query.gzh_id}`;

		var daysNum = this.query.days;


		var ztj = tj +` and date_sub(curdate(), INTERVAL ${daysNum} DAY) <= date(from_unixtime(time,'%Y-%m-%d %h:%i')) and date_sub(curdate(), INTERVAL 1 DAY) >= date(from_unixtime(time,'%Y-%m-%d %h:%i')) group by year(from_unixtime(time,'%Y-%m-%d %h:%i')),month(from_unixtime(time,'%Y-%m-%d %h:%i')),day(from_unixtime(time,'%Y-%m-%d %h:%i'))`;
		var sql = `call doSql("${zd}","${ztj}","","time","desc","gzh_influence_rank")`;
		var rows = yield querySql(sql);
		for(var i =rows[0].length-1; i>=0;i--){
			dateArray.push(rows[0][i].dateTime);
			array.push(rows[0][i].w_index);
			
		}

		sql = `call doSql(""," and id=${this.query.gzh_id}","","time","desc","gzh_profile")`;
		rows = yield querySql(sql);

		this.body = [array,dateArray,rows[0][0]];
	},
	chart_days_info: function *(next){
		var array = [];
		var dateArray = [];
		var zd = ``;
		var tj = ``;
		var index = '';
		if(this.query.type==1){
			zd = `case when sum(read_num) then sum(read_num) else 0 end as sum`;
			tj = ` and gzh_id=${this.query.gzh_id}`;
			index = `sum`;
		}

		if(this.query.type==2){
			zd = `case when max(read_num) then max(read_num) else 0 end as sum`;
			tj = ` and url like '%idx=1%' and gzh_id=${this.query.gzh_id}`;
			index = `sum`;
		}

		if(this.query.type==3){
			zd = `case when sum(read_num) then sum(read_num) else 0 end as sum,count(*) as count`;
			tj = ` and gzh_id=${this.query.gzh_id}`;
			index = `avg`;
		}


		if(this.query.type==4){
			zd = `count(id) as count`;
			tj = ` and gzh_id=${this.query.gzh_id}`;
			index = `count`;
		}

		if(this.query.type==5){
			zd = `1`;
			tj = ``;
			index = `other`;
		}

		if(this.query.type==6){
			zd = `1`;
			tj = ``;
			index = `other`;
		}

		if(this.query.type==7){
			zd = `case when sum(zan_num) then sum(zan_num) else 0 end as sum,count(*) as count`;
			tj = `and gzh_id=${this.query.gzh_id}`;
			index = `sum`;
		}

		var ztj = ``;
		var zzd = ``;
		var daysNum = parseInt(this.query.days)+1;


		var daysNum = parseInt(this.query.days);
		ztj = tj +` and date_sub(curdate(), INTERVAL ${daysNum} DAY) <= date(from_unixtime(pub_time,'%Y-%m-%d %h:%i')) and date_sub(curdate(), INTERVAL 1 DAY) >= date(from_unixtime(pub_time,'%Y-%m-%d %h:%i')) group by year(from_unixtime(pub_time,'%Y-%m-%d %h:%i')),month(from_unixtime(pub_time,'%Y-%m-%d %h:%i')),day(from_unixtime(pub_time,'%Y-%m-%d %h:%i'))`;

		zzd = zd +`,from_unixtime(pub_time,'%Y-%m-%d') as date`;

		var sql = ``;
		sql = `call doSql("${zzd}","${ztj}","","pub_time","desc","article_profile")`;

		if(this.query.type==1 || this.query.type==3 || this.query.type==7){
			ztj = ` and date_sub(curdate(), INTERVAL ${daysNum} DAY) <= date(from_unixtime(pub_time,'%Y-%m-%d %h:%i')) and date_sub(curdate(), INTERVAL 1 DAY) >= date(from_unixtime(pub_time,'%Y-%m-%d %h:%i')) group by year(from_unixtime(pub_time,'%Y-%m-%d %h:%i')),month(from_unixtime(pub_time,'%Y-%m-%d %h:%i')),day(from_unixtime(pub_time,'%Y-%m-%d %h:%i'))`;
			sql = `call doSql("${zzd}","${ztj}","","pub_time","desc","(select * from article_profile where gzh_id=${this.query.gzh_id} group by year(from_unixtime(pub_time,'%Y-%m-%d %h:%i')),month(from_unixtime(pub_time,'%Y-%m-%d %h:%i')),day(from_unixtime(pub_time,'%Y-%m-%d %h:%i')),id order by pub_time,id)")`;
		}


		if(this.query.type==4){
			ztj = tj +` and date_sub(curdate(), INTERVAL ${daysNum} DAY) <= date(from_unixtime(pub_time,'%Y-%m-%d')) and date_sub(curdate(), INTERVAL 1 DAY) >= date(from_unixtime(pub_time,'%Y-%m-%d')) group by year(from_unixtime(pub_time,'%Y-%m-%d')),month(from_unixtime(pub_time,'%Y-%m-%d')),day(from_unixtime(pub_time,'%Y-%m-%d'))`;
			zzd = zd +`,from_unixtime(pub_time,'%Y-%m-%d') as date`;
			sql = `call doSql("${zzd}","${ztj}","","pub_time","desc","article_profile")`;
		}


		var rows = yield querySql(sql);
		var countDay=0,sumDay=0;
		for(var i =rows[0].length-1; i>=0;i--){
			dateArray.push(rows[0][i].date);

			if(rows[0][i].sum){
				sumDay = rows[0][i].sum;
			}
			if(rows[0][i].count){
				countDay = rows[0][i].count;
			}
			if(index=='sum'){
					array.push(sumDay);
			}
			else if(index=='count'){
				array.push(countDay);
			}
			else if(index=='avg'){
				array.push(sumDay ? Math.floor(sumDay/countDay) : '0');
			}
			else if(index=='other'){
				array.push(0);
			}
			
		}
		if(array.length==0){
			array.push(0);
			dateArray.push(new Date().toISOString().slice(0,10));
		}

		var days = GetDateDiff(dateArray[0],dateArray[dateArray.length-1],'day')+1;
		if(days>dateArray.length){
			var dateA = [];
			var arrayA = [];
			for(var i = 0; i<dateArray.length; i++){
				if(i==dateArray.length-1){
					dateA.push(dateArray[i]);
					arrayA.push(array[i]);
					continue;
				}

				dateA.push(dateArray[i]);
				arrayA.push(array[i]);

				var n = GetDateDiff(dateArray[i],dateArray[(i+1)],'day');
				
				if(n>1){
					for(var j = 0;j<n-1;j++){
						var d = new Date(new Date(dateA[dateA.length-1]).getTime()+1000*60*60*24).toISOString().slice(0,10);
						dateA.push(d);
						arrayA.push(0);
					}
				}
			}
			dateArray = dateA;
			array = arrayA;
		}


		var strDate = GetDateDiff(dateArray[dateArray.length-1],new Date().toISOString().slice(0,10),'day')-1;
		var lastDate = GetDateDiff(new Date(new Date().getTime()-1000*60*60*24*this.query.days).toISOString().slice(0,10),new Date(dateArray[0]).toISOString().slice(0,10),'day');
		if(this.query.days>dateArray.length){

			if(strDate>0){
				for(var i = 0; i<strDate; i++){
					var d = new Date(new Date(dateArray[dateArray.length-1]).getTime()+1000*60*60*24).toISOString().slice(0,10);
					dateArray.push(d);
					array.push(0);
				}
			}
			if(lastDate>0){
				for(var i = 0; i<lastDate; i++){
					var d = new Date(new Date(dateArray[0]).getTime()-1000*60*60*24).toISOString().slice(0,10);
					dateArray.unshift(d);
					array.unshift(0);
				}
			}
		}


		var dateA = [];
		var arrayA = [];
		var dNum = array.length;
		if(array.length==daysNum){
			dNum = this.query.days;
		}
		for(var i =0; i<dNum;i++){
			if(dNum==this.query.days){
				dateA.push(dateArray[i+1]);
				arrayA.push((array[i+1]-array[i]));
				continue;
			}
			if(i==0){
				dateA.push(dateArray[i]);
				arrayA.push((array[i]));
				continue;
			}
			dateA.push(dateArray[i]);
			arrayA.push((array[i]-array[i-1]));
			
			
		}


		// this.body = [arrayA,dateA];
		this.body = [array,dateArray];
	},
	statistics_info: function *(next){

		var query = ' and date_sub(curdate(), INTERVAL '+this.query.day+' DAY) <= date(from_unixtime(pub_time,"%Y-%m-%d")) and date_sub(curdate(), INTERVAL 1 DAY) >= date(from_unixtime(pub_time,"%Y-%m-%d"))';
		var sql = 'select count(*) cs from (select pub_time from article_profile where gzh_id='+this.query.gzh_id+query+' group by pub_time) a';
		var rows = yield querySql(sql);


		var sql2 = 'select count(*) ps from article_profile where gzh_id='+this.query.gzh_id+query;
		var rows2 = yield querySql(sql2);


		sql3 = `call doSql('count(*) as sw',' and gzh_id=`+this.query.gzh_id+` and read_num>=100000${query}','','pub_time','desc','article_profile')`;
		var rows3 = yield querySql(sql3);


		sql4 = `call doSql('count(*) count,case when Max(read_num) then Max(read_num) else 0 end as maxRead,case when sum(read_num) then sum(read_num) else 0 end as sumRead,case when sum(zan_num) then sum(zan_num) else 0 end as sumZan',' and gzh_id=`+this.query.gzh_id+`${query}','','pub_time','desc','article_profile')`;
		var rows4 = yield querySql(sql4);

		sql5 = `call doSql('count(*) ttCount,case when sum(read_num) then sum(read_num) else 0 end as ttSumRead',' and gzh_id=`+this.query.gzh_id+` and url like "%idx=1%"${query}','','pub_time','desc','article_profile')`;
		var rows5 = yield querySql(sql5);


		var json = {};

		json.cs = rows[0].cs;
		json.ps = rows2[0].ps;
		json.sw = rows3[0][0].sw;
		json.count = rows4[0][0].count;
		if(rows4[0][0].maxRead=='100001')
			json.maxRead = "10w+";
		else
			json.maxRead = rows4[0][0].maxRead;
		json.sumRead = rows4[0][0].sumRead;
		json.sumZan = rows4[0][0].sumZan;
		json.ttCount = rows5[0][0].ttCount;
		json.ttSumRead = rows5[0][0].ttSumRead;

		this.body = json;
	},
	article_profile_info: function *(next){
		
		var where = ` and gzh_id=${this.query.gzh_id}`;
		var limit = ``;
		if(this.query.type==1){
			where += ` and date_sub(curdate(), INTERVAL 7 DAY) <= date(from_unixtime(pub_time,'%Y-%m-%d %h:%i'))`;
		}
		else{
			limit = `10`;
		}

		var sql = `call doSql("*,from_unixtime(pub_time,'%Y-%m-%d %h:%i') as dateTime","${where}","${limit}","pub_time","desc","article_profile")`;

		var rows = yield querySql(sql);
		this.body = rows[0];

	}

}