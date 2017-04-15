var spaWebpack = require('../lib/spa.webpack.js');
var devserver = require('../lib/spa.devserver.js');

var config = spaWebpack('saas/app/survey', true);
devserver(config, 'saas/app/survey', 'minghu.saas');