var express = require('koa');
var router = require('koa-router');



/* GET home page. */
router.get('/', function *(next) {
	yield this.render('index', { title: 'index' });
});


router.get('/other(/*)?', function *(next) {
	yield this.render('other', { title: 'other' });
});

module.exports = router;


// var forums = new Router();
// var posts = new Router();
 
// posts.get('/', function *(next) {...});
// posts.get('/:pid', function *(next) {...});
// forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());
 
// // responds to "/forums/123/posts" and "/forums/123/posts/123" 
// app.use(forums.routes());






// var router = require('koa-router');
// var routes = require('./routes/web.js')

// app.use(router(app));
// routes(app);

// module.exports = routes;
// function routes(app) {      
// 	app.get('/', blog.index);
// 	app.get('/blog/new', blog.new);
// 	app.get('/blog/list', blog.list);
// 	app.post('/blog', blog.create);
// 	app.get('/blog/all', blog.blogList);
// 	app.get('/blog/:id', blog.read);
// }