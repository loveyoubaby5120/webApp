// import express from 'express'
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


module.exports = function(){
	console.log('init express...');
	var app = express();

	app.use(bodyParser.json());
	app.use(express.static("public"));

	app.set('view engine', 'ejs');
	app.set('views', path.join(__dirname, '../views'));

	//加载路由方法一
	require('../app/routes/news.server.routes')(app);

	//加载路由方法二
	var routes = require('../routes/index.js');

	app.use('/',routes);

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