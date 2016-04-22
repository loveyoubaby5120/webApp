// 把指定文件夹下的文件复制到指定的目录 npm install transfer-webpack-plugin  -save
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var webpack = requier('webpack');
//压缩js插件
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
//提取共同的代码
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
//允许错误不打断程序
var NoErrorsPlugin = webpack.NoErrorsPlugin;

var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
	// entry: './public/js/index.js', //接入点
	entry:{
		app:'./public/js/index.js',
		app2:'./public/js/about.js',
		//【1】注意这里
		common: ["./public/dest/common"]
	},
	//用于指明程序自动补全识别哪些后缀
	resolve: {
	    extensions: ['', '.coffee', '.js']
	},
    //Server Configuration options
    devServer:{
        contentBase: '',  //静态资源的目录 相对路径,相对于当前路径 默认为当前config所在的目录
        devtool: 'eval',
        hot: true,        //自动刷新
        inline: true,    
        port: 3005        
    },
    devtool: 'eval',
	output: {
		//输出目录
		paath: './public/dest',
		//输出文件名
		// finlename: 'app.js',
		// //输出文件名
		finlename: '[name].js',
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
	    )
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
		    	////打包静态资源
		    	test: /\.(js|jsx)$/, //正则表达式匹配 .js 和 .jsx 文件  ç
		    	loader: 'babel-loader?optional=runtime&stage=0',//对匹配的文件进行处理的loader 
		    	exclude: [nodeModulesPath]//排除node module中的文件
		    }
			{
				test: /\.jsx$/, //匹配文件
				loader: 'jsx-loder', // jsx转化为js    npm install jsx-loder
        		exclude: [nodeModulesPath]//排除node module中的文件
			},
			{
				// use ! to chain loaders
				test: /\.less$/, 
				loader: 'style-loader!css-loader!less-loader',  //npm install css-loader --save -dev npm install style-loader --save -dev
        		exclude: [nodeModulesPath]//排除node module中的文件 
			}, 
		    {   
		    	//打包静态资源
		    	test: /\.css$/,
		    	loader: 'style-loader!css-loader' ,  //npm install css-loader --save -dev npm install style-loader --save -dev
        		exclude: [nodeModulesPath]//排除node module中的文件 
		    },
		    {   
		    	// 可以通过url-loader把较小的图片转换成base64的字符串内嵌在生成的文件里。 npm install url-loader --save -dev
		    	test: /\.(png|jpg)$/,
		    	loader: 'url-loader?limit=8192',    //   query: { mimetype: "image/png" }  //限制大小小于8.192k的
        		exclude: [nodeModulesPath]//排除node module中的文件 
		    },
		    {
		    	test:/\.(png|woff|svg|ttf|eot)$/,
		    	loader:'url-loader?limit=10000',//限制大小小于10k的
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

























