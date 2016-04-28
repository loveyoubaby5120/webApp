var webpack = require('webpack');
var path = require('path');
//压缩js插件
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
//提取共同的代码
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
//允许错误不打断程序
var NoErrorsPlugin = webpack.NoErrorsPlugin;
//单独使用style标签加载css并设置其路径
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
//压缩html
// var HtmlWebpackPlugin = require('html-webpack-plugin');
//启动web浏览器
// var OpenBrowserPlugin = require('open-browser-webpack-plugin');


var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
	// entry: './public/js/index.js', //接入点
	entry:{
		// exprees: './config/express.js',
		app:'./public/js/index.js',
		other: './public/js/other.js',
		router: './public/js/router.js',
	},
	output: {
		//输出目录
		path: './public/dest',
		//输出文件名
		// finlename: 'app.js',
		// //输出文件名  【id】 [name]  [hash]  [chunkhash]
		filename: '[name].js',
		chunkFilename: '[id].bundle.js',
		//html引用路径，在这里是本地地址
		publicPath: "/dest/"
	},
	//用于指明程序自动补全识别哪些后缀
	resolve: {
		root: path.resolve('./public/js'),
	    extensions: ['', '.js', '.jsx'],
    	alias: {
	        js: path.resolve(__dirname, 'public','js')
	    }
	},
	plugins:[
		//提取共同的代码
        new CommonsChunkPlugin('common.js'),
		//压缩js
		// new uglifyJsPlugin({
	 //      compress: {
	 //        warnings: false
	 //      },
	 //      //排除混淆关键字
	 //      mangle: {
	 //      	except: ['require' ,'exports' ,'module' ,'$']
	 //      }
	 //    }),
	    //允许错误不打断程序
    	new NoErrorsPlugin(),
	    //单独使用style标签加载css并设置其路径
	    // new ExtractTextPlugin("css/[name].css"),
		//打开浏览器
	    // new OpenBrowserPlugin({
	    //   url: 'http://localhost:8080'
	    // }),
	],
	module: {
		loaders: [
			{
		    	////打包静态资源    //对匹配的文件进行处理的loader    jsx 转换   react 识别  es6 to es5
		    	//正则表达式匹配 .js 和 .jsx 文件 !jsx-loader?harmony
		    	test: /\.js[x]?$/,
		    	//对匹配的文件进行处理的loader 
		    	loader: 'babel-loader!jsx-loader?harmony',
		    	exclude: [nodeModulesPath]//排除node module中的文件
		    },
		    {
		    	////打包静态资源    //对匹配的文件进行处理的loader    jsx 转换   react 识别  es6 to es5
		    	//正则表达式匹配 .js 和 .jsx 文件 !jsx-loader?harmony
		    	test: /\.js[x]?$/,
		    	//对匹配的文件进行处理的loader 
		    	loader: 'babel-loader',
		    	query: {'presets' : [  'es2015', 'react', 'stage-0',]},
		    	exclude: [nodeModulesPath]//排除node module中的文件
		    },
			{
				// use ! to chain loaders
				test: /\.(less|css)$/, 
				//npm install css-loader --save -dev npm install style-loader --save -dev
				loader: 'style-loader!css-loader!less-loader',
        		exclude: [nodeModulesPath]//排除node module中的文件 
			},
		    {   
		    	// 可以通过url-loader把较小的图片转换成base64的字符串内嵌在生成的文件里。 npm install url-loader --save -dev
		    	test: /\.(png|jpg)$/,
		    	loader: 'url-loader?limit=10000',    // query: { mimetype: "image/png" }  //限制大小小于10k的
        		exclude: [nodeModulesPath]//排除node module中的文件 
		    },

		]
	}
}

























