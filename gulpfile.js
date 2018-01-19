"use strict";

var gulp    = require('gulp');
var $       = require('gulp-load-plugins')();

var dist = "dist";
var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('src/scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
     .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('assets/css'));
});

gulp.task( 'copyForBuild', function(){

    return  gulp.src([
        './**/*.*', 

        '!node_modules/**/*.*',
        '!npm-debug.log/**/*.*',
        '!bower_components/**/*.*',
        
        '!'+ dist +'/**/*.*',
        '!altro/**/*.*',
        '!src/**/*.*',
        '!bower.json',
        '!CHANGELOG.md',
        '!gulpfile.js',
        '!package.json',
        '!README.md'
    ])

    .pipe(gulp.dest( dist ));
});    

gulp.task('default', ['sass'], function() {
  gulp.watch(['src/scss/**/*.scss'], ['sass']);
});
