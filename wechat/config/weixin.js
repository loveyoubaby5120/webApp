'use strict'

exports.reply = function *(next){
	var message = this.weixin;

	if(message.MsgType === 'event'){
		if(message.Event === 'subscribe'){
			if(message.EventKey){
				console.log('扫二维码进入' + message.EventKey + message.ticket);
			}
			this.body = '恭喜你订阅了这个号\r\n';
		}
		else if(message.Event === 'unsubscribe'){
			console.log('取关');
			this.body = '取关';
		}
		else if(message.Event === 'LOCATION'){
			this.body = '您上报的位置是： ' + message.Latitude + '/' + message.Longitude + '-' + message.Precision;
		}
		else if(message.Event === 'CLICK'){
			this.body = '您点击了菜单： '+ message.EventKey;
		}
		else if(message.Event === 'SCAN'){
			consloe.log('关注后扫二维码: ' + message.EventKey + message.ticket);
			this.body = '您扫描了一张二维码';
		}
		else if(message.Event === 'VIEW'){
			this.body = '您点击了菜单中的链接： ' + message.EventKey;
		}

	}
	else if(message.MsgType === 'text'){
		var content = message.Content;
		var reply = '您说的 ' + message.Content + '太复杂了';

		if(content === '1'){
			reply = '出门左转';
		}
		else if(content === '2'){
			reply = '逛逛淘宝';
		}
		else if(content === '3'){
			reply = '找个凉快的地方待着';
		}
		else if(content === '4'){
			reply = '画个圈圈诅咒你';
		}
		else if(content === '5'){
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


		this.body = reply;
	}

	yield next;

}