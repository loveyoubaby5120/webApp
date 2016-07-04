var koa = require('koa');
var path = require('path');

// var onerror = require('Koa-onerror');

var route = require('koa-route');
var Router = require('koa-router');

var render = require('koa-ejs');
var co = require('co');
var views = require('koa-views');

var logger = require('koa-logger');

// var bodyParser = require('koa-bodyparser');
var bodyParser = require('koa-body-parser');

var staticServer = require('koa-static');

var app = koa();

module.exports = function(){
	console.log('init koa...');


/*------------------------------------------------------------------------------------------------------------------------------*/

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

	var config = {
	    wechat:{
	        appID: 'wx6cf67cf776e6aae4',
	        appSecret: '2ccb2200e737bbe5f75a086e780e0822',
	        token: 'loveyoubaby5120'
	    }
	};


	app.use(function *(next){
	    console.log(this.query);
	    
	    var token = config.wechat.token;
	    var signature = this.query.signature;
	    var nonce = this.query.nonce;
	    var timestamp = this.query.timestamp;
	    var echostr = this.query.echostr;
	    var str = [token, timestamp, nonce].sort().join('');
	    var sha = sha1(str);
	    
	    if(sha === signature){
	        this.body = echostr + '';
	    }
	    else{
	        this.body = 'wrong';
	    }
	});

/*------------------------------------------------------------------------------------------------------------------------------*/


	var routes = require('../routes/index.js');

	app
		.use(routes.routes())
		.use(routes.allowedMethods());



	app.on('error', function(err){
		log.error('server error', err);
	});

	app.on('error', function(err, ctx){
		log.error('server error', err, ctx);
	});

/*------------------------------------------------------------------------------------------------------------------------------*/

	// onerror(app);


	return app;
}