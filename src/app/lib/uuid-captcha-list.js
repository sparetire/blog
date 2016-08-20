/* global logger */
const RedisClient = require('./redis-client');
const util = require('../../common/util');

let config = {
	prefix: 'captcha',
	timeout: 30
};
let client = null;
let instance = null;
let flag = true;

function UuidCaptchaList() {
	let self = this instanceof UuidCaptchaList ? this : Object.create(UuidCaptchaList.prototype);
	if (flag) {
		throw new Error('Use UuidCaptchaList.getInstance to get an instance of UuidCaptchaList.');
	}
	if (!util.isFunction(self.has)) {
		UuidCaptchaList.prototype.has = function (uuid) {
			return client.existsAsync(`${config.prefix}${uuid}`).then((reply) => {
				return !!reply;
			});
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
	flag = true;
	return self;
}

UuidCaptchaList.config = function (opts) {
	config = opts || config;
	instance = null;
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