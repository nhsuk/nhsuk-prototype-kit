var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var cleanCSS = require('gulp-clean-css');

function styles() {
  return gulp.src('app/assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/css'))
    .on('error', (err) => {
      console.log(err)
      process.exit(1)
    })
}

function watch() {
  gulp.watch('app/assets/sass/**/*.scss', styles);
}

exports.watch = watch;
exports.styles = styles;

gulp.task('default', watch);
