var Router = require('koa-router');
var router = new Router();
var GzhController = require('../contorllers/gzh.server.controller.js');


router.get('/map_info', GzhController.map_info);

router.get('/gzh_type_List', GzhController.gzh_type_List);

router.get('/gzh_profile_list', GzhController.gzh_profile_list);

router.get('/article_profile_list', GzhController.article_profile_list);


// router.get('/gzh_profile_list', GzhController.gzh_profile_list);

module.exports = router;
