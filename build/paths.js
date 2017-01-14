var appRoot = 'src/',
  appConfig = 'config/',
  outputRoot = 'dist/',
  exporSrvtRoot = 'export/',
  stylesRoot = 'styles/',
  fontsRoot = 'fonts/',
  imgRoot = 'images/',
  testRoot = 'test/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.ts',
  testsRoot: testRoot,
  tests: testRoot + 'unit/**/*.ts',
  testsOutput: testRoot + 'dist/',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  style: stylesRoot + '**/*.css',
  styleFolder: stylesRoot,
  sass: stylesRoot + '**/*.scss',
  output: outputRoot,
  exportSrv: exporSrvtRoot,
  doc: './doc',
  dtsSrc: [
    './typings/**/*.d.ts',
    './custom_typings/**/*.d.ts',
    './src/**/*.d.ts'
  ],
  config: {
    file: 'app.config.json',
    folder: appConfig,
    local: appRoot + appConfig + 'app.config.json',
    deploy: appRoot + appConfig + 'app.config.deploy.json'
  },
  fonts: {
    folder: fontsRoot,
    files: [
      'jspm_packages/github/twbs/bootstrap-sass@3.3.7/assets/fonts/bootstrap/*.*'
    ]
  },
  img: {
    folder: imgRoot,
    files: [ ]
  },
  coverage: {
    instrumentationFilePath: testRoot + 'unit/all-modules.spec.ts',
    excludePaths: [
      '.d.ts'
    ]
  }
}