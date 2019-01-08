const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

const config = require('./app/config');
const port = process.env.PORT || config.port;

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

function startNodemon(done) {
  const server = nodemon({
    script: 'app.js',
    stdout: false, // without this line the stdout event won't fire
    ext: 'scss js html',
    quiet: true,
  });
  let starting = false;

  const onReady = () => {
    starting = false;
    done();
  };

  server.on('start', () => {
    starting = true;
    setTimeout(onReady);
  });

  server.on('stdout', (stdout) => {
    process.stdout.write(stdout); // pass the stdout through
    if (starting) {
      onReady();
    }
  });
}

function startBrowserSync(done){
  browserSync.init({
    proxy: 'localhost:' + port,
    port: 4000,
    ui: false,
    ghostmode: false,
    open: false,
    notify: true,
  }, done);
}

function watch() {
  gulp.watch('app/assets/sass/**/*.scss', styles);
}

exports.watch = watch;
exports.styles = styles;

gulp.task('default', watch);
gulp.task('server', gulp.series(startNodemon, startBrowserSync, watch));
