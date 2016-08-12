const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '..');
const APP_PATH = path.resolve(ROOT_PATH, 'src/webapp');
const COMPONENTS_PATH = path.resolve(APP_PATH, 'components');
const STYLE_PATH = path.resolve(APP_PATH, 'style');
const MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules');
const OUTPUT_PATH = path.resolve(ROOT_PATH, 'dist');

const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProvidePlugin = Webpack.ProvidePlugin;
const CommonsChunkPlugin = Webpack.optimize.CommonsChunkPlugin;
const autoprefixer = require('autoprefixer');

module.exports = {
	target: 'web',
	cache: true,
	entry: {
		main: path.resolve(APP_PATH, 'main.js')
	},
	output: {
		path: OUTPUT_PATH,
		filename: 'scripts/[name].js',
		chunkFilename: 'scripts/[name].[id].js',
		sourceMapFilename: 'scripts/[name].js.map'
	},
	resolve: {
		root: APP_PATH,
		extensions: ['', '.webpack.js', '.web.js', '.js', '.vue']
	},
	externals: {
		// jquery: 'jQuery'
	},
	eslint: {
		configFile: '.eslintrc.js'
	},
	postcss: [autoprefixer({
		browsers: ['last 3 versions']
	})],
	vue: {
		autoprefixer: {
			browsers: ['last 3 versions']
		},
		loaders: {
			css: 'style!css',
			sass: 'style!css!sass'
		}
	},
	babel: {
		presets: ['es2015'],
		plugins: [
			['transform-runtime', {
				polyfill: true,
				regenerator: true
			}]
		],
		cacheDirectory: true
	},
	devServer: {
		port: 8080,
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	},
	devtool: 'source-map',
	module: {
		preLoaders: [{
			test: /\.(jsx?|vue)$/,
			exclude: MODULE_PATH,
			loader: 'eslint-loader'
		}],
		loaders: [{
			test: /\.vue$/,
			include: APP_PATH,
			loader: 'vue'
		}, {
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015'],
				plugins: [
					['transform-runtime', {
						polyfill: true,
						regenerator: true
					}]
				],
				cacheDirectory: true
			}
		}, {
			test: /\.json$/,
			include: APP_PATH,
			loader: 'json'
		}, {
			test: /\.html$/,
			include: APP_PATH,
			loader: 'vue-html'
		}, {
			test: /\.css/,
			loader: 'style!css!postcss'
		}, {
			test: /\.s[ac]ss$/,
			include: STYLE_PATH,
			loader: 'style-loader!css-loader!postcss-loader!sass-loader?sourceMap'
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url',
			include: APP_PATH,
			query: {
				limit: 10000,
				name: 'images/[name].[ext]?[hash]'
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url',
			include: APP_PATH,
			query: {
				limit: 10000,
				name: 'fonts/[name].[hash:7].[ext]'
			}
		}, {
			test: require.resolve('vue'),
			loader: 'expose?Vue'
		}, {
			test: require.resolve('bluebird'),
			loader: 'expose?Promise'
		}, {
			test: require.resolve('jquery'),
			loader: 'expose?$!expose?jQuery'
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(APP_PATH, 'index.ejs'),
			chunks: ['main', 'common'],
			inject: 'body',
			minify: {
				collapseWhitespace: true,
				minifyJS: true
			}
		}),
		new ProvidePlugin({
			Vue: 'vue',
			Promise: 'bluebird',
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
		new CommonsChunkPlugin({
			name: 'common',
			filename: 'scripts/vendor.js',
			minChunks: Infinity
		})
	]
};