var gulp = require('gulp');
var cssHtml = require('../app');

gulp.task('js', function() {
  return gulp.src('test.js')
    .pipe(cssHtml())
    .pipe(gulp.dest('./result/'));
});

gulp.task("default", function () {
  gulp.watch(['./test.js'], gulp.series(["js"]))
})
