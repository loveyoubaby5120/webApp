var spaWebpack = require('../lib/spa.webpack.js');
var devserver = require('../lib/spa.devserver.js');

var config = spaWebpack('saas/app/questionnaireClient', true);
devserver(config, 'saas/app/questionnaireClient', 'minghu.saas');