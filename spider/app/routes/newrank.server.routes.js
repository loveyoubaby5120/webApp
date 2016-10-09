var NewrankController = require('../contorllers/newrank.server.controller.js');

module.exports = function(app){
	app.route('/newrankInfo')
		.get(NewrankController.list)
		.post(NewrankController.create);

	app.route('/newrankInfo/:nid')
		.get(NewrankController.get)
		.post(NewrankController.update);


	app.param('nid', NewrankController.getById);


}