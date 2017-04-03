var ShoptController = require('../controllers/shop.server.controller.js');

module.exports = function(app) {
  app.route('/shop')
    .get(ShoptController.list)
    .post(ShoptController.create);

  app.route('/shop/:nid')
    .get(ShoptController.getById)
    .put(ShoptController.edit)
    .delete(ShoptController.deleteById)
    .post(ShoptController.upload);

  app.route('/shopAll')
	.get(ShoptController.all);
};
