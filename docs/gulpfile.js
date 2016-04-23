var gulp = require('gulp');
//转换jsx代码
var react = require('gulp-react');
var babel = require('gulp-babel');


//转换less
var less = require('gulp-less');
//转换sass
var sass = require('gulp-sass');

//压缩css  npm install gulp-minify-css --save-dev
var minifyCss = require('gulp-minify-css');

//压缩js
var uglify = require('gulp-uglify');


//打包js
var browserify = require('gulp-browserify');
//把browserify  输出转化为gulp 可识别代码
var source = require('vinyl-source-stream');
//把browserify  输出jsx转化为 转化js代码
var reactify = require('reactify');

//加载webpack
var webpack = require("webpack");
//加载webpack配置
var webpackConfig = require("./webpack.config.js");

//自动刷新浏览器   npm install browser-sync --save-dev
var browserSync = require("browser-sync");

//控制插件执行顺序
var runSequence = require('gulp-run-sequence');

//自动执行node  $ npm install --save-dev gulp-nodemon
var nodemon = require('gulp-nodemon ');

//合并js
var concat = require('gulp-concat');
 


var paths = {
  main: './client.js',
  jsx: './components/**/**.jsx',
  stylusMain: './components/app.styl',
  stylusAll: './components/**/*.styl',
  css: './public/css/',
  server: './server.js',
  serverIgnore: [
    'gulpfile.js',
    'public/',
    'components/**/*.styl',
    'bower_components/',
    'node_modules/'
  ],
  publicJs: './public/js'
};


/*启动浏览器-------------------------------------------------------------------------------------------------------------------------*/

var reloadDelay = 6500;

gulp.task('server', function(cb) {
  var called = false;
  nodemon({
    script: paths.server,
    ext: '.js .css',
    ignore: paths.serverIgnore,
    env: {
      'NODE_ENV': 'development',
      'DEBUG': 'r3dm:*'
    }
  })
    .on('start', function() {
      if (!called) {
        called = true;
        setTimeout(function() {
          cb();
        }, reloadDelay);
      }
    })
    .on('restart', function(files) {
      if (files) {
        debug('Files that changed: ', files);
      }
      setTimeout(function() {
        debug('Restarting browsers');
        reload();
      }, reloadDelay);
    });
});


/*设置插件执行顺序-------------------------------------------------------------------------------------------------------------------------*/

gulp.task('prod', function(cb) {  
    //圆括号里面串行，中括号里面并行
    runSequence('clean', 'compass', ['image', 'style', 'html'], 'ftp', cb);
});



/*设置浏览器自动刷新---------------------------------------------------------------------------------------------------------------------*/


// 自动刷新 browser-sync start
gulp.task('browser',function(){
  browserSync({
    // host: 172.16.157.1,
    port: 8082,
    open: true,
    // 路径显示/d 开始
    startPath: "/d",
    //timestamps:false,
    server: {
      directory: true,
      routes: {
        '/d': "./dist/new.html"
      },
      middleware: function(req,res,next){
        console.log("中间件");
        next();
      },
      baseDir: './'
    },
    // 指定浏览器
    // browser: "google chrome" // 或  ["google chrome","firefox"]
    // 延迟刷新，默认0
    reloadDelay: 1,
    // 是否载入css修改，默认true
    injectChanges: false
  });
});
gulp.task('bro',function(){
  gulp.src('./dist/**')
  .pipe(browserSync.reload({stream:true}));
});
gulp.task('default',['bro','browser'],function(){
  gulp.watch('./dist/**',['bro']);
});




/*执行webpack-------------------------------------------------------------------------------------------------------------------------*/

gulp.task("webpack", function(callback) {
  var myConfig = Object.create(webpackConfig);
  // run webpack
  webpack(
    // configuration
    myConfig
  , function(err, stats) {
    // if(err) throw new gutil.PluginError("webpack", err);
    // gutil.log("[webpack]", stats.toString({
    //   // output options
    // }));
    callback();
  });
});

//监控js变化重新webpack
gulp.watch('app/src/**/*.js', ['webpack']);




/*转换jsx代码-------------------------------------------------------------------------------------------------------------------*/

gulp.task('jsx', function() {
  browserify({
    entries: ['./app.jsx'],
    transform: [reactify]
  })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./'));
});


gulp.task('jsx', function() {

    gulp.src('./src/index.js')
        //打包js
        .pipe(browserify())
        //压缩js
        .pipe(uglify())
        .pipe(gulp.dest('./dest'));
}


/*js代码合并-------------------------------------------------------------------------------------------------------------------------*/

gulp.task('scripts', function() {
  // gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js']

  return gulp.src('./lib/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});


/*压缩js-------------------------------------------------------------------------------------------------------------------------------*/

gulp.task('jsmin', function () {
    gulp.src(['src/js/*.js', '!src/js/**/{test1,test2}.js'])
        .pipe(uglify({
            //类型：Boolean 默认：true 是否修改变量名
            // mangle: true,
            //排除混淆关键字
            mangle: {except: ['require' ,'exports' ,'module' ,'$']},
            //类型：Boolean 默认：true 是否完全压缩
            compress: true,
            //保留所有注释
            preserveComments: all
        }))
        .pipe(gulp.dest('dist/js'));
});


/*压缩css-------------------------------------------------------------------------------------------------------------------------*/

gulp.task('testCssmin', function () {
    gulp.src('src/css/*.css')
        .pipe(cssmin({
            //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            advanced: false,
            //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            compatibility: 'ie7',
            //类型：Boolean 默认：false [是否保留换行]
            keepBreaks: true
        }))
        .pipe(gulp.dest('dist/css'));
});


/*转换less sass-----------------------------------------------------------------------------------------------------------------------------*/


gulp.task('less',function(){
  return gulp.src('./public/css/*.less')
      .pipe(less())
      .pipe(gulp.dest('./public/dest'));
});

gulp.task('sass',function(){
  return gulp.src('./public/css/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('./public/dest'));
});

/*默认执行插件------------------------------------------------------------------------------------------------------------------------------*/

gulp.task('default',['less','sass'],function(){
  return gulp.src('./public/js/*.js')
        .pipe(react())
        .pipe(babel({
          presets: ['babel-preset-es2015']
        }))
        .pipe(gulp.dest('./public/dest'));
});














