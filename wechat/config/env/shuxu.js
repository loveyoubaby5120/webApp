'use strict'
var path = require('path');
var util = require('../../libs/util.js');
var wechat_file = path.join(__dirname, '../wechat.txt');
var wechat_ticket_file = path.join(__dirname, '../wechat_ticket.txt');

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
        appID: 'wxfbabb65cb83c5220',
        appSecret: '1692d624e964b1d2fd71a3a60c6997f8',
        token: 'loveyoubaby5120',
        getAccessToken: function(){
        	return util.readFileAsync(wechat_file,'utf-8');
        },
        saveAccessToken: function(data){
        	data = JSON.stringify(data);
        	return util.writeFileAsync(wechat_file, data);
        },
        getTicket: function(){
            return util.readFileAsync(wechat_ticket_file,'utf-8');
        },
        saveTicket: function(data){
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_ticket_file, data);
        }
    }
};


module.exports = config