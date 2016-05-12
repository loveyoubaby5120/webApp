var koa = require('koa');

var app = koa();

module.exports = function(){
	console.log('init koa...');
	

	// x-response-time

	app.use(function *(next){
		var start = new Date;
		console.log('x-response-time 1');
		yield next;
		console.log('x-response-time 2');
		var ms = new Date - start;
		this.set('X-Response-Time', ms + 'ms');
		console.log('x-response-time 3');
	});

	// logger

	app.use(function *(next){
		var start = new Date;
		console.log('logger 1');
		yield next;
		console.log('logger 2');
		var ms = new Date - start;
		console.log('%s %s - %s', this.method, this.url, ms);
		console.log('logger 3');
	});

	// response

	app.use(function *(){
		//当然，您也可以自己生成 KeyGrip 实例：
		app.keys = ['im a newer secret', 'i like turtle'];
		app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');
		//在进行cookie签名时，只有设置 signed 为 true 的时候，才会使用密钥进行加密：
		this.cookies.set('name', 'tobi', { signed: true });

		console.log('response 1');
	  	this.body = 'Hello World';
	  	console.log('response 2');
	});

	app.on('error', function(err){
		log.error('server error', err);
	});

	app.on('error', function(err, ctx){
		log.error('server error', err, ctx);
	});


	return app;
}