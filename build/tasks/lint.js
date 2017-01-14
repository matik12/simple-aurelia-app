var gulp = require('gulp');
var paths = require('../paths');
var tslint = require('gulp-tslint');

gulp.task('lint', function() {
  return gulp.src(paths.source)
    .pipe(tslint({
      emitError: false
    }))
    .pipe(tslint.report());
});

gulp.task('lint-test', function() {
  return gulp.src(paths.tests)
    .pipe(tslint({
      emitError: false
    }))
    .pipe(tslint.report());
});
