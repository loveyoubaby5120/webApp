var UserController = require('../controllers/user.server.controller.js');

module.exports = function(app) {
  app.route('/user')
    .get(UserController.list)
    .post(UserController.create);

  app.route('/user/:nid')
    .get(UserController.getById)
    .put(UserController.edit)
    .delete(UserController.deleteById);

  app.route('/userAll')
	.get(UserController.all);
};
