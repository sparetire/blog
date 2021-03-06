/* global logger */
const RedisClient = require('./redis-client');
const util = require('../../common/util');

// 记录每个uuid/session对应的token，token有失效期

// 默认token三小时失效
let defaultTimeout = 10800;
let config = {
	prefix: 'UuidToken',
	timeout: defaultTimeout
};
let client = null;
let instance = null;
let flag = true;

function UuidTokenList() {
	let self = this instanceof UuidTokenList ? this : Object.create(UuidTokenList.prototype);
	if (flag) {
		throw new Error(
			'Use UuidTokenList.getInstance to get an instance of UuidTokenList.');
	}
	if (!util.isFunction(self.has)) {
		UuidTokenList.prototype.has = function (uuid) {
			return client.existsAsync(`${config.prefix}${uuid}`)
				.then(reply => !!reply);
		};
	}
	if (!util.isFunction(self.addOrUpdate)) {
		UuidTokenList.prototype.addOrUpdate = function (uuid, token, timeout) {
			let key = `${config.prefix}${uuid}`;
			client.set(key, token);
			client.expire(key, timeout || config.timeout);
		};
	}
	if (!util.isFunction(self.del)) {
		UuidTokenList.prototype.del = function (uuid) {
			let key = `${config.prefix}${uuid}`;
			client.del(key);
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

UuidTokenList.config = function (opts) {
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

UuidTokenList.getInstance = function () {
	if (!instance) {
		flag = false;
		client = RedisClient.getInstance();
		instance = new UuidTokenList();
	}
	return instance;
};


module.exports = UuidTokenList;