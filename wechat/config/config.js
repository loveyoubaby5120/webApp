var config = null;

if(process && process.env && process.env.NODE_ENV){
	config = require('./env/' + process.env.NODE_ENV + '.js');
}else{
	config = require('./env/development.js');
	// config = require('./env/loveyoubaby5120.js');
	// config = require('./env/shuxu.js');
}


module.exports = config;

