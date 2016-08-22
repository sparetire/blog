const winston = require('winston');
const path = require('path');
const RedisClient = require('./lib/redis-client');
const config = require('./config/app.conf');
const APIConfig = require('./api.conf');
const API = require('../common/APIs');
const RequestWrapper = require('./RequestWrapper');

function init(app) {
	let APIs = new API(APIConfig, RequestWrapper);
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
	RedisClient.config(config.redis);
	logger.info('Koa app is initializing...');
}

module.exports = init;