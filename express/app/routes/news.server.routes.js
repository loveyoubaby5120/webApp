var NewsController = require('../contorllers/news.server.controller.js');

module.exports = function(app){
	app.route('/news')
		.get(NewsController.list)
		.post(NewsController.create);

	app.route('/news/:nid')
		.get(NewsController.get);


	app.param('nid', NewsController.getById);


}