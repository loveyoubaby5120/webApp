var WechatController = require('../contorllers/wechat.server.controller.js');

module.exports = function(app){
	app.route('/wechat')
		.get(WechatController.list)
		.post(WechatController.create);

	app.route('/wechat/:nid')
		.get(WechatController.get);


	app.param('nid', WechatController.getById);


}