'use strict'

var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var util = require('./util.js');


var prefix = 'https://api.weixin.qq.com/cgi-bin/';

var api = {
	accessToken: prefix + 'token?grant_type=client_credential'
}


var isJson = function(obj){
var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;    
return isjson;
}

function Wechat(opts){
	var _this = this;
	this.appID = opts.appID;
	this.appSecret = opts.appSecret;
	this.getAccessToken = opts .getAccessToken;
	this.saveAccessToken = opts.saveAccessToken;

	this.getAccessToken()
		.then(function(data){
			try{
				data = JSON.parse(data);
			}
			catch(e){
				return _this.updateAccessToken();
			}

			if(_this.isValidAccessToken(data)){
				return Promise.resolve(data);
				// return data;
			}
			else{
				return _this.updateAccessToken();
			}

		})
		.then(function(data){
			_this.access_token = data.access_token;
			_this.expires_in = data.expires_in;

			_this.saveAccessToken(data);
		});
}


Wechat.prototype.isValidAccessToken = function(data){
	if(!data || !data.access_token || !data.expires_in){
		return false;
	}

	var access_token = data.access_token;
	var expires_in = data.expires_in;
	var now = (new Date().getTime());

	if(now < expires_in){
		return true;
	}
	else{
		return false;
	}
};


Wechat.prototype.updateAccessToken = function(){
	console.log('updateAccessToken');
	var appID = this.appID;
	var appSecret = this.appSecret;
	var url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret;
	return new Promise(function(resolve, reject){
		request({url: url, json: true}).then(function(response){
			var data = response.body;
			var now = (new Date().getTime());
			var expires_in = now + (data.expires_in - 20) * 1000;

			data.expires_in = expires_in;
			resolve(data);

		});
		
	})

}


Wechat.prototype.reply = function(){
	var content = this.body;
	var message = this.weixin;
	console.log(content);
	console.log(message);
	var xml = util.tpl(content, message);

	this.status = 200;
	this.type = 'application/xml';
	this.body = xml;

}

module.exports = Wechat;













