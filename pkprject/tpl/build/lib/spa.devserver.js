module.exports = function(webpackConfig, projectKey, domainprefix) {
    domainprefix = domainprefix || projectKey;
    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');
    var config = webpackConfig;
    var PORT = 3300;

    config.entry.app.unshift(
        'webpack-dev-server/client?http://localhost:3300',
        'webpack/hot/only-dev-server');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.devtool = 'cheap-eval-source-map';

    console.log(config);

    function proxyConfig(host) {
        return {
            target: {
                'host': host,
                'protocol': 'http:',
                'port': 8000,
            },
            changeOrigin: true,
            secure: false,
        };
    }

    new WebpackDevServer(webpack(config), {
        hot: true,
        publicPath: '/dist/',
        historyApiFallback: {
            rewrites: [{
                    from: /\/dist\/|favicon\.ico/,
                    to: function(context) {
                        return context.parsedUrl.pathname;
                    },
                },
                {
                    from: /\.hot-update\.json$/,
                    to: function(context) {
                        console.log(context);
                        return context.parsedUrl.pathname;
                    },
                },
                {
                    from: /\.hot-update\.js$/,
                    to: function(context) {
                        return context.parsedUrl.pathname;
                    },
                },
                { from: /./, to: 'tpl/' + projectKey + '/index.devserver.html' },
            ],
        },
        stats: { colors: true },
        proxy: {
            '/ajax': proxyConfig(domainprefix + '.local.applysquare.net'),
            '/file': proxyConfig(domainprefix + '.local.applysquare.net'),
            '/static': proxyConfig('www.local.applysquare.net'),
        },
        setup: function(app) {
            app.use(function(req, res, next) {
                console.log('Using middleware for ' + req.url);
                // This removes the old csrftoken of the given path.
                var cookie = res.getHeader('Set-Cookie') || [];
                if (!Array.isArray(cookie)) {
                    cookie = [cookie];
                }
                if (req.url !== '/') {
                    cookie.push('csrftoken=; path=' + req.url + '; expires=' + new Date(0).toUTCString());
                }
                res.setHeader('Set-Cookie', cookie);
                next();
            });
        },
    }).listen(PORT, function(err, result) {
        if (err) {
            console.log(err, result);
        }

        console.log('Listening at http://localhost:' + PORT);
    });
};
