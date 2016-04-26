// 把指定文件夹下的文件复制到指定的目录 npm install transfer-webpack-plugin  -save
var webpack = require('webpack');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var path = require('path');
//压缩js插件
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
//提取共同的代码
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
//允许错误不打断程序
var NoErrorsPlugin = webpack.NoErrorsPlugin;
//单独使用style标签加载css并设置其路径
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//压缩html
var HtmlWebpackPlugin = require('html-webpack-plugin');
//启动web浏览器
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

//模块热替换(HMR)交换, 添加, 或者删除模块, 同时应用持续运行, 不需要 页面刷新.
// var HotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin;


var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
	// entry: './public/js/index.js', //接入点
	entry:{
		// exprees: './config/express.js',
		app:'./public/js/index.js',
	},
	output: {
		//输出目录
		path: './public/dest',
		//输出文件名
		// finlename: 'app.js',
		// //输出文件名
		finlename: '[name].js',
		//数组里面文件的文件夹名  【id】 [name]  [hash]  [chunkhash]
        chunkFilename: "[id].bundle.js",
		//html引用路径，在这里是本地地址。
		publicPath: "/dest/",
	},
	//用于指明程序自动补全识别哪些后缀
	resolve: {
	    extensions: ['', '.js']
	},
	devtool:'eval',
	plugins:[
		//提取共同的代码
        new CommonsChunkPlugin('common.js'),
		//压缩js
		new uglifyJsPlugin({
	      compress: {
	        warnings: false
	      },
	      //排除混淆关键字
	      mangle: {
	      	except: ['require' ,'exports' ,'module' ,'$']
	      }
	    }),
	    //允许错误不打断程序
    	new NoErrorsPlugin(),
	    //单独使用style标签加载css并设置其路径
	    new ExtractTextPlugin("css/[name].css"),
		//打开浏览器
	    new OpenBrowserPlugin({
	      url: 'http://localhost:8080'
	    }),
	    //模块热替换(HMR)交换, 添加, 或者删除模块, 同时应用持续运行, 不需要 页面刷新.
	    // HotModuleReplacementPlugin();
	],
	module: {
		loders: [
		    {
		    	////打包静态资源    //对匹配的文件进行处理的loader    jsx 转换   react 识别  es6 to es5
		    	//正则表达式匹配 .js 和 .jsx 文件 
		    	test: /\.js[x]$/, 
		    	//对匹配的文件进行处理的loader 
		    	loader: 'babel',
		    	query: {'presets' : [ 'es2015', "stage-0", 'react']},
		    	exclude: [nodeModulesPath]//排除node module中的文件
		    },
			{
				// use ! to chain loaders
				test: /\.less$/, 
				//npm install css-loader --save -dev npm install style-loader --save -dev
				loader: 'style-loader!css-loader!less-loader',
        		exclude: [nodeModulesPath]//排除node module中的文件 
			}, 
		    {   
		    	//打包静态资源
		    	test: /\.css$/,
		    	//npm install css-loader --save -dev npm install style-loader --save -dev
		    	loader: 'style-loader!css-loader' ,
        		exclude: [nodeModulesPath]//排除node module中的文件 
		    },
		    {   
		    	// 可以通过url-loader把较小的图片转换成base64的字符串内嵌在生成的文件里。 npm install url-loader --save -dev
		    	test: /\.(png|jpg)$/,
		    	loader: 'url-loader?limit=8192',    // query: { mimetype: "image/png" }  //限制大小小于8.192k的
        		exclude: [nodeModulesPath]//排除node module中的文件 
		    },
		    {
		    	test:/\.(png|woff|svg|ttf|eot)$/,
		    	//限制大小小于10k的
		    	loader:'url-loader?limit=10000',
        		exclude: [nodeModulesPath]//排除node module中的文件 
	    	},
	    	{   
	    		// 打包template   npm install handlebars-loader --save -dev  npm install handlebars -save//是必须的
	    		test: /\.html$/,
	    		loader: "handlebars-loader",
        		exclude: [nodeModulesPath]//排除node module中的文件 
	    	},

		]
	}
}
























