'use strict'

var koa = require('koa');
var path = require('path');

var onerror = require('Koa-onerror');

var route = require('koa-route');
var Router = require('koa-router');

var render = require('koa-ejs');
var co = require('co');
var views = require('koa-views');

var logger = require('koa-logger');

// var bodyParser = require('koa-bodyparser');
var bodyParser = require('koa-body-parser');

var staticServer = require('koa-static');

var wechat = require('./wechat/g.js');
var config = require('./config.js');
var weixin = require('./weixin.js');


var app = koa();



var locals = {
	version: '0.0.1',
	now: function () {
		return new Date();
	},
	ip: function *() {  // generatorFunction
		yield wait(10);
		return this.ip; // use this like in koa middleware
	}
};

module.exports = function(){
	console.log('init koa...');


/*------------------------------------------------------------------------------------------------------------------------------*/

	



	render(app, {
		root: path.join(__dirname, '../views'),
		layout: 'template',
		viewExt: 'ejs',
		cache: false,
		debug: true,
		locals: locals
	});


	app.context.render = co.wrap(app.context.render);


/*------------------------------------------------------------------------------------------------------------------------------*/
	app.use(bodyParser());


/*------------------------------------------------------------------------------------------------------------------------------*/

	app.use(staticServer(path.join(__dirname,'../public')));

/*------------------------------------------------------------------------------------------------------------------------------*/

	app.use(logger());


/*------------------------------------------------------------------------------------------------------------------------------*/
	
	app.use(wechat(config.wechat, weixin.reply));

/*------------------------------------------------------------------------------------------------------------------------------*/


	var routes = require('../routes/index.js');

	app
		.use(routes.routes())
		.use(routes.allowedMethods());



	// app.on('error', function(err){
	// 	log.error('server error', err);
	// });

	// app.on('error', function(err, ctx){
	// 	log.error('server error', err, ctx);
	// });

/*------------------------------------------------------------------------------------------------------------------------------*/

	onerror(app);


	return app;
}