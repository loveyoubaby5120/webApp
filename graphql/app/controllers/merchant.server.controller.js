var pool = require('../../config/pool.js');
var connection = require('../../config/connection.js');
var authChecked = require('../authChecked/authChecked');
var moment = require('moment');
var querystring = require('querystring');

var formidable = require('formidable');
var fs = require('fs');

var TITLE = 'formidable上传示例';
var AVATAR_UPLOAD_FOLDER = '/upload/';

var config = require('../../config/config.js');
var ServerAPI = require('../../config/ServerAPI.js');

module.exports = {

  list: function(req, res, next) {

    var query = req.query.filters ? JSON.parse(req.query.filters) : {};

    var num = req.query.num ? req.query.num : 10;
    var page = req.query.page ? (req.query.page-1) * num : 0;

    var where = `1=1 `;
    for(obj in query){
      if(query[obj] != null){
        if (obj ==='signed_at') {
          
          if (query[obj][0]) {
            var strTIme = moment(query[obj][0]).format("YYYY-MM-DD");
            where += ` and createTime >= '${strTIme}'`  
          }

          if (query[obj][1]) {
            var endTIme = moment(query[obj][1]).format("YYYY-MM-DD");
            where += ` and createTime <= '${endTIme}'`  
          }
        }
        else {
          where += ` and ${obj}=${query[obj]}`
        }
      }
    }

    if(req.query.keywords != null){
      where += ` and (name like '%${req.query.keywords}%' or user_name like '%${req.query.keywords}%')`;
    }


    
    var sql = `select * from merchant where ${where} order by id,user_name desc limit ${page},${num}`;

    pool(sql ,query).then(function(data) {
      

      var sql = `select count(id) as count from merchant `;

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

    var cookie = querystring.parse(req.headers['cookie'].replace(/; /g, '&'));


    if (cookie.role == 2) {
      var sql = 'select * from merchant where user_name =' + cookie.user_name + ' ';

      pool(sql).then(function(data) {

        authChecked.send(res, req, 200, {err: 0, data: data});

      }, function(err) {
        authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
      });

    } else {
      var sql = `select * from merchant order by id`;

      pool(sql).then(function(data) {

        authChecked.send(res, req, 200, {err: 0, data: data});

      }, function(err) {
        authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
      });
    }


  },

  create: function(req, res, next) {


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


  getById: function(req, res, next) {

    var sql = "select * from merchant where id = " + req.params.nid + "";

    pool(sql).then(function(data) {
      authChecked.send(res, req, 200, {err: 0, data: data[0]});
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },
  getUserByMerchant: function(req, res, next) {

    var sql = "select * from merchant where user_id = " + req.params.nid + "";

    pool(sql).then(function(data) {
      console.log("xxxx---xxxx");
      console.log(data);
      authChecked.send(res, req, 200, {err: 0, data: data[0]});
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  edit: function(req, res, next) {
    req.body.updateTime = moment().format("YYYY-MM-DD");
    var json = req.body;
    var sql = `update merchant set ? where ?`;
    var array = [];


    array.push({id: req.body.id});
    delete json["id"];
    array.unshift(req.body);

    pool(sql, array).then(function(data) {

      if(req.body.status == 2 && req.body.money_status == 2){
        var sql = `update user set type=2,role=2 where id = ${req.body.user_id} and role != 0`;
          pool(sql).then(function(result) {

          }, function() {

          });

      }
      else{
        var sql = `update user set type=1,role=1 where id = ${req.body.user_id} and role != 0`;
          pool(sql).then(function(result) {

          }, function() {

          });
      }

      var sql = `update commodity set merchant_name='${json.name}' where merchant_id = ${array[1].id}`;

      pool(sql, array).then(function(_data) {

        var sendData = {};
        sendData.templateid = 3033081;
        sendData.mobiles = [];
        sendData.params = [];
        sendData.mobiles.push(json.phone);
        sendData.params.push(json.user_name);
        if(json.status === 1){
          sendData.params.push('商户审核被驳回');
        }
        if(json.status === 2 && json.money_status === 0){
          sendData.params.push('商户审核通过，快去上传保证金截图与账户吧');
        }
        if(json.status === 2 && json.money_status === 1){
          sendData.params.push('保证金审核被驳回');
        }
        if(json.status === 2 && json.money_status === 2){
          sendData.params.push('保证金审核通过，可以管理商户啦');
        }

        if(json.status >= 1){
          var serverAPI = new ServerAPI(config.smsNotice.AppKey, config.smsNotice.AppSecret);
          serverAPI.sendSMSTemplate(sendData, function(err, data) {
            console.log(err);
            console.log(data);
            // authChecked.send(res, req, 200, {err: 0, msg: "发送成功"});
          })
        }

        var sql = "select * from merchant where id = " + array[1].id + "";

        pool(sql).then(function(data) {
          authChecked.send(res, req, 200, {err: 0, data: data[0]});
        }, function() {
          authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
        });

      }, function() {
        authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
      });

      
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },


  deleteById: function(req, res, next) {

    var sql = "delete from  merchant where id = " + req.params.nid + "";

    pool(sql).then(function(data) {
      authChecked.send(res, req, 200, {err: 0, data: data[0]});
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  upload: function(req, res, next) {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';    //设置编辑
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;  //设置上传目录
    form.keepExtensions = true;  //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
    form.parse(req, function(err, fields, files) {

      if (err) {
        res.locals.error = err;
        authChecked.send(res, req, 400, {err: 1, data: {error: '连接错误'} });
        return;   
      }  

      var extName = '';  //后缀名
      switch (files.file.type) {
        case 'image/pjpeg':
          extName = 'jpg';
          break;
        case 'image/jpeg':
          extName = 'jpg';
          break;     
        case 'image/png':
          extName = 'png';
          break;
        case 'image/x-png':
          extName = 'png';
          break;
        default:
          extName = '';
          break;    
      }

      if(extName.length == 0){
          res.locals.error = '后缀名有误';
          authChecked.send(res, req, 400, {err: 1, data: {err: '后缀名有误'} });
          return;           
      }

      var avatarName = Math.random() + '.' + extName;
      var newPath = form.uploadDir + avatarName;

      var upload_path = AVATAR_UPLOAD_FOLDER + avatarName;;

      var result = fs.renameSync(files.file.path, newPath);  //重命名
      if (result === undefined) {
        authChecked.send(res, req, 200, {err: 0, data: upload_path});
      }
    });
  }


};
