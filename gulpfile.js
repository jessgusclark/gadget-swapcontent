var gulp = require('gulp');

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

//for testing:
var mocha = require('gulp-mocha');
var concat = require('gulp-concat');

//default task:
gulp.task('default', ['sass', 'scripts']);
gulp.task('build', ['sass', 'scripts', 'test', 'watch']);

// watchers:
gulp.task('watch', function() {

  gulp.watch('src/scss/*.scss', ['sass']);  
  gulp.watch(['src/js/*.js', 'test/*.js'], ['scripts', 'test']);

});

gulp.task('sass', function () {
  gulp.src(['./src/scss/app.scss'])
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(concat('gadget.css'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(minifyCSS())
    .pipe(rename("gadget.min.css"))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('scripts', function() {
  return gulp.src(['./src/gadgetlib.js', './src/js/*.js' ])
    .pipe(concat('gadget.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(uglify())
    .pipe(rename("gadget.min.js"))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('test', ['scripts'], function () {
  return gulp.src('test/*.js', {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it 
    .pipe(mocha({reporter: 'nyan'}));
});