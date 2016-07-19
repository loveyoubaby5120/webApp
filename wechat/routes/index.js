var crypto = require('crypto');
var config = require('../config/config.js');
var Wechat = require('../wechatApi/wechat.js');
var wechatApi = new Wechat(config.wechat);


var Router = require('koa-router');
var router = new Router();


//随机字符串
var createNonce = function(){
	return Math.random().toString(36).substr(2, 15);
}

//时间戳
var createTimestamp = function(){
	return parseInt(new Date().getTime() / 1000, 10) + '';
}

function _sign(noncestr, ticket, timestamp, url){
	var params = [
		'noncestr=' + noncestr,
		'jsapi_ticket=' + ticket,
		'timestamp=' + timestamp,
		'url=' + url
	];

	var str = params.sort().join('&');
	var shasum = crypto.createHash('sha1');

	shasum.update(str);

	return shasum.digest('hex');
}

//生成票据
function sign(ticket, url){
	var noncestr = createNonce();
	var timestamp = createTimestamp();
	var signature = _sign(noncestr, ticket, timestamp, url);

	return {noncestr: noncestr, timestamp: timestamp, signature: signature};
}

router.get('/index(\/.*)*', function *(next) {
	var data = yield wechatApi.fetchAccessToken();
	var access_token = data.access_token;

	var ticketData = yield wechatApi.fetchTicket(access_token);
	var ticket = ticketData.ticket;

	var url = this.href;
	var params = sign(ticket, url);

	yield this.render('index', { title: '数絮科技', layout: false, params: params, appId: config.wechat.appID});
});

module.exports = router;
