var spaWebpack = require('../lib/spa.webpack.js');
var devserver = require('../lib/spa.devserver.js');

var config = spaWebpack('saas/app/gaokao', true);
devserver(config, 'saas/app/gaokao', 'minghu.saas');