var mongoose = require('mongoose');

var WeChatSchema = new mongoose.Schema({
	wx_nickname: String,
	wx_name: String,
	createTime: {
		type: Date,
		default: Date.now
	}
});


var News = mongoose.model("WeChat",WeChatSchema);