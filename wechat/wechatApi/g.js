'use strict'

var sha1 = require('sha1');
var getRawBoby = require('raw-body');
var Wechat = require('./wechat.js');
var util = require('./util.js');

module.exports = function(opts, handler){

	//校验token
	var wechat = new Wechat(opts);


	return function *(next){
	    var _this = this;
	    
	    var token = opts.token;
	    var signature = this.query.signature;
	    var nonce = this.query.nonce;
	    var timestamp = this.query.timestamp;
	    var echostr = this.query.echostr;
	    var str = [token, timestamp, nonce].sort().join('');
	    var sha = sha1(str);
	    
	    //验证微信通信
	    if(this.method === 'GET'){
		    if(sha === signature){
		        this.body = echostr + '';
		    }
		    else{
		        this.body = 'wrong';
		    }
	    }
	    else if(this.method === 'POST'){
	    	if(sha != signature){
		        this.body = 'wrong';
		        return false;
		    }

		    var data = yield getRawBoby(this.req,{
		    	length: this.length,
		    	limit: '1mb',
		    	encoding: this.charset
		    });

		    //得到消息内容
		    var content = yield util.parseXMLAsync(data);

		    //格式化消息内容
		    var message = util.formatMessage(content.xml);

		    this.weixin = message;

		    //设置被动回复内容
		    yield handler.call(this, next);

		    //回复消息
		    wechat.reply.call(this);

	    }

	}
}
