var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'public/build');
var APP_DIR = path.resolve(__dirname, 'src');

module.exports = {

	entry: {

		layout: './src/layout.jsx'
		//error: './src/layouts/error.layout.js',
		//home: './src/layouts/home.layout.js',
		//surveyEditor: './src/layouts/survey-editor.layout.js',
		//surveyList: './src/layouts/survey-list.layout.js'
	},
	output: {

		path: BUILD_DIR,
		filename: 'bundle.js'
		//filename: `public/build/[name].bundle.js`,
		//sourceMapFilename: 'public/build/[name].bundle.map'
	},
	//devtool: '#source-map',
	module: {

		loaders: [{

			test: /\.jsx?/,
			exclude: /(node_modules)/,
			include: APP_DIR,
			loader: 'babel-loader',
			query: {

				presets: ['react', 'es2015']
			}
		}]
	}
};