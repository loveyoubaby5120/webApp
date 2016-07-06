'use strict'

var fs = require('fs');
var _ = require('lodash');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var util = require('./util.js');


var prefix = 'https://api.weixin.qq.com/cgi-bin/';

var api = {
	accessToken: prefix + 'token?grant_type=client_credential',
	temporary: {//临时素材 https://api.weixin.qq.com/cgi-bin/media/upload?access_token=ACCESS_TOKEN&type=TYPE
		upload: prefix + 'media/upload?'
	},
	permanent: {//永久素材
		//其他素材  https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=ACCESS_TOKEN
		upload: prefix + 'material/add_material?',
		//图文素材  https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=ACCESS_TOKEN
		uploadNews: prefix + 'material/add_news?',
		//图文消息的图片 https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=ACCESS_TOKEN
		uploadNewsPic: prefix + 'media/uploadimg?',
	}
	
}

//校验json类型
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

	this.fetchAccessToken();
	
}

//获取token
Wechat.prototype.fetchAccessToken = function(data){
	var _this = this;

	if(this.access_token && this.expires_in){
		if(this.isValidAccessToken(this)){
			return Promise.resolve(this)
		}
	}

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

			return Promise.resolve(data);

		});
}


//校验token有效性
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

//更新token
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

//新增素材
Wechat.prototype.uploadMaterial = function(type, material, permanent){
	var _this = this;
	var form = {};
	var uploadUrl = api.temporary.upload;

	//如果是永久素材
	if(permanent){
		uploadUrl = api.permanent.upload;

		_.extend(form,permanent)
	}

	if(type === 'pic'){
		uploadUrl = api.permanent.uploadNewsPic;
	}

	if(type === 'news'){
		uploadUrl = api.permanent.uploadNews;
		form = material
	}
	else{
		form.media = fs.createReadStream(material)
	}


	var appID = this.appID;
	var appSecret = this.appSecret;
	
	return new Promise(function(resolve, reject){
		_this
			.fetchAccessToken()
			.then(function(data){

				var url = uploadUrl + '&access_token=' + data.access_token;

				if(!permanent){
					url += '&type=' + type;
				}
				else{
					form.access_token = data.access_token;
				}

				var options = {
					method: 'POST',
					url: url,
					json: true
				}

				if(type === 'news'){
					options.body = form;
				}
				else{
					options.formData = form;
				}

				request(options).then(function(response){
					var _data = response.body;
					console.log(_data);
					if(_data){
						resolve(_data);
					}
					else{
						throw new Error('Upload material fails');
					}
				})
				.catch(function(err){
					reject(err);
				})
			})


		
	})

}

//发送消息
Wechat.prototype.reply = function(){
	var content = this.body;
	var message = this.weixin;
	console.log('content: ',content);
	console.log('message: ',message);
	var xml = util.tpl(content, message);

	this.status = 200;
	this.type = 'application/xml';
	this.body = xml;

}

module.exports = Wechat;













