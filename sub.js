var client = require('./redisClient');

client.subscribe('testPublish');

client.on('message',function(channel, msg){
	console.log('client on message, channel:', msg, 'message:', msg);
});