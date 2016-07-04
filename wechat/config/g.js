
var sha1 = require('sha1');

var config = {
    wechat:{
        appID: 'wx6cf67cf776e6aae4',
        appSecret: '2ccb2200e737bbe5f75a086e780e0822',
        token: 'loveyoubaby5120'
    }
};



module.exports = function(opts){
	return function *(next){
	    console.log(this.query);
	    
	    var token = config.wechat.token;
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
