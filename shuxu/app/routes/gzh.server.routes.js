var Router = require('koa-router');
var router = new Router();
var GzhController = require('../contorllers/gzh.server.controller.js');
// var GzhController = require('../contorllers/gzh.server.controller_.js');


router.get('/map', GzhController.map);

router.get('/gzh_type_List', GzhController.gzh_type_List);

router.get('/gzh_profile_list', GzhController.gzh_profile_list);

router.get('/topic_hot', GzhController.topic_hot);

router.get('/article_profile_list', GzhController.article_profile_list);





router.get('/map_info', GzhController.map_info);

router.get('/ranking_info', GzhController.ranking_info);

router.get('/chart_days_info', GzhController.chart_days_info);

router.get('/statistics_info', GzhController.statistics_info);

router.get('/article_profile_info', GzhController.article_profile_info);

// router.get('/gzh_profile_list', GzhController.gzh_profile_list);

module.exports = router;
