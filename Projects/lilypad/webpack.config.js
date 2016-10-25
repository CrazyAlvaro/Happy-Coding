const path = require('path');

module.exports = {
  entry: './app/js/index.js',
  output: {
    path: path.join(__dirname, 'app', 'assets'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: [
      "", ".js", ".jsx",
    ],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?&/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0'],
        },
      },
    ],
  },
}
