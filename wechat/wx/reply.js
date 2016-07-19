'use strict'

var config = require('../config/config.js');
var Wechat = require('../wechatApi/wechat.js');
var wechatApi = new Wechat(config.wechat);
var menu = require('./menu.js');


// wechatApi.deleteMenu().then(function(){
// 	return wechatApi.createMenu(menu);
// })
// .then(function(msg){
// 	console.log(msg);
// });

//微信被动回复
exports.reply = function *(next){
	var message = this.weixin;
	console.log('weixin: ',message);
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
		//扫码推送事件
		else if(message.Event === 'scancode_push'){
			console.log(message.ScanCodeInfo.ScanType);
			console.log(message.ScanCodeInfo.ScanResult);
			this.body = '您点击了菜单中的链接： ' + message.EventKey;
		}
		//扫码推送中
		else if(message.Event === 'scancode_waitmsg'){
			console.log(message.ScanCodeInfo.ScanType);
			console.log(message.ScanCodeInfo.ScanResult);
			this.body = '您点击了菜单中的链接： ' + message.EventKey;
		}
		//弹出系统拍照
		else if(message.Event === 'pic_sysphoto'){
			console.log(message.SendPicsInfo.PicList);
			console.log(message.SendPicsInfo.Count);
			this.body = '您点击了菜单中的链接： ' + message.EventKey;
		}
		//弹出拍照或者相册
		else if(message.Event === 'pic_photo_or_album'){
			console.log(message.SendPicsInfo.PicList);
			console.log(message.SendPicsInfo.Count);
			this.body = '您点击了菜单中的链接： ' + message.EventKey;
		}
		//微信相册发图
		else if(message.Event === 'pic_weixin'){
			console.log(message.SendPicsInfo.PicList);
			console.log(message.SendPicsInfo.Count);
			this.body = '您点击了菜单中的链接： ' + message.EventKey;
		}
		//地理位置选择
		else if(message.Event === 'location_select'){
			console.log(message.SendLocationInfo.Location_X);
			console.log(message.SendLocationInfo.Location_Y);
			console.log(message.SendLocationInfo.Scale);
			console.log(message.SendLocationInfo.Label);
			console.log(message.SendLocationInfo.Poiname);
			this.body = '您点击了菜单中的链接： ' + message.EventKey;
		}
		// //下发图片消息
		// else if(message.Event === 'media_id'){
		// 	this.body = '您点击了菜单中的链接： ' + message.EventKey;
		// }
		// //跳转图文消息的url
		// else if(message.Event === 'view_limited'){
		// 	this.body = '您点击了菜单中的链接： ' + message.EventKey;
		// }
		//群发消息
		else if(message.Event === 'MASSSENDJOBFINISH'){
			this.body = '群发消息推送信息';
		}

	}
	//接受的消息是文本类型
	else if(message.MsgType === 'text'){
		var content = message.Content;
		var reply = '您说的 ' + message.Content + '太复杂了';

		//自动回复 文本
		if(content === '1'){
			reply = '出门左转';
		}
		//自动回复 文本
		else if(content === '2'){
			reply = '找个凉快的地方待着';
		}
		//自动回复 文本
		else if(content === '3'){
			reply = '画个圈圈诅咒你';
		}
		//自动回复 图文信息
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
		//自动回复 临时素材   图片消息
		else if(content === '5'){
			var data = yield wechatApi.uploadMaterial('image', __dirname + '/../public/images/1.jpg');

			reply = {
				type: 'image',
				mediaId: data.media_id
			}
		}
		//自动回复 临时素材   视频消息
		else if(content === '6'){
			var data = yield wechatApi.uploadMaterial('video', __dirname + '/../public/video/1.mp4');

			reply = {
				type: 'video',
				title: '回复视频内容',
				description: '喷泉',
				mediaId: data.media_id
			}
		}
		//自动回复 临时素材   音乐消息
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
		//自动回复 永久素材   图片消息
		else if(content === '8'){
			var data = yield wechatApi.uploadMaterial('image', __dirname + '/../public/images/1.jpg', {type: 'image'});

			reply = {
				type: 'image',
				mediaId: data.media_id
			}
		}
		//自动回复 永久素材   视频消息
		else if(content === '9'){
			var data = yield wechatApi.uploadMaterial('video', __dirname + '/../public/video/1.mp4', {type: 'video',description: '{"title": "Really a nice place", "introduction": "Never think it so easy"}'});

			reply = {
				type: 'video',
				title: '回复视频内容',
				description: '喷泉',
				mediaId: data.media_id
			}
		}
		//自动回复 永久素材 获取素材回复素材
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
		//自动回复 永久素材 获取所有索引
		else if(content === '11'){
			var counts = yield wechatApi.countMaterial()

			console.log(JSON.stringify(counts));

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

			console.log(JSON.stringify(results));

			reply = '[ text=> 11 ] count: ' + JSON.stringify(counts);
		}
		//自动回复 分组 创建分组  查看分组 移动分组/批量移动 修改分组 删除分组
		else if(content === '12'){
			var group = yield wechatApi.createGroup('wechat');

			console.log('新分组 wechat');
			console.log(group);

			var groups = yield wechatApi.fetchGroups();

			console.log('加了 wechat 后的分组列表');
			console.log(groups);

			var group2 = yield wechatApi.checkGroup(message.FromUserName);

			console.log('查看自己的分组');
			console.log(group2);

			var result = yield wechatApi.moveGroup(message.FromUserName,100);

			console.log('单个移动到 100');
			console.log(result);

			var groups3 = yield wechatApi.fetchGroups();

			console.log('单个移动后的分组列表');
			console.log(groups3);

			var result2 = yield wechatApi.moveGroup([message.FromUserName],101);

			console.log('批量移动到 101');
			console.log(result2);

			var groups4 = yield wechatApi.fetchGroups();

			console.log('批量移动后的分组列表');
			console.log(groups4);

			var result3 = yield wechatApi.updateGroup(101,'weichat2');

			console.log('101 wechat 改名 wechat2');
			console.log(result3);

			var groups5 = yield wechatApi.fetchGroups();

			console.log('改名后的分组列表');
			console.log(groups5);

			var result4 = yield wechatApi.deleteGroup(102);

			console.log('删除 102 wechat 分组');
			console.log(result4);

			var groups6 = yield wechatApi.fetchGroups();

			console.log('删除后的分组列表');
			console.log(groups6);


			reply = 'Group done!';
		}
		//自动回复 用户详细信息
		else if(content === '13'){
			var user = yield wechatApi.fetchUsers(message.FromUserName,'en');

			console.log(user);

			var openIds = [
				{
					openid: message.FromUserName,
					lang: 'en'
				}
			];

			var users = yield wechatApi.fetchUsers(openIds);

			console.log(users);

			reply = JSON.stringify(user);
		}
		//自动回复 用户列表
		else if(content === '14'){
			var userList = yield wechatApi.listUsers();

			console.log(userList);

			reply = userList.total;
		}
		//自动回复 群发消息
		else if(content === '15'){

			var mpnews = {
				media_id: '3DOoqZ5jB-jXu8DaoUFHlywGhkzn3dt4DoPggv1WUpo'
			}

			var text= {
			  'content': 'Hello Wechat'
			};

			var msgData = yield wechatApi.sendByGroup('mpnews', mpnews, 100);

			// var msgData = yield wechatApi.sendByGroup('text', text, 100);

			console.log(msgData);

			reply = 'Yeah!'
		}
		//自动回复 预览群发消息
		else if(content === '16'){

			var mpnews = {
				media_id: '3DOoqZ5jB-jXu8DaoUFHlywGhkzn3dt4DoPggv1WUpo'
			}

			var text= {
			  'content': 'Hello Wechat'
			};

			var msgData = yield wechatApi.previewMass('mpnews', mpnews, 'oSoRTwf-gKfinier-vPVQk3MHtqw');

			// var msgData = yield wechatApi.previewMass('text', text, 'oSoRTwf-gKfinier-vPVQk3MHtqw');

			console.log(msgData);

			reply = 'Yeah!'
		}
		//自动回复 查询群发消息发送状态
		else if(content === '17'){
			var msgData = yield wechatApi.checkMass('3147483667');

			console.log(msgData);

			reply = 'Yeah!'
		}
		//自动回复 创建二维码
		else if(content === '18'){
			//临时
			var tempQr = {
				expire_seconds: 604800,
				action_name: 'QR_SCENE',
				action_info: {
					"scene": {
						"scene_id": 123
					}
				}
			}


			//永久
			var permQr = {
				action_name: 'QR_LIMIT_SCENE',
				action_info: {
					"scene": {
						"scene_id": 123
					}
				}
			}

			var permStrQr = {
				action_name: 'QR_LIMIT_STR_SCENE',
				action_info: {
					"scene": {
						"scene_str": '123'
					}
				}
			}


			var qr1 = yield wechatApi.createQrcode(tempQr);

			var qr2 = yield wechatApi.createQrcode(permQr);

			var qr3 = yield wechatApi.createQrcode(permStrQr);

			console.log(qr1);

			reply = 'Yeah hah!';
		}
		//自动回复 长链接转短链接接口
		else if(content === '19'){
			var longURL= 'http://www.imooc.com';

			var shortData = yield wechatApi.createShorturl(null, longURL);
			console.log(shortData);
			reply = shortData.short_url;
		}
		this.body = reply;
	}
	//接受的消息是图片类型
	else if(message.MsgType === 'image'){
		this.body = '图片消息';
	}
	//接受的消息是语音类型
	else if(message.MsgType === 'voice'){
		this.body = '语音消息';
	}
	//接受的消息是视频类型
	else if(message.MsgType === 'video'){
		this.body = '视频消息';
	}
	//接受的消息是小视频类型
	else if(message.MsgType === 'shortvideo'){
		this.body = '小视频消息';
	}
	//接受的消息是地理位置类型
	else if(message.MsgType === 'location'){
		this.body = '地理位置消息';
	}
	//接受的消息是链接类型
	else if(message.MsgType === 'link'){
		this.body = '链接消息';
	}
	else{
		this.body = '无法识别的消息类型';	
	}
	yield next;

}