'use strict'

var fs = require('fs');
var Promise = require('bluebird');

//读取token
exports.readFileAsync = function(fpath, encoding){
	return new Promise(function(resolve, reject){
		fs.readFile(fpath, encoding, function(err, content){
			console.log()
			if(err) reject(err)
			else resolve(content)
		});
	});
}

//写入token
exports.writeFileAsync = function(fpath, content){
	return new Promise(function(resolve, reject){
		fs.writeFile(fpath, content, function(err){
			if(err) reject(err)
			else resolve()
		});
	});
}