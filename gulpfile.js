var gulp = require('gulp'),
wiredep = require('wiredep').stream,
useref = require('gulp-useref'),
gulpif = require('gulp-if'),
uglify = require('gulp-uglify'),
minifyCss = require('gulp-clean-css'),
notify = require('gulp-notify'),
autoprefixer = require('gulp-autoprefixer'),
less = require('gulp-less'),
browserSync = require('browser-sync').create(),
reload = browserSync.reload;

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
    gulp.watch("app/*.html").on("change", browserSync.reload);
    gulp.watch("app/css/*.css").on("change", browserSync.reload);
    gulp.watch("app/less/*.less").on("change", browserSync.reload);
    gulp.watch("app/pages/*.html").on("change", browserSync.reload);
});

gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({}))
    .pipe(gulp.dest('./app'))
    .pipe(notify('Done!'));
});

gulp.task('less', function () {
  return gulp.src('app/less/*.less')
    .pipe(less({}))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('html', function () {
    return gulp.src('./app/*.html')
        .pipe(useref())
        /*.pipe(gulpif('*.js', uglify()))*/
        .pipe(gulpif('*.css', autoprefixer()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
    return gulp.src('./app/img/*.*')
        .pipe(gulp.dest('dist/img/'))
});

//gulp.task('copy2', function () {
  //  return gulp.src('./app/pages/**/*.*')
    //    .pipe(gulp.dest('dist/pages'))
//});

gulp.task('watch', function () {
    gulp.watch('bower.json', ['bower']);
    gulp.watch('./app/less/less.less', ['less']);
});

//------------------------------------------------
gulp.task('default', ['less', 'bower', 'watch', 'browser-sync']);
gulp.task('dist', ['html', 'copy'])
//------------------------------------------------