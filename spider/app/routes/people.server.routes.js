var PeopleController = require('../contorllers/people.server.controller.js');

module.exports = function(app){
	app.route('/peopleInfo')
		.get(PeopleController.list)
		.post(PeopleController.create);

	app.route('/peopleInfo/:nid')
		.get(PeopleController.get)
		.post(PeopleController.update);


	app.param('nid', PeopleController.getById);


}