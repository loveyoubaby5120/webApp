var WechatController = require('../contorllers/newrank.server.controller.js');

module.exports = function(app){
	app.route('/newrankInfo')
		.get(WechatController.list)
		.post(WechatController.create);

	app.route('/newrankInfo/:nid')
		.get(WechatController.get);


	app.param('nid', WechatController.getById);


}