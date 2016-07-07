'use strict'

var fs = require('fs');
var _ = require('lodash');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var util = require('./util.js');


var prefix = 'https://api.weixin.qq.com/cgi-bin/';

var api = {
	accessToken: prefix + 'token?grant_type=client_credential',
	temporary: {//临时素材

		//新增
		//https://api.weixin.qq.com/cgi-bin/media/upload?access_token=ACCESS_TOKEN&type=TYPE
		upload: prefix + 'media/upload?',

		//获取
		//https://api.weixin.qq.com/cgi-bin/media/get?access_token=ACCESS_TOKEN&media_id=MEDIA_ID
		fetch: prefix + 'media/get?'
	},
	permanent: {//永久素材

		//新增
		//其他素材  https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=ACCESS_TOKEN
		upload: prefix + 'material/add_material?',
		//图文素材  https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=ACCESS_TOKEN
		uploadNews: prefix + 'material/add_news?',
		//图文消息的图片 https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=ACCESS_TOKEN
		uploadNewsPic: prefix + 'media/uploadimg?',
		
		//获取
		//https://api.weixin.qq.com/cgi-bin/material/get_material?access_token=ACCESS_TOKEN
		fetch: prefix + 'material/get_material?',

		//删除
		//https://api.weixin.qq.com/cgi-bin/material/del_material?access_token=ACCESS_TOKEN
		del: prefix + 'material/del_material?',

		//更新
		//https://api.weixin.qq.com/cgi-bin/material/update_news?access_token=ACCESS_TOKEN
		update: prefix + 'material/update_news?',
		
		//素材总数
		//https://api.weixin.qq.com/cgi-bin/material/get_materialcount?access_token=ACCESS_TOKEN
		count: prefix + 'material/get_materialcount?',

		//素材列表
		//https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=ACCESS_TOKEN
		batch: prefix + 'material/batchget_material?',

	},
	group:{//分组

		//创建分组
		//https://api.weixin.qq.com/cgi-bin/groups/create?access_token=ACCESS_TOKEN
		create: prefix + 'groups/create?',

		//查询所有分组
		//https://api.weixin.qq.com/cgi-bin/groups/get?access_token=ACCESS_TOKEN
		fetch: prefix + 'groups/get?',

		//查询用户所在分组
		//https://api.weixin.qq.com/cgi-bin/groups/getid?access_token=ACCESS_TOKEN
		check: prefix + 'groups/getid?',

		//修改分组名
		//https://api.weixin.qq.com/cgi-bin/groups/update?access_token=ACCESS_TOKEN
		update: prefix + 'groups/update?',

		//移动用户分组
		//https://api.weixin.qq.com/cgi-bin/groups/members/update?access_token=ACCESS_TOKEN
		move: prefix + 'groups/members/update?',

		//批量移动用户分组
		//https://api.weixin.qq.com/cgi-bin/groups/members/batchupdate?access_token=ACCESS_TOKEN
		batchupdate: prefix + 'groups/members/batchupdate?',

		//删除分组
		//https://api.weixin.qq.com/cgi-bin/groups/delete?access_token=ACCESS_TOKEN
		del: prefix + 'groups/delete?',
	},
	user:{//用户管理

		//设置备注名
		//https://api.weixin.qq.com/cgi-bin/user/info/updateremark?access_token=ACCESS_TOKEN
		remark: prefix + 'user/info/updateremark?',

		//获取用户信息
		//https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
		fetch: prefix + 'user/info?',

		//批量获取用户信息
		//https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token=ACCESS_TOKEN
		batchFetch: prefix + 'user/info/batchget?',
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

//获取素材
Wechat.prototype.fetchMaterial = function(mediaId, type, permanent){
	var _this = this;
	var form = {};
	var fetchUrl = api.temporary.fetch;

	//如果是永久素材
	if(permanent){
		fetchUrl = api.permanent.fetch;
	}


	return new Promise(function(resolve, reject){
		_this
			.fetchAccessToken()
			.then(function(data){

				var url = fetchUrl + '&access_token=' + data.access_token;

				var options = {
					method: 'POST',
					url: url,
					json: true
				}


				if(permanent){
					form.media_id = mediaId;
					form.access_token = data.access_token;
					options.body = form
				}
				else{
					if(type === 'video'){
						url = url .replace('https://', 'http://');
					}
					url += '&media_id=' + mediaId;
				}


				if(type === 'news' || type === 'video'){
					request(options).then(function(response){
						var _data = response.body;

						if(_data){
							resolve(_data);
						}
						else{
							throw new Error('Fetch material fails');
						}
					})
					.catch(function(err){
						reject(err);
					})
				}
				else{
					resolve(url);
				}

			})
		
	})
}

//删除素材
Wechat.prototype.deleteMaterial = function(mediaId){
	var _this = this;
	var form = {
		media_id: mediaId
	};
	var fetchUrl = api.permanent.del;

	return new Promise(function(resolve, reject){
		_this
			.fetchAccessToken()
			.then(function(data){

				var url = fetchUrl + '&access_token=' + data.access_token + '&media_id=' + mediaId;

				var options = {
					method: 'POST',
					url: url,
					json: true
				};

				options.body = form;

				request(options).then(function(response){
					var _data = response.body;

					if(_data){
						resolve(_data);
					}
					else{
						throw new Error('Delete material fails');
					}
				})
				.catch(function(err){
					reject(err);
				})

			})
		
	})
}

//修改素材
Wechat.prototype.updateMaterial = function(mediaId, news){
	var _this = this;
	var form = {
		media_id: mediaId
	};

	_.extend(form, news)

	var fetchUrl = api.permanent.update;

	return new Promise(function(resolve, reject){
		_this
			.fetchAccessToken()
			.then(function(data){

				var url = fetchUrl + '&access_token=' + data.access_token + '&media_id=' + mediaId;

				var options = {
					method: 'POST',
					url: url,
					json: true
				};

				options.body = form;

				request(options).then(function(response){
					var _data = response.body;

					if(_data){
						resolve(_data);
					}
					else{
						throw new Error('Update material fails');
					}
				})
				.catch(function(err){
					reject(err);
				})

			})
		
	})
}

//获取素材总数
Wechat.prototype.countMaterial = function(){
	var _this = this;


	var fetchUrl = api.permanent.count;

	return new Promise(function(resolve, reject){
		_this
			.fetchAccessToken()
			.then(function(data){

				var url = fetchUrl + '&access_token=' + data.access_token;

				var options = {
					method: 'GET',
					url: url,
					json: true
				};

				request(options).then(function(response){
					var _data = response.body;

					if(_data){
						resolve(_data);
					}
					else{
						throw new Error('Count material fails');
					}
				})
				.catch(function(err){
					reject(err);
				})

			})
		
	})
}

//获取素材列表
Wechat.prototype.batchMaterial = function(options){
	var _this = this;

	options.type = options.type || 'image';
	options.offset = options.offset || 0;
	options.count = options.count || 1;

	var fetchUrl = api.permanent.batch;

	return new Promise(function(resolve, reject){
		_this
			.fetchAccessToken()
			.then(function(data){

				var url = fetchUrl + '&access_token=' + data.access_token;

				var _options = {
					method: 'POST',
					url: url,
					json: true
				};

				_options.body = options;

				request(_options).then(function(response){
					var _data = response.body;

					if(_data){
						resolve(_data);
					}
					else{
						throw new Error('Batch material fails');
					}
				})
				.catch(function(err){
					reject(err);
				})

			})
		
	})
}




//创建分组
Wechat.prototype.createGroup = function(name){
	var _this = this;

	var fetchUrl = api.group.create;

	return new Promise(function(resolve, reject){
		_this
			.fetchAccessToken()
			.then(function(data){

				var url = fetchUrl + '&access_token=' + data.access_token;

				var _options = {
					method: 'POST',
					url: url,
					json: true
				};

				var form = {
					group: {
						name: name
					}
				};


				_options.body = form;

				request(_options).then(function(response){
					var _data = response.body;

					if(_data){
						resolve(_data);
					}
					else{
						throw new Error('Create group fails');
					}
				})
				.catch(function(err){
					reject(err);
				})

			})
		
	})
}

//获取所有分组
Wechat.prototype.fetchGroups = function(){
	var _this = this;

	var fetchUrl = api.group.fetch;

	return new Promise(function(resolve, reject){
		_this
			.fetchAccessToken()
			.then(function(data){

				var url = fetchUrl + '&access_token=' + data.access_token;

				var _options = {
					method: 'GET',
					url: url,
					json: true
				};

				_options.body = {
				};

				request(_options).then(function(response){
					var _data = response.body;

					if(_data){
						resolve(_data);
					}
					else{
						throw new Error('Fetch group fails');
					}
				})
				.catch(function(err){
					reject(err);
				})

			})
		
	})
}

//查询用户所在分组
Wechat.prototype.checkGroup = function(openId){
	var _this = this;

	var fetchUrl = api.group.check;

	return new Promise(function(resolve, reject){
		_this
			.fetchAccessToken()
			.then(function(data){

				var url = fetchUrl + '&access_token=' + data.access_token;

				var _options = {
					method: 'POST',
					url: url,
					json: true
				};

				var form = {
					openid: openId
				};

				_options.body = form;

				request(_options).then(function(response){
					var _data = response.body;

					if(_data){
						resolve(_data);
					}
					else{
						throw new Error('Check group fails');
					}
				})
				.catch(function(err){
					reject(err);
				})

			})
		
	})
}

//修改分组名
Wechat.prototype.updateGroup = function(id, name){
	var _this = this;

	var fetchUrl = api.group.update;

	return new Promise(function(resolve, reject){
		_this
			.fetchAccessToken()
			.then(function(data){

				var url = fetchUrl + '&access_token=' + data.access_token;

				var _options = {
					method: 'POST',
					url: url,
					json: true
				};

				var form = {
					group: {
						id: id,
						name: name
					}
				};

				_options.body = form;

				request(_options).then(function(response){
					var _data = response.body;

					if(_data){
						resolve(_data);
					}
					else{
						throw new Error('Update group fails');
					}
				})
				.catch(function(err){
					reject(err);
				})

			})
		
	})
}

//移动用户分组/批量移动用户分组
Wechat.prototype.moveGroup = function(openIds,to){
	var _this = this;

	var fetchUrl = api.group.move;

	var form = {
		to_groupid: to
	};

	if(_.isArray(openIds)){
		fetchUrl = api.group.batchupdate;
		form.openid_list = openIds;
	}
	else{
		form.openid = openIds;
	}


	return new Promise(function(resolve, reject){
		_this
			.fetchAccessToken()
			.then(function(data){

				var url = fetchUrl + '&access_token=' + data.access_token;

				var _options = {
					method: 'POST',
					url: url,
					json: true
				};


				_options.body = form;

				request(_options).then(function(response){
					var _data = response.body;

					if(_data){
						resolve(_data);
					}
					else{
						throw new Error('Batchupdate group fails');
					}
				})
				.catch(function(err){
					reject(err);
				})

			})
		
	})
}

//删除分组
Wechat.prototype.deleteGroup = function(id){
	var _this = this;

	var fetchUrl = api.group.del;

	return new Promise(function(resolve, reject){
		_this
			.fetchAccessToken()
			.then(function(data){

				var url = fetchUrl + '&access_token=' + data.access_token;

				var _options = {
					method: 'POST',
					url: url,
					json: true
				};

				var form = {
					group: {
						id: id
					}
				};

				_options.body = form;

				request(_options).then(function(response){
					var _data = response.body;

					if(_data){
						resolve(_data);
					}
					else{
						throw new Error('Delete group fails');
					}
				})
				.catch(function(err){
					reject(err);
				})

			})
		
	})
}




//设置备注名
Wechat.prototype.remarkUser = function(openId, remark){
	var _this = this;

	var fetchUrl = api.user.remark;

	return new Promise(function(resolve, reject){
		_this
			.fetchAccessToken()
			.then(function(data){

				var url = fetchUrl + '&access_token=' + data.access_token;

				var _options = {
					method: 'POST',
					url: url,
					json: true
				};

				var form = {
					group: {
						openid: openId,
						remark: remark
					}
				};

				_options.body = form;

				request(_options).then(function(response){
					var _data = response.body;

					if(_data){
						resolve(_data);
					}
					else{
						throw new Error('remark user fails');
					}
				})
				.catch(function(err){
					reject(err);
				})

			})
		
	})
}

//获取用户信息/批量获取
Wechat.prototype.fetchUsers = function(openIds, lang){
	var _this = this;

	lang = lang || 'zh_CN';

	var url = '';
	var fetchUrl = api.user.fetch;
	var method = 'GET';

	var form = {};

	if(_.isArray(openIds)){

		fetchUrl = api.user.batchFetch;
		url = fetchUrl + '&access_token=' + data.access_token;

		form.user_list = openIds;

		method = 'POST';
	}
	else{
		
		url = fetchUrl + '&access_token=' + data.access_token + '&openid=' + openIds + '&lang=' + lang;
	}

	return new Promise(function(resolve, reject){
		_this
			.fetchAccessToken()
			.then(function(data){

				

				var _options = {
					method: method,
					url: url,
					json: true
				};

				_options.body = form;

				request(_options).then(function(response){
					var _data = response.body;

					if(_data){
						resolve(_data);
					}
					else{
						throw new Error('batchFetch user fails');
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













