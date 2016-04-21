var webpack = requier('webpack');

module.exports = {
	// entry: './public/js/index.js', //接入点
	entry:{
		app:'./public/js/index.js',
		app2:'./public/js/about.js'
	}
	output: {
		paath: './public/dest',      //输出目录
		// finlename: 'app.js',  //输出文件名
		finlename: '[name].js',  //输出文件名
		publicPath: "./server/",				//html引用路径，在这里是本地地址。
	}，
	plugins:[
		new webpack.optimize.CommonsChunkPlugin("common.js")   //提取共同的代码
	]
	module: {
		loders: [
			{
				test: /\.jsx$/, //匹配文件
				loader: 'jsx-loder', // jsx转化为js    npm install jsx-loder
			}
		]
	}
}