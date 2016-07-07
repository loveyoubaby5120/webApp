'use strict'

var config = require('./config.js');
var Wechat = require('./wechat/wechat.js');
var wechatApi = new Wechat(config.wechat);

//微信被动回复
exports.reply = function *(next){
	var message = this.weixin;

	//判断消息类型
	//接受到的消息是事件类型
	if(message.MsgType === 'event'){
		//订阅
		if(message.Event === 'subscribe'){
			if(message.EventKey){
				console.log('扫二维码进入' + message.EventKey + message.ticket);
			}
			this.body = '恭喜你订阅了这个号\r\n';
		}
		//取消订阅
		else if(message.Event === 'unsubscribe'){
			console.log('取关');
			this.body = '取关';
		}
		//获取位置
		else if(message.Event === 'LOCATION'){
			this.body = '您上报的位置是： ' + message.Latitude + '/' + message.Longitude + '-' + message.Precision;
		}
		//点击菜单
		else if(message.Event === 'CLICK'){
			this.body = '您点击了菜单： '+ message.EventKey;
		}
		//扫描二维码
		else if(message.Event === 'SCAN'){
			consloe.log('关注后扫二维码: ' + message.EventKey + message.ticket);
			this.body = '您扫描了一张二维码';
		}
		//点击菜单中链接
		else if(message.Event === 'VIEW'){
			this.body = '您点击了菜单中的链接： ' + message.EventKey;
		}

	}
	//接受的消息是文本类型
	else if(message.MsgType === 'text'){
		var content = message.Content;
		var reply = '您说的 ' + message.Content + '太复杂了';

		//自动回复文本
		if(content === '1'){
			reply = '出门左转';
		}
		//自动回复文本
		else if(content === '2'){
			reply = '找个凉快的地方待着';
		}
		//自动回复文本
		else if(content === '3'){
			reply = '画个圈圈诅咒你';
		}
		//自动回复图文信息
		else if(content === '4'){
			reply = [{
				title: '技术改变世界',
				description: '只是个描述而已',
				picUrl: 'http://img07.huishangbao.com/file/upload/201509/26/11/11-41-26-14-335479.jpg',
				url: 'https://github.com/'
			},{
				title: '陌陌',
				description: '只是个描述而已',
				picUrl: 'http://h.hiphotos.baidu.com/image/h%3D200/sign=4e835c604dc2d562ed08d7edd71090f3/6609c93d70cf3bc768863fecd300baa1cd112a28.jpg',
				url: 'http://www.baidu.com/'
			}
			];
		}
		//自动回复临时素材   图片消息
		else if(content === '5'){
			var data = yield wechatApi.uploadMaterial('image', __dirname + '/../public/images/1.jpg');

			reply = {
				type: 'image',
				mediaId: data.media_id
			}
		}
		//自动回复临时素材   视频消息
		else if(content === '6'){
			var data = yield wechatApi.uploadMaterial('video', __dirname + '/../public/video/1.mp4');

			reply = {
				type: 'video',
				title: '回复视频内容',
				description: '喷泉',
				mediaId: data.media_id
			}
		}
		//自动回复临时素材   音乐消息
		else if(content === '7'){
			var data = yield wechatApi.uploadMaterial('image', __dirname + '/../public/images/1.jpg');

			reply = {
				type: 'music',
				title: '回复音乐内容',
				description: '早睡身体好',
				musicUrl: 'http://pankai.localtunnel.me/music/1.mp3',
				thumbMediaId: data.media_id,
				mediaId: data.media_id
			}
		}
		//自动回复永久素材   图片消息
		else if(content === '8'){
			var data = yield wechatApi.uploadMaterial('image', __dirname + '/../public/images/1.jpg', {type: 'image'});

			reply = {
				type: 'image',
				mediaId: data.media_id
			}
		}
		//自动回复永久素材   视频消息
		else if(content === '9'){
			var data = yield wechatApi.uploadMaterial('video', __dirname + '/../public/video/1.mp4', {type: 'video',description: '{"title": "Really a nice place", "introduction": "Never think it so easy"}'});

			reply = {
				type: 'video',
				title: '回复视频内容',
				description: '喷泉',
				mediaId: data.media_id
			}
		}
		//自动回复永久素材 获取素材回复素材
		else if(content === '10'){
			var picData = yield wechatApi.uploadMaterial('image', __dirname + '/../public/images/1.jpg', {});

			var media = {
				articles: [{
					title: '标题',
					thumb_media_id: picData.media_id,
					author: '作者',
					digest: '摘要',
					show_cover_pic: 1,
					content: '内容',
					content_source_url: 'https://github.com',
				},
				{
					title: '标题2',
					thumb_media_id: picData.media_id,
					author: '作者2',
					digest: '摘要2',
					show_cover_pic: 1,
					content: '内容2',
					content_source_url: 'https://github.com',
				}
				]
			}

			data = yield wechatApi.uploadMaterial('news', media, {});
			data = yield wechatApi.fetchMaterial(data.media_id, 'news', {});

			console.log(data);

			var items = data.news_item;
			var news = [];

			
			items.forEach(function(obj){
				news.push({
					title: obj.title,
					decription: obj.digest,
					picUrl: picData.url,
					url: obj.url
				});
			});

			reply = news;
		}
		//自动回复永久素材 获取所有索财
		else if(content === '11'){
			var counts = yield wechatApi.countMaterial()


			var results = yield [
				wechatApi.batchMaterial({
					type: 'image',
					offset: 0,
					count: 10
				}),
				wechatApi.batchMaterial({
					type: 'video',
					offset: 0,
					count: 10
				}),
				wechatApi.batchMaterial({
					type: 'voice',
					offset: 0,
					count: 10
				}),
				wechatApi.batchMaterial({
					type: 'news',
					offset: 0,
					count: 10
				})
			]


			reply = '[ text=>11 ] count: ' + JSON.stringify(counts);
		}

		this.body = reply;
	}

	yield next;

}