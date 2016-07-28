const Koa = require('koa');
const KoaStatic = require('koa-static');
const getRawBody = require('raw-body');
const path = require('path');
const RequestWrapper = require('./RequestWrapper');
const APIConfig = require('./api.conf');
const API = require('../common/APIs');

let APIs = new API(APIConfig, RequestWrapper);

setTimeout(function () {
	APIs.test.post({
			page: 1
		}, {
			queryString: {
				wtf: 2
			}
		})
		.then((data) => {
			console.log(data[2]);
		});
}, 5000);

let app = new Koa();

app.use(KoaStatic(path.resolve(__dirname, '../../dist')))
	.use(function* (next) {
		let ctx = this;
		let body = yield getRawBody(ctx.req, {
			length: ctx.request.length,
			limit: '1mb',
			encoding: 'utf8'
		});
		console.log(this.url);
		console.log(body);
		this.body = {
			name: 'Hello'
		};
	});

app.listen(80);