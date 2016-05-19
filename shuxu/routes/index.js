var Router = require('koa-router');
var router = new Router();

router.get('/(.*)*(\/.*)*', function *(next) {
	console.log(1);
	yield this.render("/index", {title: "数絮科技", layout: false, url: this.request.url });
});


router.get('/other', function *(next) {
	console.log(1);
	yield this.render("/index", {title: "数絮科技", layout: false, url: this.request.url });
});



module.exports = router;
