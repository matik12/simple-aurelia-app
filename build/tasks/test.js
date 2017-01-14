var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var paths = require('../paths');
var Karma = require('karma').Server;
var argv = require('yargs').argv;
var fs = require('fs');
var fsTools = require('fs-tools');

/**
 * Run test once and exit
 */
gulp.task('test', ['build-test'], function (done) {
  var options = {
    configFile: __dirname + '/../../karma.conf.js'
  };

  if (argv.singleRun) {
    options.singleRun = true;
  }

  if (argv.junit) {
    options.reporters = ['junit', 'coverage', 'karma-remap-istanbul'];
  }

  new Karma(options, (code) => {
    if (code == 1) {
      process.exit(1);
    }
    done(); 
  }).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', ['build-test'], (done) => {
  new Karma({
    configFile: __dirname + '/../../karma.conf.js'
  }, function () {
    done();
  }).start();
});

/**
 * Build(Transpile) js unit test code, run linting
 */
var typescriptCompiler = typescriptCompiler || null;
gulp.task('build-test', ['lint-test', 'coverage-instrumentation-file'], function () {
  if (!typescriptCompiler) {
    let options = {
      rootDir: './'
    };

    if (argv.exitOnError) {
      options.noEmitOnError = true;
    }

    typescriptCompiler = $.typescript.createProject('tsconfig.json', options);
  }

  return gulp.src(paths.dtsSrc.concat(paths.tests))
    .pipe($.changed(paths.testsOutput, { extension: '.ts' }))
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe(typescriptCompiler())
    .pipe($.sourcemaps.write('.', { includeContent: false, sourceRoot: paths.testsRoot }))
    .pipe(gulp.dest(paths.testsOutput));
});

gulp.task('coverage-instrumentation-file', () => {
    if (fs.existsSync(paths.coverage.instrumentationFilePath)){
      fs.unlinkSync(paths.coverage.instrumentationFilePath);
    }

    var file = fs.createWriteStream(paths.coverage.instrumentationFilePath, { 'flags': 'a' });

    fsTools.walkSync(paths.root, '.ts$', function(path){
      // exclude all file with machting paths
      var excludeFile = false;      
      paths.coverage.excludePaths.forEach(exclude => {
        if (path.indexOf(exclude) !== -1) {
          console.log('exclude ' + path);
          excludeFile = true;
          return;
        }
      });

      if (excludeFile) {
        return;
      }

      file.write('import \''+ path.split('\\').join('/').replace('.ts', '') + '\';\n');
    });
});