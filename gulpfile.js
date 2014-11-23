var gulp = require('gulp');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');

var browserify = require('browserify');

gulp.task('script', function () {
  browserify({
    entries: ['./src/js/main.js']
  })
  .bundle()
  .pipe(plumber())
  .pipe(source('main.js'))
  .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function () {
  gulp.watch('src/js/*.js', ['script']);
});
