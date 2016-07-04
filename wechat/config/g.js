
var sha1 = require('sha1');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

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
				// Promise.resolve(data);
				return data;
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


module.exports = function(opts){

	var wechat = new Wechat(opts);


	return function *(next){
	    console.log(this.query);
	    
	    var token = opts.token;
	    var signature = this.query.signature;
	    var nonce = this.query.nonce;
	    var timestamp = this.query.timestamp;
	    var echostr = this.query.echostr;
	    var str = [token, timestamp, nonce].sort().join('');
	    var sha = sha1(str);
	    
	    if(sha === signature){
	        this.body = echostr + '';
	    }
	    else{
	        this.body = 'wrong';
	    }
	}
}
