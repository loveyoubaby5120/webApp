// 把指定文件夹下的文件复制到指定的目录 npm install transfer-webpack-plugin  -save
var TransferWebpackPlugin = require('transfer-webpack-plugin');
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
/**
* definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串  （多变量传递）
* 控制台输入  env DEBUG=true webpack-dev-server  在js里面可以使用变量   __DEV__   这个变量名是自定时的可以更改
 */
var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

//模块热替换(HMR)交换, 添加, 或者删除模块, 同时应用持续运行, 不需要 页面刷新.
// var HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;



var nodeModulesPath = path.resolve(__dirname, 'node_modules');

var nodeModulesPath = path.resolve(__dirname, 'node_modules');

var entries = {
  app: './public/js/index.js',
  app2: './public/js/about.js',
  app3: ["./index.js", "./about.js"],
  //【1】注意这里
  common: ["./public/dest/common"],
  //第三方库
  vendor: ['jquery']
}

module.exports = {
  // entry: './public/js/index.js', //接入点
  // entry:{
  // 	app:'./public/js/index.js',
  // 	app2:'./public/js/about.js',
  // 	app3: ["./index.js", "./about.js"],
  // 	//【1】注意这里
  // 	common: ["./public/dest/common"],
  // 	//第三方库
  //        vendor: ['jquery']
  // },
  entry: entries,
  //用于指明程序自动补全识别哪些后缀
  resolve: {
    //查找module的话从这里开始查找
    root: '/', //绝对路径
    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['', '.js', '.json', '.scss'],
    //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    alias: {
      AppStore: 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
      ActionType: 'js/actions/ActionType.js',
      AppAction: 'js/actions/AppAction.js'
    }
  },
  //Server Configuration options
  devServer: {
    //静态资源的目录 相对路径,相对于当前路径 默认为当前config所在的目录
    contentBase: './public/',
    //自动刷新
    hot: true,
    //嵌入webpack-dev-server运行时包
    inline: true,
    //控制台是否输出
    quiet: false,
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
    filename: '[name].js',
    //数组里面文件的文件夹名  【id】 [name]  [hash]  [chunkhash]
    chunkFilename: "[id].bundle.js",
    //html引用路径，在这里是本地地址。
    publicPath: "./server/",
  },
  plugins: [
    //这个可以使jquery变成全局变量，妮不用在自己文件require('jquery')了
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
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
    new CommonsChunkPlugin(
      {
        name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
        chunks: chunks,
        // chunks: ['app','app2','app3','common'],
        minChunks: chunks.length, // 提取所有entry共同依赖的模块
        // minChunks: Infinity,
        filename: 'vendor.js'
      }
    ),
    new CommonsChunkPlugin(
      {
        // names: ["app", "subPageA"]
        // (choose the chunks, or omit for all chunks)

        children: true,
        // (use all children of the chunk)

        async: true,
        // (create an async commons chunk)

        // minChunks: 3,
        // (3 children must share the module before it's separated)
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
        except: ['require', 'exports', 'module', '$']
      }
    }),
    //允许错误不打断程序
    new NoErrorsPlugin(),
    //把指定文件夹xia的文件复制到指定的目录
    new TransferWebpackPlugin(
      [
        { from: 'www' }
      ],
      path.resolve(__dirname, "src")
    ),
    //单独使用style标签加载css并设置其路径
    new ExtractTextPlugin("css/[name].css"),
    //根据模板插入css/js等生成最终HTML
    new HtmlWebpackPlugin({
      //favicon路径
      favicon: './src/img/favicon.ico',
      //生成的html存放路径，相对于 path
      filename: '/view/index.html',
      //html模板路径
      template: './src/view/index.html',
      //允许插件修改哪些内容，包括head与body
      inject: true,
      //为静态资源生成hash值
      hash: true,
      //压缩HTML文件
      minify: {
        //移除HTML中的注释
        removeComments: true,
        //删除空白符与换行符
        collapseWhitespace: true
      }
    }),
    //打开浏览器
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),
    //definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
    devFlagPlugin,
    //模块热替换(HMR)交换, 添加, 或者删除模块, 同时应用持续运行, 不需要 页面刷新.
    // new HotModuleReplacementPlugin();
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
    loaders: [
      {
        ////打包静态资源
        //正则表达式匹配 .js 和 .jsx 文件 
        test: /\.(js|jsx)$/,
        //对匹配的文件进行处理的loader 
        loader: 'babel-loader?optional=runtime&stage=0',
        exclude: [nodeModulesPath]//排除node module中的文件
      },
      {
        test: /\.js[x]?$/,
        //对匹配的文件进行处理的loader    jsx 转换   react 识别  es6 to es5
        loader: 'babel-loader?presets[]=es2015&presets[]=react',
        exclude: [nodeModulesPath]//排除node module中的文件
      },
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
        loader: 'style-loader!css-loader',
        exclude: [nodeModulesPath]//排除node module中的文件 
      },
      {
        // 可以通过url-loader把较小的图片转换成base64的字符串内嵌在生成的文件里。 npm install url-loader --save -dev
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192',    // query: { mimetype: "image/png" }  //限制大小小于8.192k的
        exclude: [nodeModulesPath]//排除node module中的文件 
      },
      {
        test: /\.(png|woff|svg|ttf|eot)$/,
        //限制大小小于10k的
        loader: 'url-loader?limit=10000',
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

























