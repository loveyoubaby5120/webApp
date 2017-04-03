var ActivityController = require('../controllers/activity.server.controller.js');

module.exports = function(app) {
  app.route('/activity')
    .get(ActivityController.list)
    .post(ActivityController.create);

  app.route('/activity/:nid')
    .get(ActivityController.getById)
    .put(ActivityController.edit)
    .delete(ActivityController.deleteById);
};
