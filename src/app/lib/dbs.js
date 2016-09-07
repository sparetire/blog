const DBClientFactory = require('./db-client-factory');
const co = require('co');

/* global logger */

let instance = null,
	flag = true,
	config = {};

// 单例，读取一个数据库配置文件，
// 每个数据库连接对象都会被挂载到这个单例上，
// 数据库连接对象即MongoDB驱动的DB对象
function DBs() {
	if (flag) {
		throw new Error(
			'Can\'t use this constructor to get an instance of DBs.');
	}
	let self = this instanceof DBs ? this : Object.create(DBs.prototype);
	flag = true;
	return self;
}

DBs.config = function (opts) {
	config = opts;
};

DBs.DEFAULT = 'default';

DBs.getInstance = function () {
	if (!config) {
		throw new Error('You must configure first. Use DBs.config.');
	}

	if (!instance) {
		flag = false;
		instance = new DBs();

		// 不保证第一个请求到达的时候能完成各个DB对象的实例化
		co(function* () {
				for (let key in config) {
					if (key !== DBs.DEFAULT) {
						instance[key] = yield DBClientFactory.getClient(config[key], config[DBs
							.DEFAULT]);
						Object.defineProperty(instance, key, {
							configurable: false,
							writable: false
						});
					}
				}
			})
			.catch(err => {
				logger.error(`MongoDB connection error:\n${err.stack}`);
			});
	}
	return instance;
};


module.exports = DBs;