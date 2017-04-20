var path = require('path');
var common = require('../common.js');
var webpack = require('webpack');
var isProduction = process.env.NODE_ENV == 'production';
var projectRoot = path.join(__dirname, '../../../');

function isExternal(module) {
    var userRequest = module.userRequest;

    if (typeof userRequest !== 'string') {
        return false;
    }
    return userRequest.indexOf('node_modules') >= 0;
}

module.exports = function(projectKey, dev) {
    var tsLoaders = ['babel?cacheDirectory', 'ts-loader'];
    if (dev) {
        tsLoaders.unshift('react-hot');
    }
    var output = {
        path: common.tplRoot,
        publicPath: '/dist/',
        filename: 'app.js',
    };

    var plugins = [
        new webpack.DefinePlugin({
            PRODUCTION: isProduction,
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: function(module) {
                return isExternal(module);
            },
        }),
    ];

    if (!dev) {
        output = {
            path: path.join(common.distRoot, projectKey, '[hash]'),
            publicPath: '/dist/[hash]',
            filename: 'app.js',
        };

        plugins.push(
            function() {
                this.plugin('done', function(stats) {
                    require('fs').writeFileSync(
                        path.join(common.distRoot, projectKey, 'asset.json'),
                        JSON.stringify({
                            hash: stats.hash,
                        })
                    );
                });
            });
    }

    if (isProduction) {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                },
            })
        );
    }

    return {
        entry: {
            app: [
                path.join(common.tplRoot, 'common', 'error_display.exec.js'),
                path.join(common.tplRoot, projectKey, 'index.tsx'),
            ],
        },
        output: output,
        module: {
            loaders: [{
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                loaders: tsLoaders,
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loaders: ['babel?cacheDirectory'],
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.sass$/,
                loader: 'style-loader!css-loader!sass-loader?indentedSyntax&sourceMap&includePaths[]=' + (path.resolve(projectRoot, 'node_modules/compass-mixins/lib')),
            },
            {
                test: 'bootstrap',
                loader: 'imports?jQuery=jquery',
            },
            {
                test: /\.json$/,
                loader: 'json',
            },
            ],
        },
        resolve: {
            root: path.resolve(common.tplRoot),
            extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
        },
        plugins: plugins,
    };
};