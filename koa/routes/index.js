var Router = require('koa-router');
var router = new Router();

router.get('/', function *(next) {
	// this.body = 'Hello '+ this.params.name;
	yield this.render("/index", {title: "用户登录", layout: false, url: this.request.url });
});



router.get('/other[/*]?', function *(next) {
	yield this.render('other', { title: 'other', layout: false, url: this.request.url });
});

module.exports = router;
