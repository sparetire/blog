/* global logger */
const redis = require('redis');
const Promise = require('bluebird');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);
let config = {};
let instance = null;
let flag = true;
let client = null;

function RedisClient() {
	let self = this instanceof RedisClient ? this : Object.create(RedisClient.prototype);
	if (flag) {
		throw new Error('Use Redis.getInstance to get an instance of Redis.');
	}
	flag = true;
	return self;
}

RedisClient.config = function (opts) {
	config = opts;
	instance = null;
};

RedisClient.getInstance = function () {
	if (!instance) {
		flag = false;
		client = redis.createClient(config);
		client.on('error', err => {
			logger.error(`Redis Error:${err}`);
		});
		client.on('ready', function () {
			logger.info('Redis has been connected.');
		});
		RedisClient.prototype = client;
		instance = new RedisClient();
	}
	return instance;
};


module.exports = RedisClient;