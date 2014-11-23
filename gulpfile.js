var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

gulp.task('script', function () {
  gulp.src('src/js/main.js', {read: false})
  .pipe(plumber())
  .pipe(browserify({
    debug: true
  }))
  .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function () {
  gulp.watch('src/js/*.js', ['script']);
});
