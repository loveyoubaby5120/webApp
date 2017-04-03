var AdController = require('../controllers/ad.server.controller.js');

module.exports = function(app) {
  app.route('/ad')
    .get(AdController.list)
    .post(AdController.create);

  app.route('/ad/:nid')
    .get(AdController.getById)
    .put(AdController.edit)
    .delete(AdController.deleteById);
};
