var Router = require('koa-router');
var path = require('path');
var router = new Router();

router.get('/', function *(next) {
	// this.body = 'Hello '+ this.params.name;
	console.log(1);
	var p = path.join(__dirname, '../views/index');
	// this.render( p, { title: 'index', layout: false });
	this.render('../index', { title: 'index', layout: false });
});



router.get('/other(/*)?', function *(next) {
	this.render('other', { title: 'other', layout: false });
});

module.exports = router;
