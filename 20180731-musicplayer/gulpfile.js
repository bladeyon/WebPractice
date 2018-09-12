var gulp = require('gulp');
var htmlclean = require('gulp-htmlclean'); //压缩
var imgmin = require('gulp-imagemin'); //压缩
var uglify = require('gulp-uglify'); //压缩
var stripDebug = require('gulp-strip-debug'); //去掉js调试信息
var concat = require('gulp-concat'); //js文件拼接
var less = require('gulp-less'); //less转css
var postcss = require("gulp-postcss"); // 使用几个插件处理css，只解析一次css
var cssnano = require('cssnano'); // 压缩css
var autoprefixer = require('autoprefixer'); // 给css属性添加前缀，兼容性
var connect = require('gulp-connect');  // 服务器

// 配置开发、生产环境，环境切换
console.log(process.env.NODE_ENV);
var devModel = process.env.NODE_ENV == "production"
console.log(process.env.NODE_ENV);

var folder = {
    src: "./src/",
    build: "./build/"
};

// gulp.src(); //读文件
// gulp.dest(); // 写文件
// gulp.task(); //任务
// gulp.watch(); //监视

// 压缩html
gulp.task('html', function () {
    var htmlfiles = gulp.src(folder.src + 'html/*').pipe(connect.reload());    // 自动刷新html
    if (devModel) {
        htmlfiles.pipe(htmlclean())
    }
    htmlfiles.pipe(gulp.dest(folder.build + 'html/'))
});

gulp.task('css', function () {
    var handler = [autoprefixer(), cssnano()];
    var cssfiles = gulp.src(folder.src + 'css/*').pipe(less()).pipe(connect.reload());    // 自动刷新;
    if (devModel) {
        cssfiles.pipe(postcss(handler))
    }
    cssfiles.pipe(gulp.dest(folder.build + 'css'));
});

gulp.task('js', function () {
    var jsfiles = gulp.src(folder.src + 'js/*').pipe(connect.reload());    // 自动刷新;
    if (devModel) {
        jsfiles.pipe(stripDebug())
            // .pipe(concat('main.js'))
            .pipe(uglify())
    }
    jsfiles.pipe(gulp.dest(folder.build + "js"));
});

gulp.task('images', function () {
    gulp.src(folder.src + 'images/*')
        .pipe(imgmin())
        .pipe(gulp.dest(folder.build + "images"));
});

gulp.task('watch', function () {
    gulp.watch(folder.src + 'html/*', ['html']);
    gulp.watch(folder.src + 'css/*', ['css']);
    gulp.watch(folder.src + 'js/*', ['js']);
    gulp.watch(folder.src + 'images/*', ['images']);
});

// 开启一个服务器
gulp.task('server',function(){
    connect.server({
        // port:3000,
        livereload:true     // 开启自动刷新
    });
})
gulp.task('default', ["html", "images", 'css', 'js', 'watch','server']);