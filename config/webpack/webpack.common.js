const path = require('path');
const rootDir = path.resolve(__dirname, '..', '..');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		app: [path.resolve(rootDir, 'src', 'bootstrap')],
		vendor: [path.resolve(rootDir, 'src', 'vendor')],
		polyfills: [path.resolve(rootDir, 'src', 'polyfills')]
	},
	resolve: {
		modules: ['src', 'app', 'node_modules'],
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loaders: [
					{
						loader: 'awesome-typescript-loader',
						options: { configFileName: path.resolve(rootDir, 'tsconfig.json') }
					},
					'angular2-template-loader'
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
				loader: 'file-loader?name=assets/[name].[hash].[ext]'
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.css$/,
				exclude: path.resolve(rootDir, 'src', 'app'),
				loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap' })
			},
			{
				test: /\.css$/,
				include: path.resolve(rootDir, 'src', 'app'),
				loader: 'raw-loader'
			}
		]
	},
	plugins: [
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)@angular/,
			path.resolve(rootDir, 'src'), // location of your src
			{} // a map of your routes
		),
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		}),

		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	]
}
