// 把指定文件夹下的文件复制到指定的目录 npm install transfer-webpack-plugin  -save
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var path = requier('path');
var webpack = requier('webpack');
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

//模块热替换(HMR)交换, 添加, 或者删除模块, 同时应用持续运行, 不需要 页面刷新.
// var HotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin;


var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
	// entry: './public/js/index.js', //接入点
	entry:{
		app:'./public/js/index.js',
		app2:'./public/js/about.js',
		app3: ["./index.js", "./about.js"],
		//【1】注意这里
		common: ["./public/dest/common"]
	},
	//用于指明程序自动补全识别哪些后缀
	resolve: {
	    extensions: ['', '.js']
	},
    //Server Configuration options
    devServer:{
    	//静态资源的目录 相对路径,相对于当前路径 默认为当前config所在的目录
        contentBase: './public/',
        //自动刷新
        hot: true,
        //嵌入webpack-dev-server运行时包
        inline: true,
        //控制台是否输出
        quiet：false,
        //过滤无用信息
        noInfo: false,
        //端口
        port: 3005,
        //代理
        proxy: {
		   "*": "http://localhost:9090"
	  	},
    },
	output: {
		//输出目录
		path: './public/dest',
		//输出文件名
		// finlename: 'app.js',
		// //输出文件名
		finlename: '[name].js',
		//数组里面文件的文件夹名  【id】 [name]  [hash]  [chunkhash]
        chunkFilename: "[id].bundle.js"
		//html引用路径，在这里是本地地址。
		publicPath: "./server/",
	},
	plugins:[
		//提取共同的代码
		//【2】注意这里  这两个地方市用来配置common.js模块单独打包的
		new CommonsChunkPlugin(
			{
				//和上面配置的入口对应
	            name: "common",
	            //导出的文件的名称
	            filename: "common.js"
        	}
        ),
        new CommonsChunkPlugin('init.js'),
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
    	//把指定文件夹xia的文件复制到指定的目录
	    new TransferWebpackPlugin(
	    	[
	      		{from: 'www'}
	    	], 
	    	path.resolve(__dirname,"src")
	    ),
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
		preLoaders: [
		    {
		      test: /\.(js|jsx)$/,   //注意是正则表达式，不要加引号，匹配要处理的文件
		      loader: 'eslint-loader',  //要使用的loader，"-loader"可以省略
		      include: [path.resolve(__dirname, "src/app")],  //把要处理的目录包括进来
		      exclude: [nodeModulesPath]  //排除不处理的目录
		    },
	    ],
		loders: [
		    {
		    	////打包静态资源    //对匹配的文件进行处理的loader    jsx 转换   react 识别  es6 to es5
		    	//正则表达式匹配 .js 和 .jsx 文件 
		    	test: /\.js[x]$/, 
		    	//对匹配的文件进行处理的loader 
		    	loader: 'babel-loader',
		    	query: { optional: "runtime", 'stage' : 0 , 'presets' : [ 'es2015', 'react']},
		    	exclude: [nodeModulesPath]//排除node module中的文件
		    },
		 //    {
		 //    	test: /\.js[x]?$/, 
		 //    	//对匹配的文件进行处理的loader    jsx 转换   react 识别  es6 to es5
		 //    	loader: 'babel-loader?presets[]=es2015&presets[]=react',
   //      		exclude: [nodeModulesPath]//排除node module中的文件
			// },
			{
				test: /\.jsx$/, //匹配文件
				loader: 'jsx-loder', // jsx转化为js    npm install jsx-loder
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

























