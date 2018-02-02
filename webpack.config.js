var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'public/build');
var APP_DIR = path.resolve(__dirname, 'src');

module.exports = {

	entry: './src/layout.jsx',
	output: {

		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	module: {

		rules: [
			{
				test: /\.jsx?/,
				exclude: /(node_modules)/,
				include: APP_DIR,
				loader: 'babel-loader',
				query: {

					presets: ['react', 'es2015']
				}
			},
		]
	}
};