var gulp = require('gulp');
var source = require('vinyl-source-stream');

var browserify = require('browserify');

gulp.task('script', function () {
  browserify({
    entries: ['./src/js/main.js']
  })
  .bundle()
  .pipe(source('main.js'))
  .pipe(gulp.dest('./public/js'));
});
