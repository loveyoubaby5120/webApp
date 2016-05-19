var Router = require('koa-router');
var router = new Router();

router.get('/', function *(next) {
	this.redirect('/index');
});


router.get('/index(\/.*)*', function *(next) {
	yield this.render('index', { title: '数絮科技', layout: false, url: this.request.url });
});


module.exports = router;
