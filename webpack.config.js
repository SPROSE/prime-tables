const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'src/client/public');
const APP_DIR = path.resolve(__dirname, 'src/client/app');

const config = {
	entry: APP_DIR + '/index.jsx',
	output: {
		path: BUILD_DIR,
		filename: 'main.bundle.js'
	},
	module: {
		rules: [
			{
				loader: 'babel-loader',
				query: {
					babelrc: false,
					plugins: ['babel-plugin-transform-object-rest-spread'].map(require.resolve),
					presets: ['babel-preset-react','babel-preset-env'].map(require.resolve)
				}
			}
		]
	},
	resolve: {
		modules: [
			path.resolve(__dirname, "node_modules")
		]
	}
};

module.exports = config;
