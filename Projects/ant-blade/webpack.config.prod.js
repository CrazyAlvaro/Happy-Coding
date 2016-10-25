var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var common = require('./webpack.config.common');

module.exports = _.merge({}, common, {
  devtool: null,
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/index'),
  ],
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
});
