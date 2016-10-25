const argv = require('yargs').argv;
const path = require('path');

const webpack = require('./webpack.config.test');
const rootDir = path.join(__dirname, '..');

module.exports = config => {
  config.set({

    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai'],
    files: [
      path.join(rootDir, 'node_modules', 'babel-polyfill', 'dist', 'polyfill.js'),
      path.join(rootDir, 'node_modules', 'phantomjs-polyfill', 'bind-polyfill.js'),
      path.join(rootDir, 'test', 'client', '**/*.spec.js'),
    ],
    preprocessors: {
      [path.join(rootDir, 'test', 'client', '**/*.spec.js')]: ['webpack', 'sourcemap'],
    },
    webpack: webpack,
    webpackMiddleware: { noInfo: true },
    reporters: ['spec'],
    colors: true,
    autoWatch: true,
    singleRun: !argv.watch,
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-webpack',
      'karma-phantomjs-launcher',
      'karma-spec-reporter',
      'karma-sourcemap-loader',
    ]
  })
}
