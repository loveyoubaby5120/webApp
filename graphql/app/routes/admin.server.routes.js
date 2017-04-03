/**
 * Created by youpeng on 16/8/17.
 */
var AdminController = require('../controllers/admin.server.controller.js');

module.exports = function(app) {
  app.route('/login')
    .post(AdminController.user_login)
    .get(AdminController.sendSMS);

  app.route('/user_create')
    .post(AdminController.user_create)
    .get(AdminController.editPwd);


  app.route('/modify/:nid')
    .put(AdminController.modify);

  app.route('/get_user_by_token')
    .post(AdminController.get_user_by_token);

};
