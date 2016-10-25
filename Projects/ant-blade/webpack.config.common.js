var path = require('path');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var atImport = require('postcss-import');
var cssnano = require('cssnano');
var lost = require('lost');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/',
    filename: '[name].js'
  },
  resolve: {
    extensions: [
      "", ".js", ".jsx"
    ],
    alias: {
      'ag-grid': path.resolve(__dirname, 'src/components/MDGrid/ag-grid'),
      'ag-grid-enterprise': path.resolve(__dirname, 'src/components/MDGrid/ag-grid-enterprise')
    }
  },
  postcss: function() {
    return [lost, atImport, autoprefixer, precss, cssnano];
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'common')],
        loader: 'babel'
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src'),
        loader: 'style!css?localIdentName=[name]-[local]-[hash:base64:5]!postcss'
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'node_modules'),
        loader: 'style!css'
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ],
    preLoaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loader: "eslint-loader"
      }
    ],
  }
}
