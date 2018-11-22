const gulp = require('gulp');

gulp.task('default', ['copy']);

/* ------------ Copy  ------------- */
gulp.task('copy', function () {
    gulp.src('./dist/**/*')
        .pipe(gulp.dest('../server-part/client/'));
});

