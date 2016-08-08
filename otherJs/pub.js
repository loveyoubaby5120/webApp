var client = require('./redisClient');

client.publish('testPublish','message from pub.js');