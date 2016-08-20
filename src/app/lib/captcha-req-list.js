/* global logger */
const RedisClient = require('./redis-client');
const util = require('../../common/util');

let startTimePrefix = 'starttime';
let requestCountPrefix = 'count';
let config = {
	prefix: 'rc',
	timeout: 30
};
let client = null;
let instance = null;
let flag = true;

function CaptchaReqList() {
	let self = this instanceof CaptchaReqList ? this : Object.create(CaptchaReqList.prototype);
	if (flag) {
		throw new Error('Use CaptchaReqList.getInstance to get an instance of CaptchaReqList.');
	}
	if (!util.isFunction(self.has)) {
		CaptchaReqList.prototype.has = function (ip) {
			return client.existsAsync(`${config.prefix}${startTimePrefix}${ip}`).then((reply) => {
				return !!reply;
			});
		};
	}
	if (!util.isFunction(self.addOrUpdate)) {
		CaptchaReqList.prototype.addOrUpdate = function (ip, timeout) {
			let startTimeKey = `${config.prefix}${startTimePrefix}${ip}`;
			let countKey = `${config.prefix}${requestCountPrefix}${ip}`;
			// 非原子性，可能有隐患
			client.set(startTimeKey, (new Date()).getTime());
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
	flag = true;
	return self;
}

CaptchaReqList.config = function (opts) {
	config = opts || config;
	instance = null;
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