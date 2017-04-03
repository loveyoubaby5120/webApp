/**
 * Created by youpeng on 16/8/17.
 */
var pool = require('../../config/pool.js');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var authChecked = require('../authChecked/authChecked');

var config = require('../../config/config.js');
var ServerAPI = require('../../config/ServerAPI.js');

module.exports = {
  // 登录
  user_login: function(req, res, next) {

    if (!req.body.name) {
      req.body = req.query;
    }

    var findByName = "SELECT * FROM user WHERE name='" + req.body.name + "'";

    pool(findByName).then(function(data) {
      if (data.length == 0) {
        authChecked.send(res, req, 400, {err: 1, msg: "用户名不存在"})
      } else {
        if (data[0].pwd == req.body.pwd) {
          var token = new Date().getTime() + '_' + Math.random();
          res.cookie('token', token, {maxAge: 9000000});
          res.cookie('id', data[0].id, {maxAge: 9000000});
          res.cookie('user_name', data[0].name, {maxAge: 9000000});
          res.cookie('nick_name', data[0].nick_name, {maxAge: 9000000});
          res.cookie('role', data[0].role, {maxAge: 9000000});

          console.log(data[0]);
          var result = data[0];


          var sql = "UPDATE user SET token='" + token + "' WHERE name='" + req.body.name + "'";
          pool(sql).then(function(data) {
            authChecked.send(res, req, 200, {'role': result.role, 'token': result.token, 'user_id': result.id});

          }, function(err) {
            authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
          });
        }
        else {
          authChecked.send(res, req, 400, {err: 1, msg: "密码错误"});
        }
      }
    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  //注册
  user_create: function(req, res, next) {

    var serverAPI = new ServerAPI(config.smsCode.AppKey, config.smsCode.AppSecret);
    serverAPI.verifycode({mobile: req.query.phone, code: req.query.code}, function(err, data) {

      if (data.code === 200) {

        if (req.body) {
          req.body = req.query;
        }

        req.body.nick_name = req.body.name;

        delete req.body.repassword
        delete req.body.code

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
          authChecked.send(res, req, 500, {err: 1, msg: "注册信息有误"});
        });
      }
      else if (data.code === 413) {
        authChecked.send(res, req, 500, {err: 1, msg: "验证码错误"});
      }
      else {
        authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
      }
    })


  },


  // 修改密码

  modify: function(req, res, next) {

    var findByPassword = "SELECT * FROM user WHERE name ='" + req.params.nid + "' and pwd = '" + req.body.pwd + "' ";
    pool(findByPassword).then(function(data) {
      if (data.length == 0) {
        authChecked.send(res, req, 400, {err: 1, msg: "当前密码错误"})
      } else {
        var modify = "update user set pwd = '" + req.body.re_new_pwd + "' where name ='" + req.params.nid + "'";
        pool(modify).then(function(data) {
          authChecked.send(res, req, 200, {err: 0, msg: '修改成功'});
        }, function(err) {
          authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
        });
      }
    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });


  },

  get_user_by_token: function(req, res, next) {
    var cookie = querystring.parse(req.headers['cookie'].replace(/; /g, '&'));
    authChecked.get_user_by_token(cookie.token)
      .then(function(data) {
        if (data.status === 200) {
          var token = new Date().getTime() + '_' + Math.random();
          res.cookie('token', cookie.token, {maxAge: 9000000});
          res.cookie('user_name', data.data.data.name, {maxAge: 9000000});
          res.cookie('id', data.data.data.id, {maxAge: 9000000});
          res.cookie('nick_name', data.data.data.nick_name, {maxAge: 9000000});
          res.cookie('role', data.data.data.role, {maxAge: 9000000});
          authChecked.send(res, req, data.status, {err: 0, msg: '登录成功'});
        }
        else if (data.status === 401) {
          authChecked.send(res, req, data.status, data);
        } else {
          authChecked.send(res, req, data.status, data);
        }
      }, function(err) {
      });
  },
    //修改密码
    editPwd: function(req, res, next) {

      var serverAPI = new ServerAPI(config.smsCode.AppKey, config.smsCode.AppSecret);
      serverAPI.verifycode({mobile: req.query.phone, code: req.query.code}, function(err, data) {

        if (data.code === 200) {

          var sql = `update user set pwd = ${req.query.pwd} where name like '${req.query.name}'`;

          pool(sql).then(function(data) {
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
            authChecked.send(res, req, 500, {err: 1, msg: "注册信息有误"});
          });
        }
        else if (data.code === 413) {
          authChecked.send(res, req, 500, {err: 1, msg: "验证码错误"});
        }
        else {
          authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
        }
      })
    },


    sendSMS: function(req, res, next) {
      var serverAPI = new ServerAPI(config.smsCode.AppKey, config.smsCode.AppSecret);
      serverAPI.sendSmsCode({mobile: req.query.phone}, function(err, data) {
        authChecked.send(res, req, 200, {err: 0, msg: "发送成功"});
      })

    }

  };
