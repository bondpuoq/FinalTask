var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var rename = require('gulp-rename');
var autoPrefixer = require('gulp-autoprefixer');
var liveReload = require('gulp-livereload');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var haml = require('gulp-haml');
var concat = require('gulp-concat');

// Sass compiling, concating, renaming and autoprefixing
gulp.task('sass', function() {
  gulp.src('./src/sass/*.scss')
  .pipe(sass())
  .pipe(concatCss())
  .pipe(autoPrefixer({
    browsers: ['last 4 versions'],
    cascade: false
  }))
  .pipe(rename('style.css'))
  .pipe(gulp.dest('./build/css/'))
  .pipe(connect.reload());
});

// Haml compiling
gulp.task('haml', function() {
  gulp.src('./src/*.haml')
  .pipe(haml())
  .pipe(gulp.src('./build/'))
  .pipe(connect.reload());
});

// Pages live-reload
gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true,
    port: 8080
  });
});

// Watches
gulp.task('watch', function() {
  gulp.watch('./src/sass/*.scss', ['sass']);
  gulp.watch('./src/*.haml', ['haml']);
});

// Default task
gulp.task('default', ['connect', 'haml', 'sass', 'watch']);
