/* global logger */
const RedisClient = require('./redis-client');
const util = require('../../common/util');
// 记录每个ip在一定时间内授权失败次数的池

let startTimePrefix = 'starttime';
let errorCountPrefix = 'count';
// 默认记录一个小时内的失败次数
let defaultTimeout = 3600;
let config = {
	prefix: 'autherr',
	timeout: defaultTimeout
};
let client = null;
let instance = null;
let flag = true;

function AuthErrList() {
	let self = this instanceof AuthErrList ? this : Object.create(AuthErrList.prototype);
	if (flag) {
		throw new Error(
			'Use AuthErrList.getInstance to get an instance of AuthErrList.');
	}
	if (!util.isFunction(self.has)) {
		AuthErrList.prototype.has = function (ip) {
			return client.existsAsync(`${config.prefix}${startTimePrefix}${ip}`)
				.then(reply => !!reply);
		};
	}
	if (!util.isFunction(self.addOrUpdate)) {
		AuthErrList.prototype.addOrUpdate = function (ip, timeout) {
			let startTimeKey = `${config.prefix}${startTimePrefix}${ip}`;
			let countKey = `${config.prefix}${errorCountPrefix}${ip}`;
			client.set(startTimeKey, (new Date())
				.getTime());
			client.expire(startTimeKey, timeout || config.timeout);
			client.set(countKey, '0');
			client.expire(countKey, timeout || config.timeout);
		};
	}
	if (!util.isFunction(self.incr)) {
		AuthErrList.prototype.incr = function (ip) {
			let countKey = `${config.prefix}${errorCountPrefix}${ip}`;
			client.incr(countKey);
		};
	}
	if (!util.isFunction(self.del)) {
		AuthErrList.prototype.del = function (ip) {
			let startTimeKey = `${config.prefix}${startTimePrefix}${ip}`;
			let countKey = `${config.prefix}${errorCountPrefix}${ip}`;
			client.del(startTimeKey);
			client.del(countKey);
		};
	}
	if (!util.isFunction(self.get)) {
		AuthErrList.prototype.get = function* (ip) {
			let startTimeKey = `${config.prefix}${startTimePrefix}${ip}`;
			let countKey = `${config.prefix}${errorCountPrefix}${ip}`;
			let startTime = parseInt(yield client.getAsync(startTimeKey), 10);
			let errorCount = parseInt(yield client.getAsync(countKey), 10);
			return {
				startTime,
				errorCount
			};
		};
	}
	self.DEFAULT_TIMEOUT = config.timeout;
	Object.defineProperties(self, {
		DEFAULT_TIMEOUT: {
			configurable: false,
			writable: false
		}
	});
	flag = true;
	return self;
}

AuthErrList.config = function (opts) {
	config = opts || config;
	instance = null;
	Object.defineProperties(config, {
		prefix: {
			configurable: false,
			writable: false
		},
		timeout: {
			configurable: false,
			writable: false
		}
	});
};

AuthErrList.getInstance = function () {
	if (!instance) {
		flag = false;
		client = RedisClient.getInstance();
		instance = new AuthErrList();
	}
	return instance;
};


module.exports = AuthErrList;