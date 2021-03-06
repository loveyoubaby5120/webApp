var Router = require('koa-router');
var router = new Router();

router.get('/', function *(next) {
	yield this.render('index', { title: '微信公众号排名', layout: false, url: this.request.url,css: 'index_new_pc.css' });
	// this.redirect('/index');
});


router.get('/index(\/.*)*', function *(next) {
	yield this.render('index', { title: '微信公众号排名', layout: false, url: this.request.url,css: 'index_new_pc.css' });
});


router.get('/index_info(\/.*)*', function *(next) {
	yield this.render('index', { title: '微信公众号排名', layout: false, url: this.request.url,css: 'index_new_pc_info.css' });
});

module.exports = router;
