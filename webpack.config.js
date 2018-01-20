var path = require('path');

module.exports = {

	entry: {

		error: './src/layouts/error.layout.js',
		home: './src/layouts/home.layout.js',
		surveyEditor: './src/layouts/survey-editor.layout.js',
		surveyList: './src/layouts/survey-list.layout.js'
	},
	output: {

		//path: path.resolve(__dirname, 'dist'),
		//filename: 'test.bundle.js'
		filename: `public/build/[name].bundle.js`,
		sourceMapFilename: 'public/build/[name].bundle.map'
	},
	devtool: '#source-map',
	module: {

		loaders: [{

			test: /\.js$/,
			exclude: /(node_modules)/,
			loader: 'babel-loader',
			query: {

				presets: ['react', 'es2015']
			}
		}]
	}
};