/* global logger */
const RedisClient = require('./redis-client');
const util = require('../../common/util');

// 记录每个uuid/session对应的验证码，验证码有指定的失效期

// 验证码的默认失效时间
let defaultTimeout = 60;
let config = {
	prefix: 'captcha',
	timeout: defaultTimeout
};
let client = null;
let instance = null;
let flag = true;

function UuidCaptchaList() {
	let self = this instanceof UuidCaptchaList ? this : Object.create(
		UuidCaptchaList.prototype);
	if (flag) {
		throw new Error(
			'Use UuidCaptchaList.getInstance to get an instance of UuidCaptchaList.');
	}
	if (!util.isFunction(self.has)) {
		UuidCaptchaList.prototype.has = function (uuid) {
			return client.existsAsync(`${config.prefix}${uuid}`)
				.then(reply => !!reply);
		};
	}
	// 只能存在一个uuid-验证码，所以要么添加要么覆盖原有验证码
	if (!util.isFunction(self.addOrUpdate)) {
		UuidCaptchaList.prototype.addOrUpdate = function (uuid, captcha, timeout) {
			let key = `${config.prefix}${uuid}`;
			client.set(key, captcha);
			client.expire(key, timeout || config.timeout);
		};
	}
	// 验证码使用过后无论授权成功或失败都要作废，重新生成新的验证码
	if (!util.isFunction(self.del)) {
		UuidCaptchaList.prototype.del = function (uuid) {
			let key = `${config.prefix}${uuid}`;
			client.del(key);
		};
	}
	if (!util.isFunction(self.get)) {
		UuidCaptchaList.prototype.get = function (uuid) {
			let key = `${config.prefix}${uuid}`;
			return client.getAsync(key);
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

UuidCaptchaList.config = function (opts) {
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

UuidCaptchaList.getInstance = function () {
	if (!instance) {
		flag = false;
		client = RedisClient.getInstance();
		instance = new UuidCaptchaList();
	}
	return instance;
};


module.exports = UuidCaptchaList;