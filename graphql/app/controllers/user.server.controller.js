var pool = require('../../config/pool.js');
var connection = require('../../config/connection.js');
var authChecked = require('../authChecked/authChecked');


module.exports = {

  list: function(req, res, next) {


    var query = req.query.filters ? JSON.parse(req.query.filters) : {};

    var num = req.query.num ? req.query.num : 10;
    var page = req.query.page ? (req.query.page-1) * num : 0;

    var where = `1=1 `;
    for(obj in query){
      if(query[obj] != null){
        where += ` and ${obj}=${query[obj]}`
      }
    }

    if(req.query.keywords != null){
      where += ` and name like '%${req.query.keywords}%'`;
    }



    var sql = `select * from user where ${where} order by id desc limit ${page},${num}`;

    pool(sql ,query).then(function(data) {


      var sql = `select count(id) as count from user where ${where} `;

      pool(sql).then(function(_data) {
        authChecked.send(res, req, 200, {err: 0, count: _data[0].count, data: data});
      }, function(err) {
        authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
      });


    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  all: function(req, res, next) {
    var sql = `select * from user order by id`;
    if (req.query.id) {
      sql = 'select * from user where id not in (select user_id from merchant) order by id'
    }

    pool(sql).then(function(data) {

        authChecked.send(res, req, 200, {err: 0, data: data});

    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });
  },

  create: function(req, res, next) {

    if(req.body.nick_name){
      req.body.nick_name = req.body.name;
    }

    var sql = "INSERT INTO user SET ?";

    pool(sql, req.body).then(function(data) {
      if (data) {

          var sql = "select * from user where name like '%" + req.body.name + "%' order by id desc limit 1";

          pool(sql).then(function(data) {
            authChecked.send(res, req, 200, {err: 0, data: data[0]});
          }, function() {
            authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
          });

        // authChecked.send(res, req, 200, {err: 0, data: data});
      }
    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },


  getById: function(req, res, next) {

    var sql = "select * from user where id = " + req.params.nid + "";

    pool(sql).then(function(data) {
      authChecked.send(res, req, 200, {err: 0, data: data[0]});
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  edit: function(req, res, next) {
    var json = req.body;
    var sql = `update user set ? where ?`;
    var array = [];

    array.push({id: req.body.id});
    delete json["id"];
    array.unshift(req.body);

    pool(sql, array).then(function(data) {

      var sql = `update merchant set user_name='${json.name}' where user_id = ${array[1].id}`;

      pool(sql, array).then(function(_data) {
        authChecked.send(res, req, 200, {err: 0, data: data[0]});
      }, function() {
        authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
      });

    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },


  deleteById: function(req, res, next) {

    var sql = "delete from  user where id = " + req.params.nid + "";

    pool(sql).then(function(data) {
      authChecked.send(res, req, 200, {err: 0, data: data[0]});
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  }
};
