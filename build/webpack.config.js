const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const SCRIPT_PATH = path.resolve(APP_PATH, 'scripts');
const STYLE_PATH = path.resolve(APP_PATH, 'styles');
const TEMPLATE_PATH = path.resolve(APP_PATH, 'templates');
const MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

const Webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ProvidePlugin = Webpack.ProvidePlugin;

const CommonChunkPlugin = Webpack.optimize.CommonsChunkPlugin;

// 1
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const extractSass = new ExtractTextPlugin('styles/[name][contenthash].css');

// 2
const autoprefixer = require('autoprefixer');

// 3
// const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

// 4
// const definePlugin = new webpack.DefinePlugin({
// 	__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
// 	__RELEASE__: JSON.stringify(JSON.parse(process.env.RELEASE || 'false'))
// });


module.exports = {
	target: 'web',
	cache: true,
	entry: {
		main: path.resolve(SCRIPT_PATH, 'main.js'),
		vendor: ['vue', 'jquery']
	},
	output: {
		path: BUILD_PATH,
		// publicPath: 'cdn'
		filename: 'scripts/[name].min.js',
		chunkFilename: 'scripts/[name].[id].js',
		sourceMapFilename: 'sourcemap/[name].js.map'
	},
	module: {
		preLoaders: [{
			test: /\.(jsx?|vue)$/,
			exclude: MODULE_PATH,
			loader: 'eslint-loader'
		}],
		loaders: [{
			test: /\.(png|jpg)$/,
			include: APP_PATH,
			loader: 'url',
			query: {
				limit: 4000,
				name: 'images/[name].[ext]?[hash]'
			}
		}, {
			test: /\.css/,
			include: STYLE_PATH,
			loader: 'style!css!postcss'
		}, {
			test: /\.s[ac]ss$/,
			include: STYLE_PATH,
			// 1
			// loader: extractSass.extract('style-loader',
			// 		'css-loader?sourceMap!sass-loader?sourceMap', {
			// 			publicPath: 'http://localhost/build/'
			// 		})
			loader: 'style-loader!css-loader!postcss-loader!sass-loader?sourceMap'
		}, {
			test: /\.vue$/,
			include: APP_PATH,
			loader: 'vue'
		}, {
			test: /\.jsx?$/,
			include: SCRIPT_PATH,
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
			test: require.resolve('vue'),
			loader: 'expose?Vue'
		}, {
			test: require.resolve('jquery'),
			loader: 'expose?$!expose?jQuery'
		}]
	},
	plugins: [
		// 1
		// extractSass,
		// 4
		// definePlugin,
		// 3
		// new UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false
		// 	},
		// 	sourceMap: true
		// }),
		// new HtmlwebpackPlugin({
		// 	title: 'canvas demo'
		// })
		new HtmlWebpackPlugin({
			title: 'index',
			filename: 'index.html',
			template: path.resolve(TEMPLATE_PATH, 'index.ejs'),
			chunks: ['main', 'common'],
			inject: 'body',
			minify: {
				collapseWhitespace: true,
				minifyJS: true
			}
		}),
		new ProvidePlugin({
			Vue: 'vue',
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
		new CommonChunkPlugin({
			name: 'common',
			filename: 'vendor.js',
			minChunks: Infinity
		})
	],
	resolve: {
		root: APP_PATH,
		extensions: ['', '.webpack.js', '.web.js', '.js', '.vue', '.scss', 'sass']
	},
	externals: {
		// jquery: 'jQuery'
	},
	eslint: {
		configFile: '.eslintrc.js'
	},
	// 2
	postcss: [autoprefixer({
		browsers: ['last 3 versions']
	})],
	vue: {
		autoprefixer: {
			browsers: ['last 3 versions']
		},
		// 1
		// loaders: {
		// 	css: extractSass.extract('css'),
		// 	sass: extractSass.extract('css!sass')
		// }
	},
	devServer: {
		port: 8080,
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	},
	devtool: 'source-map'
};