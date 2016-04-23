var gulp = require('gulp');

//转换less
var less = require('gulp-less');

//压缩css  npm install gulp-minify-css --save-dev
var minifyCss = require('gulp-minify-css');

//加载webpack
var webpack = require("webpack");
//加载webpack配置
var webpackConfig = require("./webpack.config.js");

//控制插件执行顺序
var runSequence = require('gulp-run-sequence');

//自动执行node  $ npm install --save-dev gulp-nodemon
var nodemon = require('gulp-nodemon ');
 

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
    //	 // output options
    // }));
    callback();
  });
});


/*转换less 压缩-----------------------------------------------------------------------------------------------------------------------------*/


gulp.task('less',function(){
	return gulp.src('public/css/**/*.less')
			.pipe(less())
      .pipe(cssmin({
            //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            advanced: false,
            //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            compatibility: 'ie7',
            //类型：Boolean 默认：false [是否保留换行]
            keepBreaks: true
        }))
			.pipe(gulp.dest('public/dest'));
});


/*监控文件变化-------------------------------------------------------------------------------------------------------------------------*/

gulp.task('watch', function() {
  gulp.watch('public/js/**/*.js', ['webpack']);
  gulp.watch('public/css/**/*.css', ['less']);
});

/*设置插件执行顺序-------------------------------------------------------------------------------------------------------------------------*/

gulp.task('prod', function(cb) {  
    //圆括号里面串行，中括号里面并行
    runSequence('webpack', ['less'], 'watch', cb);
});



/*默认执行插件------------------------------------------------------------------------------------------------------------------------------*/

gulp.task('default',['prod'],function(){

});














