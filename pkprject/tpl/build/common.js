var path = require('path');
var file = require('file');
var webpack = require('webpack');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var projectRoot = path.join(__dirname, '../../');
var tplRoot = path.join(projectRoot, 'tpl/');
var distRoot = path.join(projectRoot, 'dist/');

var isProduction = process.env.NODE_ENV == 'production';

// creates a webpack config.
function createConfig(name, dir, config) {
    var entries = {};
    file.walkSync(path.join(tplRoot, dir), function(dirPath, _, files) {
        var relDirPath = dirPath.slice(tplRoot.length);
        files.forEach(function(f) {
            var m = f.match('^(page_.*)\.[tj]sx?$');
            if (!m) {
                return;
            }
            entries[path.join(relDirPath, m[1])] = [path.join(tplRoot, 'common/error_display.exec.js'), 'babel-polyfill', path.join(dirPath, f)];
        });
    });

    var plugins = [
        new DefinePlugin({
            PRODUCTION: isProduction,
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        new CommonsChunkPlugin({
            name: name + '_common',
            filename: 'common.js',
            minChunks: 2,
        }),
    ];
    if (config.extractCSS) {
        plugins.push(
      new ExtractTextPlugin(name + '.css', {
          allChunks: true,
      })
    );
    }

    plugins.push(
        function() {
            this.plugin('done', function(stats) {
                require('fs').writeFileSync(
                  path.join(distRoot, name, 'asset.json'),
                  JSON.stringify({
                      hash: isProduction ? stats.hash : 'devhash',
                  })
                );
            });
        });

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
        entry: entries,
        output: {
            path: isProduction ?
                path.join(distRoot, name, '[hash]')
                : path.join(distRoot, name, 'devhash'),
            filename: '[name].bundle.js',
            chunkFilename: '[id].chunk.js',
        },
        plugins: plugins,
        module: {
            loaders: [
                // the optional 'runtime' transformer tells babel to require the runtime
                // instead of inlining it.
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                },
                (function() {
                    if (config.extractCSS) {
                        return [
                            {
                                test: /\.noextract\.css$/,
                                exclude: /node_modules/,
                                loader: 'style-loader!css-loader',
                            },
                            {
                                test: /\.css$/,
                                loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
                            },
                            {
                                test: /\.sass$/,
                                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?indentedSyntax&sourceMap&includePaths[]=' + (path.resolve(projectRoot, 'node_modules/compass-mixins/lib'))),
                            },
                        ];
                    }

                    return {
                        test: /\.css$/,
                        loader: 'style-loader!css-loader',
                    };
                })(),
                {
                    test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                    exclude: /node_modules/,
                    loader: 'file-loader',
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loaders: ['babel', 'ts-loader'],
                },
            ],
        },
        externals: {
            //don't bundle the 'react' npm package with our bundle.js
            //but get it from a global 'React' variable
            // react: 'React',
            // 'react/addons': 'React',
            jquery: 'jQuery',
            jsoneditor: 'JSONEditor',
        },
        resolve: {
            root: path.resolve(tplRoot),
            extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
        },
    };
}

module.exports = {
    createConfig: createConfig,
    tplRoot: tplRoot,
    distRoot: distRoot,
};
