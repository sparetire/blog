const winston = require('winston');
const render = require('koa-ejs');
const path = require('path');
const RedisClient = require('./lib/redis-client');
const config = require('./config/app.conf');
const APIConfig = require('./api.conf');
const API = require('../common/APIs');
const RequestWrapper = require('./RequestWrapper');
const routerMap = require('./config/routerMap');

function init(app) {
	let APIs = new API(APIConfig, RequestWrapper);
	render(app, {
		root: path.resolve(__dirname, 'view'),
		layout: 'template',
		viewExt: 'html',
		cache: false,
		debug: true
	});
	let logger = new(winston.Logger)({
		exitOnError: false,
		transports: [
			new(winston.transports.File)({
				name: 'info-file',
				filename: path.resolve(__dirname, './log/info.log'),
				maxsize: 5000000,
				level: 'info'
			}),
			new(winston.transports.File)({
				name: 'error-file',
				filename: path.resolve(__dirname, './log/error.log'),
				maxsize: 5000000,
				level: 'error'
			})
		]
	});
	// winston.remove(winston.transports.Console);
	global.logger = logger;
	global.routerMap = routerMap;
	app.context.routerMap = routerMap;
	RedisClient.config(config.redis);
	logger.info('Koa app is initializing...');
}

module.exports = init;