//Setting up automated tests using Karma

var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/foundation-sites/dist/js/foundation.min.js',
      'app/tests/**/*.test.jsx'
    ],
    preprocessors: {
      //For this set of tests, run these things, (webpack to build it, sourcemap to get real line numbers, not bundle.js)
      'app/tests/**/*.test.jsx': ['webpack', 'sourcemap']
    },
    reporters: ['mocha'],
    client: {
      //Sent settings to Mocha
      mocha: {
        timeout: '5000' //Fail after 5 second timeout
      }
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
}
