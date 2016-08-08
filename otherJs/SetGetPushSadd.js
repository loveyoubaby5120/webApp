var client = require('./redisClient');

// Object.prototype.toString = function(){
// 	return JSON.stringify(this);
// }


// client.set('hello','this is redis');


// client.set('text',{a:1,b:2}.toString);

// client.get('hello',function(err,v){
// 	console.log('redits get hello err, v', err, v,typeof v);
// });

// client.get('text',function(err,v){
// 	console.log('redits get hello err, v', err, v,typeof v);
// });



client.rpush('textLists','a');
client.rpush('textLists','b');
client.rpush('textLists','c');
client.rpush('textLists','1');
client.lpush('textLists','2');


client.lpop('textLists',function(err,v){
	console.log('client.lpop, err, v', err, v);
});


client.rpop('textLists',function(err,v){
	console.log('client.rpop, err, v', err, v);
});


client.lrange('textLists',0,-1,function(err,v){
	console.log('client.lrange, err, v', err, v);
});



client.sadd('testSet',1);
client.sadd('testSet','a');
client.sadd('testSet','b');

client.smembers('testSet',function(err,v){
	console.log('client.smembers err, v', err, v);
});






