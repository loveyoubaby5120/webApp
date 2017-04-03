var UploadController = require('../controllers/upload.server.controller.js');

module.exports = function(app) {
  
  app.route('/upload')
    .post(UploadController.upload);

};
