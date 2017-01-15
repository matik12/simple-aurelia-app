// this file provides a list of unbundled files that
// need to be included when exporting the application
// for production.
module.exports = {
  'list': [
    'index.html',
    'config.js',
    'favicon.ico',
    "jspm_packages/npm/bluebird@3.4.1/js/browser/bluebird.min.js",
    'jspm_packages/system.js',
    'jspm_packages/system-polyfills.js',
    'jspm_packages/system-csp-production.js',
    'jspm_packages/github/systemjs/plugin-json@0.1.2.js',
    'jspm_packages/github/systemjs/plugin-json@0.1.2/*.js',
    'jspm_packages/npm/jquery@2.2.4/dist/jquery.min.js',
    'styles/main.css'
  ],
  // this section lists any jspm packages that have
  // unbundled resources that need to be exported.
  // these files are in versioned folders and thus
  // must be 'normalized' by jspm to get the proper
  // path.
  'normalize': [ ]
};
