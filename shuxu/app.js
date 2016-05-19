var koa = require('./config/koa');
var mongodb = require('./config/mongoose');

var db = mongodb();
var app = koa();


module.exports = app;