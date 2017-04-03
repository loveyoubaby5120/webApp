var pool = require('../../config/pool.js');
var connection = require('../../config/connection.js');
var authChecked = require('../authChecked/authChecked');
var moment = require('moment');

module.exports = {
  //显示类型
  show_type: function (req, res, next) {


    var sql = `select *,ceil ((right_num-left_num-1)/2) as children from type where id != 1 order by left_num`;

    pool(sql).then(function(data) {

        authChecked.send(res, req, 200, {err: 0, data: data});

    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  show_type_id: function (req, res, next) {

    var sql = `select *,ceil ((right_num-left_num-1)/2) as children from type where id = ${req.params.nid} order by left_num`;

    pool(sql).then(function(data) {

        authChecked.send(res, req, 200, {err: 0, data: data});

    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  //显示广告
  show_ab: function (req, res, next) {
    var query = req.query.filters ? req.query.filters : {};

    var num = req.query.num ? req.query.num : 10;
    var page = req.query.page ? (req.query.page-1) * num : 0;

    var or = ''

    var where = `1=1 `;
    for(obj in query){
      if(query[obj] != null){
          if (obj === "type") {
            if(query[obj] != 0){
              // where += "and ( CURRENT_TIMESTAMP>endTime or status < 2 )";
              where += "and ( TIMESTAMPDIFF(day,CURRENT_TIMESTAMP,endTime) < 0 or status < 2 )";
            }
            else {
              // where += "and CURRENT_TIMESTAMP<=endTime and status = 2";
              where += "and TIMESTAMPDIFF(day,CURRENT_TIMESTAMP,endTime) >= 0 and status = 2";
            }
          }
          else if (obj === "addr") {
            if(query[obj] <= 1) {
              or += ` or (default_status = 1 and ${obj}<=${query[obj]} and commodity_status = 3) `;
              where += ` and ${obj}<=${query[obj]}`;
            }
            else {
              or += ` or (default_status = 1 and ${obj}>=${query[obj]} and commodity_status = 3) `;
              where += ` and ${obj}>=${query[obj]}`;
            }
          }
          else {
            where += ` and ${obj}=${query[obj]}`;
          }
      }
    }

    if(req.query.keywords != null){
      where += ` and name like '%${req.query.keywords}%'`;
    }

    where += ` and commodity_status = 3`;

    if(or){
      where = '(' +where+ ')' + or
    }

    var sql = `select * from ad_commodity where ${where} order by id limit ${page},${num}`;

    pool(sql ,query).then(function(data) {


      var sql = `select count(id) as count from ad_commodity where ${where} `;

      pool(sql).then(function(_data) {
        authChecked.send(res, req, 200, {err: 0, count: _data[0].count, data: data});
      }, function(err) {
        authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
      });


    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });
  },

  //显示抢购
  show_ac: function (req, res, next) {

    var query = req.query.filters ? req.query.filters : {};

    var num = req.query.num ? req.query.num : 10;
    var page = req.query.page ? (req.query.page-1) * num : 0;

    var where = `1=1 `;
    for(obj in query){
      if(query[obj] != null){
          if (obj === "type") {
            if(query[obj]){
              // where += "and CURRENT_TIMESTAMP>endTime";
              // where += "and TIMESTAMPDIFF(day,CURRENT_TIMESTAMP,endTIme) < 0";
              where += "and ( TIMESTAMPDIFF(day,CURRENT_TIMESTAMP,endTIme) < 0 or status < 2 )";
            }
            else {
              // where += "and CURRENT_TIMESTAMP<=endTime";
              // where += "and TIMESTAMPDIFF(day,CURRENT_TIMESTAMP,endTIme) >= 0";
              where += "and TIMESTAMPDIFF(day,CURRENT_TIMESTAMP,endTIme) >= 0 and status = 2";
            }
          }
          else {
            where += ` and ${obj}=${query[obj]}`;
          }
      }
    }

    if(req.query.keywords != null){
      where += ` and name like '%${req.query.keywords}%'`;
    }

    where += ` and commodity_status = 3`;


    var sql = `select * from activity_commodity where ${where} order by id limit ${page},${num}`;

    pool(sql ,query).then(function(data) {


      var sql = `select count(id) as count from activity_commodity where ${where} `;

      pool(sql).then(function(_data) {
        authChecked.send(res, req, 200, {err: 0, count: _data[0].count, data: data});
      }, function(err) {
        authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
      });


    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  //显示 热销/最新
  show_hot_new: function (req, res, next) {

    var query = req.query.filters ? req.query.filters : {};

    var num = req.query.num ? req.query.num : 10;
    var page = req.query.page ? (req.query.page-1) * num : 0;

    var order = req.query.order ? req.query.order : 'updateTime';
    var sort = req.query.sort ? req.query.sort : 'desc';

    var where = `1=1 `;
    for(obj in query){
      if(query[obj] != null){
        if (obj ==='signed_at') {
          
          if (query[obj][0]) {
            var strTime = moment(query[obj][0]).format("YYYY-MM-DD");
            // where += ` and updateTime >= '${strTime}'`  
            where += ` and TIMESTAMPDIFF(day,updateTime,'${strTime}') <= 0`;
          }

          if (query[obj][1]) {
            var endTime = moment(query[obj][1]).format("YYYY-MM-DD");
            // where += ` and updateTime <= '${endTime}'`  
            where += ` and TIMESTAMPDIFF(day,updateTime,'${endTime}') >= 0`;
          }
        }
        else if ( obj === 'status' && query[obj] === 2 ) {
          where += ` and ${obj} >= ${query[obj]}`
        }
        else {
          where += ` and ${obj}=${query[obj]}`
        }
      }
    }

    if(req.query.keywords != undefined){
      where += ` and name like '%${req.query.keywords}%'`;
    }

    if(req.query.merchant_name != undefined){
      where += ` and merchant_name like '%${req.query.merchant_name}%'`;
    }

    where += ` and status = 3 and merchant_status = 2 `;

    var sql = `select * from type_commodity_merchant where ${where} order by ${order} ${sort} limit ${page},${num}`;

    pool(sql ,query).then(function(data) {
      

      var sql = `select count(id) as count from type_commodity_merchant where ${where} `;

      pool(sql).then(function(_data) {
        authChecked.send(res, req, 200, {err: 0, count: _data[0].count, data: data});
      }, function(err) {
        authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
      });


    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });
  },

  //添加阅读/销量
  add_read: function (req, res, next) {
    var sql = `update basic set read_num = read_num + 1,sales_num = sales_num + 1 where ?`;
    var array = [];

    array.push({commodity_id: req.params.nid});

    pool(sql, array).then(function(data) {
        authChecked.send(res, req, 200, {err: 0, data: data[0]});
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });
  }


};
