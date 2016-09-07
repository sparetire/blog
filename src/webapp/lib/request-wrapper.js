const VueResource = require('vue-resource');
const Vue = require('vue');
const util = require('../../common/util');

Vue.use(VueResource);

function RequestWrapper(method, url, bodyOpts, bodyType) {
	if (method.toUpperCase() === 'GET') {
		if (util.isObject(bodyOpts)) {
			bodyOpts.url = url;
			return Vue.http.get(url, bodyOpts);
		} else {
			return Vue.http.get(url);
		}
	} else if (method.toUpperCase() === 'POST') {
		if (util.isObject(bodyOpts)) {
			bodyOpts.url = url;
			return Vue.http.post(url, null, bodyOpts);
		} else if (bodyType.toUpperCase() === 'JSON') {
			return Vue.http.post(url, bodyOpts, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} else if (bodyType.toUpperCase() === 'FORM') {
			return Vue.http.post(url, bodyOpts, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
		}
	}
}

module.exports = RequestWrapper;