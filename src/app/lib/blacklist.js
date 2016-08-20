/* global logger */
const RedisClient = require('./redis-client');
const util = require('../../common/util');

let config = {
	prefix: 'blacklist',
	timeout: 30
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
			return client.existsAsync(`${config.prefix}${ip}`).then((reply) => {
				return !!reply;
			});
		};
	}
	if (!util.isFunction(self.addOrUpdate)) {
		BlackList.prototype.addOrUpdate = function (ip, timeout) {
			let key = `${config.prefix}${ip}`;
			client.set(key, ip);
			client.expire(key, timeout || config.timeout);
		};
	}
	flag = true;
	return self;
}

BlackList.config = function (opts) {
	config = opts || config;
	instance = null;
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