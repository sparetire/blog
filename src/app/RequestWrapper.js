const request = require('request');
const Promise = require('bluebird');
const util = require('../common/util');


function RequestWrapper(method, url, bodyOpts, bodyType) {
	if (method.toUpperCase() === 'GET') {
		if (util.isObject(bodyOpts)) {
			bodyOpts.url = url;
			bodyOpts.method = method;
			return new Promise(function (resolve, reject) {
				request(bodyOpts, function (err, resp, body) {
					resolve([err, resp, body]);
				});
			});
		} else {
			return new Promise(function (resolve, reject) {
				request(url, function (err, resp, body) {
					resolve([err, resp, body]);
				});
			});
		}
	} else if (method.toUpperCase() === 'POST') {
		if (util.isObject(bodyOpts)) {
			bodyOpts.url = url;
			bodyOpts.method = method.toUpperCase();
			return new Promise(function (resolve, reject) {
				request(bodyOpts, function (err, resp, body) {
					resolve([err, resp, body]);
				});
			});
		} else if (bodyType.toUpperCase() === 'JSON') {
			let options = {};
			options.url = url;
			options.method = method;
			options.body = bodyOpts;
			options.headers = {
				'Content-Type': 'application/json'
			};
			return new Promise(function (resolve, reject) {
				request(options, function (err, resp, body) {
					resolve([err, resp, body]);
				});
			});
		} else if (bodyType.toUpperCase() === 'FORM') {
			let options = {};
			options.url = url;
			options.method = method;
			options.body = bodyOpts;
			options.headers = {
				'Content-Type': 'application/x-www-form-urlencoded'
			};
			return new Promise(function (resolve, reject) {
				request(options, function (err, resp, body) {
					resolve([err, resp, body]);
				});
			});
		}
	}
}

module.exports = RequestWrapper;