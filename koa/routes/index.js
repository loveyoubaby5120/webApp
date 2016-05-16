var Router = require('koa-router');
var path = require('path');
var router = new Router();

router.get('/', function *(next) {
	// this.body = 'Hello '+ this.params.name;
	console.log(this.render);
	this.render('index', { title: 'index', layout: false });
});



router.get('/other(/*)?', function *(next) {
	this.render('other', { title: 'other', layout: false });
});

module.exports = router;
