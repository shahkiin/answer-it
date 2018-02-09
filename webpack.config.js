var path = require('path');
// var BUILD_DIR = path.resolve(__dirname, 'public/build');
// var APP_DIR = path.resolve(__dirname, 'src');

module.exports = {

	// entry: './src/layout.jsx',
	// output: {

	// 	path: BUILD_DIR,
	// 	filename: 'bundle.js'
	// },
	// module: {

	// 	rules: [
	// 		{
	// 			test: /\.jsx?/,
	// 			exclude: /(node_modules)/,
	// 			include: APP_DIR,
	// 			loader: 'babel-loader',
	// 			query: {

	// 				presets: ['react', 'es2015']
	// 			}
	// 		},
	// 	]
	// }
	entry: path.join(__dirname, '/client/src/app.jsx'),
	output: {
		path: path.resolve(__dirname, 'public/build'),
		filename: 'bundle.js',
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			include: path.join(__dirname, '/client/src'),
			loader: 'babel-loader',
			query: {
				presets: ["react", "es2015"]
			}
		}],
	},
	// watch: true
};