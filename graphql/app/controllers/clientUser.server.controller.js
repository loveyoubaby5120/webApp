var pool = require('../../config/pool.js');
var connection = require('../../config/connection.js');
var authChecked = require('../authChecked/authChecked');
var moment = require('moment');

module.exports = {

  //查看收藏夹
  list: function(req, res, next) {

    var query = req.query.filters ? req.query.filters : {};

    var num = req.query.num ? req.query.num : 10;
    var page = req.query.page ? (req.query.page-1) * num : 0;

    var where = `1=1 `;

    for(obj in query){
      if(query[obj] != null){
        where += ` and ${obj}=${query[obj]}`;
      }
    }

    if(req.query.keywords != null){
      where += ` and name like '%${req.query.keywords}%'`;
    }

    where += ` and user_id = ${req.session.user_id} `


    var sql = `select * from collection_commodity where ${where} order by id limit ${page},${num}`;

    pool(sql ,query).then(function(data) {


      var sql = `select count(id) as count from collection_commodity where ${where} `;

      pool(sql).then(function(_data) {
        authChecked.send(res, req, 200, {err: 0, count: _data[0].count, data: data});
      }, function(err) {
        authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
      });


    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  //添加收藏
  create: function(req, res, next) {

    req.query.user_id = req.session.user_id;

    var sql = "INSERT INTO collection SET ?";

    pool(sql, req.query).then(function(data) {
      authChecked.send(res, req, 200, {err: 0, data: data[0]});
    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "该商品已经在收藏夹"});
    });

  },

  //删除收藏
  deleteById: function(req, res, next) {

    var sql = "delete from collection where commodity_id = " + req.params.nid + " and user_id= " + req.session.user_id;

    pool(sql).then(function(data) {
      authChecked.send(res, req, 200, {err: 0, data: data[0]});
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  //查询商户
  getById: function(req, res, next) {

    var sql = "select * from merchant where user_id = " + req.session.user_id;

    pool(sql).then(function(data) {
      authChecked.send(res, req, 200, {err: 0, data: data[0]});
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  //商户申请
  create_merchant: function(req, res, next) {

    delete req.body.file1;
    delete req.body.file2;
    delete req.body.file3;
    delete req.body.file4;


    var sql = "INSERT INTO merchant SET ?";

    pool(sql, req.body).then(function(data) {
      if (data) {

        var sql = "select * from merchant where name like '%" + req.body.name + "%' order by id desc limit 1";

        pool(sql).then(function(data) {
          authChecked.send(res, req, 200, {err: 0, data: data[0]});
        }, function() {
          authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
        });

      }
    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

   //商户申请
   update_merchant: function(req, res, next) {
    if (req.body.status == 1) {
      req.body.status = 0;
    }
     if (req.body.money_status == 1) {
      req.body.money_status = 0;
    }
    req.body.updateTime = moment().format("YYYY-MM-DD");
    var json = req.body;
    var sql = `update merchant set ? where ?`;
    var array = [];


    array.push({id: req.body.id});
    delete json["id"];
    array.unshift(req.body);

    pool(sql, array).then(function(data) {

      var sql = "select * from merchant where id = " + array[1].id + "";

      pool(sql).then(function(data) {
        authChecked.send(res, req, 200, {err: 0, data: data[0]});
      }, function() {
        authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
      });


      
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },



};
