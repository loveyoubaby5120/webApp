var gulp = require('gulp');
var react = require('gulp-react');  //沾化jsx代码
var babel = require('gulp-babel');
var less = require('gulp-less');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

var browserrify = require('gulp-browserify');
var source = require('vinyl-source-stream');   //把browserify  输出转化为gulp 可识别代码
var reactify = require('reactify');            //把browserify  输出jsx转化为 转化js代码

var webpack = require("webpack");			//加载webpack
var webpackConfig = require("./webpack.config.js");   //加载webpack配置

var browserSync = require("browser-sync"); //自动刷新浏览器   npm install browser-sync --save-dev

/*---------------------------------------------------------------------------------------------------------------------------------------*/


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


/*---------------------------------------------------------------------------------------------------------------------------------------*/




/*---------------------------------------------------------------------------------------------------------------------------------------*/

gulp.task("webpack", function(callback) {
  var myConfig = Object.create(webpackConfig);
  // run webpack
  webpack(
    // configuration
    myConfig
  , function(err, stats) {
    // if(err) throw new gutil.PluginError("webpack", err);
    // gutil.log("[webpack]", stats.toString({
    //	 // output options
    // }));
    callback();
  });
});

gulp.watch('app/src/**/*.js', ['webpack']); //监控js变化重新webpack




/*---------------------------------------------------------------------------------------------------------------------------------------*/

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
        .pipe(browserify())       //打包js
        .pipe(uglify())				//压缩js
        .pipe(gulp.dest('./dest'));
}

/*---------------------------------------------------------------------------------------------------------------------------------------*/

gulp.task('jsmin', function () {
    gulp.src(['src/js/*.js', '!src/js/**/{test1,test2}.js'])
        .pipe(uglify({
            // mangle: true,//类型：Boolean 默认：true 是否修改变量名
            mangle: {except: ['require' ,'exports' ,'module' ,'$']}//排除混淆关键字
            compress: true,//类型：Boolean 默认：true 是否完全压缩
            preserveComments: all //保留所有注释
        }))
        .pipe(gulp.dest('dist/js'));
});


/*---------------------------------------------------------------------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------------------------------------------------------------------*/


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

/*---------------------------------------------------------------------------------------------------------------------------------------*/

gulp.task('default',['less','sass'],function(){
	return gulp.src('./public/js/*.js')
				.pipe(react())
				.pipe(babel({
					presets: ['babel-preset-es2015']
				}))
				.pipe(gulp.dest('./public/dest'));
});