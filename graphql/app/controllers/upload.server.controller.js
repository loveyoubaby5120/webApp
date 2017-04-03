var authChecked = require('../authChecked/authChecked');

var formidable = require('formidable');
var fs = require('fs');

var TITLE = 'formidable上传示例';
var AVATAR_UPLOAD_FOLDER = '/upload/';

module.exports = {

  upload: function(req, res, next) {


    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';    //设置编辑
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;  //设置上传目录
    form.keepExtensions = true;  //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
    form.parse(req, function(err, fields, files) {

      if (err) {
        res.locals.error = err;
        authChecked.send(res, req, 400, {err: 1, data: {error: '连接错误'} });
        return;   
      }  


      var extName = '';  //后缀名
      switch (files.file.type) {
        case 'image/pjpeg':
          extName = 'jpg';
          break;
        case 'image/jpeg':
          extName = 'jpg';
          break;     
        case 'image/png':
          extName = 'png';
          break;
        case 'image/x-png':
          extName = 'png';
          break;
        default:
          extName = '';
          break;    
      }

      if(extName.length == 0){
          res.locals.error = '后缀名有误';
          authChecked.send(res, req, 400, {err: 1, data: {err: '后缀名有误'} });
          return;           
      }

      var avatarName = Math.random() + '.' + extName;
      var newPath = form.uploadDir + avatarName;

      var upload_path = AVATAR_UPLOAD_FOLDER + avatarName;;

      var result = fs.renameSync(files.file.path, newPath);  //重命名
      if (result === undefined) {
        authChecked.send(res, req, 200, {err: 0, data: upload_path});
      }
    });
  }


};
