var spaWebpack = require('../lib/spa.webpack.js');
var devserver = require('../lib/spa.devserver.js');

var config = spaWebpack('saas/app/entrance', true);
devserver(config, 'saas/app/entrance', 'minghu.saas');