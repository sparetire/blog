/* global logger */
const RedisClient = require('./redis-client');
const util = require('../../common/util');

// 只记录token是否存在，token有失效期

// 默认token三小时失效
let defaultTimeout = 10800;
let config = {
	prefix: 'Token',
	timeout: defaultTimeout
};
let client = null;
let instance = null;
let flag = true;

function TokenList() {
	let self = this instanceof TokenList ? this : Object.create(TokenList.prototype);
	if (flag) {
		throw new Error(
			'Use TokenList.getInstance to get an instance of TokenList.');
	}
	if (!util.isFunction(self.has)) {
		TokenList.prototype.has = function (token) {
			return client.existsAsync(`${config.prefix}${token}`)
				.then(reply => !!reply);
		};
	}
	if (!util.isFunction(self.addOrUpdate)) {
		TokenList.prototype.addOrUpdate = function (token, timeout) {
			let key = `${config.prefix}${token}`;
			client.set(key, '1');
			client.expire(key, timeout || config.timeout);
		};
	}
	if (!util.isFunction(self.del)) {
		TokenList.prototype.del = function (token) {
			let key = `${config.prefix}${token}`;
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

TokenList.config = function (opts) {
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

TokenList.getInstance = function () {
	if (!instance) {
		flag = false;
		client = RedisClient.getInstance();
		instance = new TokenList();
	}
	return instance;
};


module.exports = TokenList;