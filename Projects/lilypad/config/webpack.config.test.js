const path = require('path');
const rootDir = path.join(__dirname, '..');

module.exports = {
	devtool: 'inline-source-map',
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
		],
	},
	externals: {
		mocha: 'window',
	}
}
