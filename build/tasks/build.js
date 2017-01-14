var gulp = require('gulp'),
  $ = require('gulp-load-plugins')({ lazy: true }),
  runSequence = require('run-sequence'),
  paths = require('../paths'),
  assign = Object.assign || require('object.assign'),
  browserSync = require('browser-sync'),
  argv = require('yargs').argv,
  path = require('path');

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
var typescriptCompiler = typescriptCompiler || null;
gulp.task('build-system', ['lint'], function () {
  if (!typescriptCompiler) {
    let options = { };

    if (argv.exitOnError) {
      options.noEmitOnError = true;
    }

    typescriptCompiler = $.typescript.createProject('tsconfig.json', options);
  }

  return gulp.src(paths.dtsSrc.concat(paths.source))
    .pipe($.plumber({ errorHandler: () => { 
        $.notify.onError('Error: <%= error.message %>');
        if (argv.exitOnError) {
          process.exit(1); 
        }
      }}))
    .pipe($.changed(paths.output, { extension: '.ts' }))
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe(typescriptCompiler())
    .pipe($.sourcemaps.write('.', { includeContent: false, sourceRoot: path.join(__dirname, '/../../src').split("\\").join("//") }))
    .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe($.changed(paths.output, { extension: '.html' }))
    .pipe($.htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.output));
});

gulp.task('_sass-lint', function () {
  return gulp
    .src(paths.sass)
    .pipe($.convertNewline({ newline: "lf" }))
    .pipe($.sassLint())
    .pipe($.sassLint.format())
    .pipe($.sassLint.failOnError());
});

gulp.task('_sass', ['_sass-lint'], function () {
  return gulp
    .src(paths.sass)
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(gulp.dest(paths.styleFolder));
});

// copies changed css files to the output directory
gulp.task('build-css', ['_sass'], function () {
  return gulp.src(paths.css)
    .pipe($.changed(paths.output, { extension: '.css' }))
    .pipe(gulp.dest(paths.output))
    .pipe(browserSync.stream());
});

gulp.task('_config-copy', function () {
  return gulp.src(paths.config.local)
    .pipe(gulp.dest(paths.output + paths.config.folder));
});

gulp.task('_fonts-copy', function () {
  return gulp.src(paths.fonts.files)
    .pipe(gulp.dest(paths.fonts.folder));
});

gulp.task('_img-copy', function () {
  return gulp.src(paths.img.files)
    .pipe(gulp.dest(paths.img.folder));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function (callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html', 'build-css', '_fonts-copy', '_img-copy', '_config-copy'],
    callback
  );
});