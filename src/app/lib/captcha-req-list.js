/* global logger */
const RedisClient = require('./redis-client');
const util = require('../../common/util');
// 记录每个ip在一定时间内请求验证码的次数的池

let startTimePrefix = 'starttime';
let requestCountPrefix = 'count';
// 默认记录一个小时内请求验证码的次数
let defaultTimeout = 3600;
let config = {
	prefix: 'rc',
	timeout: defaultTimeout
};
let client = null;
let instance = null;
let flag = true;

function CaptchaReqList() {
	let self = this instanceof CaptchaReqList ? this : Object.create(
		CaptchaReqList.prototype);
	if (flag) {
		throw new Error(
			'Use CaptchaReqList.getInstance to get an instance of CaptchaReqList.');
	}
	if (!util.isFunction(self.has)) {
		CaptchaReqList.prototype.has = function (ip) {
			return client.existsAsync(`${config.prefix}${startTimePrefix}${ip}`)
				.then(reply =>
					!!reply
				);
		};
	}
	if (!util.isFunction(self.addOrUpdate)) {
		CaptchaReqList.prototype.addOrUpdate = function (ip, timeout) {
			let startTimeKey = `${config.prefix}${startTimePrefix}${ip}`;
			let countKey = `${config.prefix}${requestCountPrefix}${ip}`;
			// 非原子性，可能有隐患
			client.set(startTimeKey, (new Date())
				.getTime());
			client.expire(startTimeKey, timeout || config.timeout);
			client.set(countKey, '0');
			client.expire(countKey, timeout || config.timeout);
		};
	}
	if (!util.isFunction(self.del)) {
		CaptchaReqList.prototype.del = function (ip) {
			let startTimeKey = `${config.prefix}${startTimePrefix}${ip}`;
			let countKey = `${config.prefix}${requestCountPrefix}${ip}`;
			client.del(startTimeKey);
			client.del(countKey);
		};
	}
	if (!util.isFunction(self.get)) {
		CaptchaReqList.prototype.get = function* (ip) {
			let startTimeKey = `${config.prefix}${startTimePrefix}${ip}`;
			let countKey = `${config.prefix}${requestCountPrefix}${ip}`;
			let startTime = parseInt(yield client.getAsync(startTimeKey), 10);
			let requestCount = parseInt(yield client.getAsync(countKey), 10);
			return {
				startTime,
				requestCount
			};
		};
	}
	if (!util.isFunction(self.incr)) {
		CaptchaReqList.prototype.incr = function (ip) {
			let countKey = `${config.prefix}${requestCountPrefix}${ip}`;
			client.incr(countKey);
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

CaptchaReqList.config = function (opts) {
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

CaptchaReqList.getInstance = function () {
	if (!instance) {
		flag = false;
		client = RedisClient.getInstance();
		instance = new CaptchaReqList();
	}
	return instance;
};


module.exports = CaptchaReqList;