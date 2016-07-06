var path = require('path');
var util = require('../../libs/util.js');
var wechat_file = path.join(__dirname, '../wechat.txt');

var config = {
	nodePort: 3000,
	mongodb: 'mongodb://localhost/scms',
	mysql:{
		host: '127.0.0.1',
		port: 3306,
		user: 'root',
		password: 'admin123',
		database: 'weixin',
		connectionLimit: 50
	},
    wechat:{
        appID: 'wx705a188cef001f6d',
        appSecret: 'fe072f9282622701e05351c1b0c656e1',
        token: 'loveyoubaby5120',
        getAccessToken: function(){
        	return util.readFileAsync(wechat_file,'utf-8');
        },
        saveAccessToken: function(data){
        	data = JSON.stringify(data);
        	return util.writeFileAsync(wechat_file, data);
        }
    }
};


module.exports = config