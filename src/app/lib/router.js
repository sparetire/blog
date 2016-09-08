const routerMap = require('../config/router-map');
const KoaRouter = require('koa-router');

let router = new KoaRouter();

for (let key in routerMap) {
	let item = routerMap[key];
	let method = item.method;
	router[method](item.name, item.path, item.controller);
}

module.exports = router;