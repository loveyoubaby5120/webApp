// import express from 'express'
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


module.exports = function(){
	console.log('init express...');
	var app = express();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(express.static("public"));

	app.set('view engine', 'ejs');
	app.set('views', path.join(__dirname, '../views'));

	//加载路由方法一
	// require('../app/routes/news.server.routes')(app);
	// require('../app/routes/wechat.server.routes')(app);
	// require('../app/routes/newrank.server.routes')(app);

	//加载路由方法二
	var routes = require('../routes/index');
	var users = require('../routes/users');
	var excel = require('../routes/excel');
	var weixin = require('../routes/weixin');
	// var bd = require('../routes/bd');
	// var newrank = require('../routes/newrank');
	var demo = require('../routes/demo');
	var yyzc = require('../routes/yyzc');
	var wechatData = require('../routes/wechatData');
	var wiki = require('../routes/wiki');
	var map = require('../routes/data_mining_map.js');

	app.use('/', routes);
	app.use('/users', users);
	app.use('/excel', excel);
	app.use('/weixin', weixin);
	// app.use('/bd', bd);
	// app.use('/newrank', newrank);
	app.use('/yyzc', yyzc);
	app.use('/wechatData', wechatData);
	app.use('/wiki', wiki);
	app.use('/map', map);
	// app.use('/', demo);

	app.use(function(req, res, next){
		res.status(404);

		try{
			return res.json("Not Found");
		}catch(e){
			console.log('404 set header after sent');
		}
	});

	app.use(function(err, req, res, next){
		if(!err){
			return next();
		}

		res.status(500);
		try{
			return res.json(err.message || 'server error');
		}catch(e){
			console.log('500 set header after sent');
		}
	});




	return app;
}