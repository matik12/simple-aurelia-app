'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const jspm = require('jspm');
const paths = require('../paths');
const bundles = require('../bundles.js');
const resources = require('../export.js');
var argv = require('yargs').argv;
const $ = require('gulp-load-plugins')({ lazy: true });

function getBundles() {
  let bl = [];
  for (let b in bundles.bundles) {
    bl.push(b + '*.js');
  }
  return bl;
}

function getExportList() {
  return resources.list.concat(getBundles());
}

function normalizeExportPaths() {
  const pathsToNormalize = resources.normalize;

  let promises =  pathsToNormalize.map(pathSet => {
    const packageName = pathSet[ 0 ];
    const fileList = pathSet[ 1 ];

    return jspm.normalize(packageName).then((normalized) => {
      const packagePath = normalized.substring(normalized.indexOf('jspm_packages'), normalized.lastIndexOf('.js'));
      return fileList.map(file => packagePath + file);
    });
  });

  return Promise.all(promises)
    .then((normalizedPaths) => {
      return normalizedPaths.reduce((prev, curr) => prev.concat(curr), []);
    });
}

// deletes all files in the output path
gulp.task('clean-export', function() {
  return gulp.src([ paths.exportSrv ])
    .pipe(vinylPaths(del));
});

gulp.task('_export-copy-config', function() {
  let configPathToMerge = argv.mergeConfig ? paths.config.deploy: paths.config.local;
  let pipeline = gulp.src([
       paths.config.local,
       configPathToMerge]);

  let version = {};
  if (argv.version) {
    version = { version: argv.version };
  } 

  return pipeline
    .pipe($.mergeJson(paths.config.file, false, false, version))
    .pipe(gulp.dest(paths.exportSrv + paths.output + paths.config.folder));
});

gulp.task('_export-copy-fonts', function() {
  return gulp.src(paths.fonts.folder + '*.*')
    .pipe(gulp.dest(paths.exportSrv + paths.fonts.folder));
});

gulp.task('_export-copy-img', function() {
  return gulp.src(paths.img.folder + '**/*.*')
    .pipe(gulp.dest(paths.exportSrv + paths.img.folder));
});

gulp.task('export-copy', ['_export-copy-config', '_export-copy-fonts', '_export-copy-img'], function() {
  return gulp.src(getExportList(), { base: '.' })
    .pipe(gulp.dest(paths.exportSrv));
});

gulp.task('export-normalized-resources', function() {
  return normalizeExportPaths().then(normalizedPaths => {
    return gulp.src(normalizedPaths, { base: '.' })
      .pipe(gulp.dest(paths.exportSrv));
  });
});

// use after prepare-release
gulp.task('export', function(callback) {
  return runSequence(
    'bundle',
    'clean-export',
    'export-normalized-resources',
    'export-copy',
    'unbundle',
    callback
  );
});
