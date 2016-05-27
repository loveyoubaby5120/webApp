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


/*------------------------------------------------------------------------------------------------------------------------------*/

	app.use(staticServer(path.join(__dirname,'../public')));

/*------------------------------------------------------------------------------------------------------------------------------*/

	app.use(logger());

/*------------------------------------------------------------------------------------------------------------------------------*/


	var routes = require('../routes/index.js');

	app
		.use(routes.routes())
		.use(routes.allowedMethods());

	var serverRoutes = require('../app/routes/gzh.server.routes.js');

	app
		.use(serverRoutes.routes())
		.use(serverRoutes.allowedMethods());


/*------------------------------------------------------------------------------------------------------------------------------*/

	// var router = new Router();

	// router.get('/', function *(next) {
	//   // this.body = 'Hello World!';
	//   yield this.render("/index", {title: "用户登录", layout: false});
	// });
 
	// app
	//   .use(router.routes())
	//   .use(router.allowedMethods());

/*------------------------------------------------------------------------------------------------------------------------------*/

	// app.use(route.get('/:name', function*(name) {
 //    	this.body = 'Hello '+name;
 // 		yield this.render("/index", {title: "用户登录", layout: false});
	// }));

	// response

	// app.use(function *(){
	// 	//当然，您也可以自己生成 KeyGrip 实例：
	// 	// app.keys = ['im a newer secret', 'i like turtle'];
	// 	// app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');
	// 	//在进行cookie签名时，只有设置 signed 为 true 的时候，才会使用密钥进行加密：
	// 	// this.cookies.set('name', 'tobi', { signed: true });

	// 	// console.log('response 1');
	//   	// this.body = 'Hello World';
	//   	yield this.render("/index", {title: "用户登录", layout: false});
	//   	// console.log('response 2');
	// });

/*------------------------------------------------------------------------------------------------------------------------------*/

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