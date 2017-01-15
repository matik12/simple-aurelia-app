module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['systemjs', 'jasmine'],
    systemjs: {
      configFile: 'config.js',
      config: {
        paths: {
          "*": "*",
          "src/*": "dist/*",
          "test/unit/*": "test/dist/*",
          "config/app.config.json": "dist/config/app.config.json",
          "typescript": "node_modules/typescript/lib/typescript.js",
          "systemjs": "node_modules/systemjs/dist/system.js",
          'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js',
          'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js'
        },
        meta: {
          'src/*': {
            format: 'register'
          }
        },
        packages: {
          'test/unit': {
            defaultExtension: 'js'
          },
          'dist': {
            defaultExtension: 'js'
          }
        }
      },
      serveFiles: [
        'dist/**/*.*',
        'jspm_packages/**/*.js'
      ]
    },
    files: [
      'test/dist/setup.js',
      'test/dist/**/*.js',
      'test/dist/*.js'
    ],
    plugins: [
      'karma-systemjs',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-mocha-reporter',
      'karma-junit-reporter',
      'karma-coverage',
      'karma-remap-istanbul'
    ],
    exclude: [],
    preprocessors: {
      'dist/**/*.js': ['coverage']
    },
    reporters: ['mocha', 'coverage', 'karma-remap-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    junitReporter: {
      outputDir: '', // results will be saved as $outputDir/$browserName.xml
      outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: '', // suite will become the package name attribute in xml testsuite element
      useBrowserName: true, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
      properties: {} // key value pair of properties to add to the <properties> section of the report
    },
    // optionally, configure the reporter
    coverageReporter: {
      dir: 'coverage/',
      reporters: [{
        type: 'json',
        subdir: 'coverage'
      }]
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        cobertura: 'coverage/cobertura.xml'
      }
    },
    //  Custom launcher for Travis-CI
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
  });
};