var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var angularTemplatecache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var insert = require('gulp-insert');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
// var iife = require('gulp-iife');

var config = {
    src: './src',
    lib: './lib',
    build: './build',
}

var jsSrc = [config.src+'/**/*.module.js', config.src+'/**/*.js'];

gulp.task('html', function () {
    console.log(__dirname+'/src/');
  var target = gulp.src('./src/index.html');
  var sources = gulp.src(jsSrc, {read: false, base: __dirname+'/src/'});

  return target.pipe(inject(sources))
    .pipe(gulp.dest(config.build));
});


gulp.task('sass', function () {
  return gulp.src([config.src+'/style/reset.scss', config.src+'/style/variables.scss', config.src+'/style/*.scss', config.src+'/**/*.scss', config.src+'/**/*.css'])
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.build));
});

gulp.task('resources', function(){
    gulp.src('./resources/**/*', {base: __dirname})
        .pipe(gulp.dest(config.build))
})

gulp.task('js', ['templateCache', 'libs'], function(){
    return gulp.src(jsSrc, {base: __dirname})
        .pipe(insert.prepend('(function(){\n'))
        .pipe(insert.append('\n})();'))
        .pipe(gulp.dest(config.build))
})

gulp.task('templateCache', function(){
    return gulp.src([config.src + '/**/*.tpl.html'])
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true,
        }))
        .pipe(angularTemplatecache('templateCacheHtml.js', {
            module: 'gulp.templateCache'
        }))
        .pipe(gulp.dest(config.build));
});

gulp.task('libs', function(){
    return gulp.src(config.lib+'/index.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(rename('libs.js'))
        .pipe(gulp.dest(config.build));
})


// gulp.task('htmlBuild', function(){
//     return gulp.src(config.src+'/index.html')
//         .pipe(gulp.dest(config.build));
// });

// gulp.task('jsBuild', ['templateCache', 'libs'], function(){
//     return gulp.src(jsSrc)
//         .pipe(sourcemaps.init())
//         .pipe(concat('bundle.js', {newLine: '\n})();\n(function(){\n'}))
//         .pipe(insert.prepend('(function(){\n'))
//         .pipe(insert.append('\n})();'))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(config.build));
// });

gulp.task('build', ['html', 'sass', 'resources', 'js'], function(){})

gulp.task('default', ['build'], function(){
    gulp.watch(config.src+'/**/*.*', function(event) {
        gulp.start('build');
    });
})

