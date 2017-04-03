var ClientUserController = require('../controllers/clientUser.server.controller.js');

module.exports = function(app) {
  app.route('/clientUser')
    .get(ClientUserController.list)
    .post(ClientUserController.create);

  app.route('/create_merchant')
  	.get(ClientUserController.getById)
    .post(ClientUserController.create_merchant)
    .put(ClientUserController.update_merchant)


  app.route('/clientUser/:nid')
    .post(ClientUserController.deleteById)
};
