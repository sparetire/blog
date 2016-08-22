/* global logger */
const RedisClient = require('./redis-client');
const util = require('../../common/util');
// ip黑名单，封锁一定时间

// 默认封锁5小时
let defaultTimeout = 18000;
let config = {
	prefix: 'blacklist',
	timeout: defaultTimeout
};
let client = null;
let instance = null;
let flag = true;

function BlackList() {
	let self = this instanceof BlackList ? this : Object.create(BlackList.prototype);
	if (flag) {
		throw new Error('Use BlackList.getInstance to get an instance of BlackList.');
	}
	if (!util.isFunction(self.has)) {
		BlackList.prototype.has = function (ip) {
			return client.existsAsync(`${config.prefix}${ip}`).then(reply => !!reply);
		};
	}
	if (!util.isFunction(self.addOrUpdate)) {
		BlackList.prototype.addOrUpdate = function (ip, timeout) {
			let key = `${config.prefix}${ip}`;
			client.set(key, ip);
			client.expire(key, timeout || config.timeout);
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

BlackList.config = function (opts) {
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

BlackList.getInstance = function () {
	if (!instance) {
		flag = false;
		client = RedisClient.getInstance();
		instance = new BlackList();
	}
	return instance;
};


module.exports = BlackList;