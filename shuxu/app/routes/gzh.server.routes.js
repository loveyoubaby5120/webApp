var Router = require('koa-router');
var router = new Router();
var GzhController = require('../contorllers/gzh.server.controller.js');


router.get('/gzh', GzhController.list);

module.exports = router;
