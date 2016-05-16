var Router = require('koa-router');
var router = new Router();

router.get('/', function *(next) {
	// this.body = 'Hello '+ this.params.name;
	console.log(1);
	this.render('index', { title: 'index', layout: false });
});



router.get('/other(/*)?', function *(next) {
	this.render('other', { title: 'other', layout: false });
});

module.exports = router;
