const util = require('../../common/util');
const URL = require('url');
const MongoClient = require('mongodb')
	.MongoClient;
const QueryString = require('querystring');

/* global logger */

let DBClientFactory = {};


DBClientFactory.stringify = function (connectionCfg) {
	let conf = {};
	for (let key in connectionCfg) {
		conf[key] = connectionCfg[key];
	}

	let urlObj = {
		protocol: 'mongodb',
		slashes: true,
		auth: `${conf.username}:${conf.password}`,
		hostname: conf.host,
		port: conf.port,
		pathname: `/${conf.dbName}`
	};

	delete conf.username;
	delete conf.password;
	delete conf.host;
	delete conf.port;
	delete conf.dbName;

	let qs = QueryString.stringify(conf);
	let url = URL.format(urlObj);

	if (util.isEmptyStr(qs)) {
		return url;
	} else {
		return url + '?' + qs;
	}

};

DBClientFactory.getClient = function (opts, dft) {
	if (!util.isObject(opts)) {
		throw new Error('Config must be an object.');
	}

	let conf = dft ? JSON.parse(JSON.stringify(dft)) : {};
	for (let key in opts) {
		conf[key] = opts[key];
	}

	if (!conf.username) {
		throw new Error('You must set a username.');
	} else if (!conf.password) {
		throw new Error('You must set a password.');
	} else if (!conf.host) {
		throw new Error('You must set a host.');
	} else if (!conf.port) {
		throw new Error('You must set a port.');
	} else if (!conf.dbName) {
		throw new Error('You must set a database name.');
	}

	let url = DBClientFactory.stringify(conf);
	return MongoClient.connect(url)
		.then(db => {
			db.url = url;
			db.name = conf.dbName;
			return db;
		});
};

module.exports = DBClientFactory;