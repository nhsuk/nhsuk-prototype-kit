// Core dependencies
const gulp = require('gulp');

// External dependencies
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const clean = require('gulp-clean');
const gulpSass = require('gulp-sass')
const dartSass = require('sass-embedded')
const nodemon = require('gulp-nodemon');
const PluginError = require('plugin-error')

// Local dependencies
const config = require('./app/config');

// Set configuration variables
const port = parseInt(process.env.PORT) || config.port;

// Delete all the files in /public build directory
function cleanPublic() {
  return gulp.src('public', { allowEmpty: true }).pipe(clean());
}

const sass = gulpSass(dartSass)

// Compile SASS to CSS
function compileStyles(done) {
  return gulp
    .src(['app/assets/sass/**/*.scss'])
    .pipe(
      sass()
      .on('error', (error) => {
        done(
          new PluginError('compileCSS', error.messageFormatted, {
            showProperties: false
          })
        )
      })
    )
    .pipe(gulp.dest('public/css'))
}

// Compile JavaScript (with ES6 support)
function compileScripts() {
  return gulp
    .src(['app/assets/javascript/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('public/js'));
}

// Compile assets
function compileAssets() {
  return gulp
    .src([
      'app/assets/**/**/*.*',
      '!**/assets/**/**/*.js', // Don't copy JS files
      '!**/assets/**/**/*.scss', // Don't copy SCSS files
    ], { encoding: false })
    .pipe(gulp.dest('public'));
}

// Start nodemon
function startNodemon(done) {
  const server = nodemon({
    script: 'app.js',
    stdout: true,
    ext: 'js',
    quiet: false,
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
    process.stdout.write(stdout);
    if (starting) {
      onReady();
    }
  });
}

function reload() {
  browserSync.reload();
}

// Start browsersync
function startBrowserSync(done) {
  browserSync.init(
    {
      proxy: 'localhost:' + port,
      port: port + 1000,
      ui: false,
      files: ['app/views/**/*.*', 'lib/example-templates/**/*.*'],
      ghostMode: false,
      open: false,
      notify: true,
      watch: true,
    },
    done
  );
  gulp.watch('public/**/*.*').on('change', reload);
}

// Watch for changes within assets/
function watch() {
  gulp.watch('app/assets/sass/**/*.scss', compileStyles);
  gulp.watch('app/assets/javascript/**/*.js', compileScripts);
  gulp.watch('app/assets/**/**/*.*', compileAssets);
}

function setWatchEnv(done) {
  process.env.WATCH = 'true';
  done();
}

exports.watch = watch;
exports.compileStyles = compileStyles;
exports.compileScripts = compileScripts;
exports.cleanPublic = cleanPublic;
exports.setWatchEnv = setWatchEnv;

gulp.task(
  'build',
  gulp.series(cleanPublic, compileStyles, compileScripts, compileAssets)
);
gulp.task('default', gulp.series(setWatchEnv, startNodemon, startBrowserSync, watch));
