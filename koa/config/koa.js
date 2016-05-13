var koa = require('koa');
var path = require('path');
var route = require('koa-route');
var router = require('koa-router');
var render = require('koa-ejs');
var logger = require('koa-logger');
var bodyParser = require('koa-bodyparser');
var staticServer = require('koa-static');
// var views = require('koa-views');
// app.use(views('./views', 'jade'));

var app = koa();

module.exports = function(){
	console.log('init koa...');

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
		viewExt: 'html',
		cache: false,
		debug: true,
		locals: locals
	});


	// app.use(bodyParser({
	// 	detectJSON: function (ctx) {
	// 		return /\.json$/i.test(ctx.path);
	// 	},
	// 	extendTypes: {
	// 		json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
	// 	},
	// 	onerror: function (err, ctx) {
	// 		ctx.throw('body parse error', 422);
	// 	}
	// }));

	app.use(staticServer(path.join(__dirname,'../public')));

	app.use(logger());

	// app.use(router.routes())          //路由中间件
	// app.use(router.allowedMethods());   //路由中间件


	// x-response-time

	app.use(function *(next){
		var start = new Date;
		// console.log('x-response-time 1');
		yield next;
		// console.log('x-response-time 2');
		var ms = new Date - start;
		this.set('X-Response-Time', ms + 'ms');
		// console.log('x-response-time 3');
	});

	// logger

	app.use(function *(next){
		var start = new Date;
		// console.log('logger 1');
		yield next;
		// console.log('logger 2');
		var ms = new Date - start;
		console.log('%s %s - %s', this.method, this.url, ms);
		// console.log('logger 3');
	});


	app.use(route.get('/:name', function*(name) {
    	// this.body = 'Hello '+name;
    	// yield this.render('index',{title,name});
	}));

	// response

	app.use(function *(){
		//当然，您也可以自己生成 KeyGrip 实例：
		// app.keys = ['im a newer secret', 'i like turtle'];
		// app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');
		//在进行cookie签名时，只有设置 signed 为 true 的时候，才会使用密钥进行加密：
		// this.cookies.set('name', 'tobi', { signed: true });

		// console.log('response 1');
	  	// this.body = 'Hello World';
	  	yield this.render('index');
	  	// console.log('response 2');
	});

	app.on('error', function(err){
		log.error('server error', err);
	});

	app.on('error', function(err, ctx){
		log.error('server error', err, ctx);
	});


	return app;
}