const Koa = require('koa');
const KoaStatic = require('koa-static');
const KoaRouter = require('koa-router');
const getRawBody = require('raw-body');
const path = require('path');
const RequestWrapper = require('./RequestWrapper');
const APIConfig = require('./api.conf');
const API = require('../common/APIs');

let APIs = new API(APIConfig, RequestWrapper);
let router = new KoaRouter();
router.get('/articles', function* (next) {
		this.body = {
			total: 43,
			articleList: [{
				title: 'Hello',
				content: '# Marked in browser\n\nRendered by **marked**.',
				author: 'Sparetire',
				views: 50,
				timeStamp: 1470751691242,
				year: 2016,
				month: 8,
				day: 10,
				id: '1'
			}, {
				title: 'Hello',
				content: '# Marked in browser\n\nRendered by **marked**.',
				author: 'Sparetire',
				views: 50,
				timeStamp: 1470751691242,
				year: 2016,
				month: 8,
				day: 10,
				id: '2'
			}, {
				title: 'Hello',
				content: '# Marked in browser\n\nRendered by **marked**.',
				author: 'Sparetire',
				views: 50,
				timeStamp: 1470751691242,
				year: 2016,
				month: 8,
				day: 10,
				id: '3'
			}, {
				title: 'Hello',
				content: '# Marked in browser\n\nRendered by **marked**.',
				author: 'Sparetire',
				views: 50,
				timeStamp: 1470751691242,
				year: 2016,
				month: 8,
				day: 10,
				id: '4'
			}, {
				title: 'Hello',
				content: '# Marked in browser\n\nRendered by **marked**.',
				author: 'Sparetire',
				views: 50,
				timeStamp: 1470751691242,
				year: 2016,
				month: 8,
				day: 10,
				id: '5'
			}]
		};
		return;
	})
	.post('/post', function* (next) {
		this.body = {
			title: 'Hello',
			content: '# Marked in browser\n\nRendered by **marked**.',
			author: 'Sparetire',
			views: 50,
			timeStamp: 1470751691242,
			year: 2016,
			month: 8,
			day: 10,
			id: '4'
		};
		return;
	})
	.get('/archives', function* (next) {
		this.body = {
			total: 23,
			archiveList: [{
				year: 2016,
				month: 8,
				posts: [{
					title: 'Hello',
					id: '1'
				}, {
					title: 'Hello',
					id: '1'
				}, {
					title: 'Hello',
					id: '1'
				}, {
					title: 'Hello',
					id: '1'
				}]
			}, {
				year: 2016,
				month: 8,
				posts: [{
					title: 'Hello',
					id: '1'
				}, {
					title: 'Hello',
					id: '1'
				}, {
					title: 'Hello',
					id: '1'
				}, {
					title: 'Hello',
					id: '1'
				}]
			}, {
				year: 2016,
				month: 8,
				posts: [{
					title: 'Hello',
					id: '1'
				}, {
					title: 'Hello',
					id: '1'
				}, {
					title: 'Hello',
					id: '1'
				}, {
					title: 'Hello',
					id: '1'
				}]
			}]
		};
		return;
	})
	.get('/tags', function* (next) {
		let temp = [{
			name: 'Linux',
			titles: [{
				title: 'Hello0',
				id: 0
			}, {
				title: 'Hello1',
				id: 1
			}, {
				title: 'Hello2',
				id: 2
			}]
		}, {
			name: 'Javascript',
			titles: [{
				title: 'Hello3',
				id: 0
			}, {
				title: 'Hello4',
				id: 1
			}, {
				title: 'Hello5',
				id: 2
			}]
		}, {
			name: 'Security',
			titles: [{
				title: 'Hello6',
				id: 0
			}, {
				title: 'Hello7',
				id: 1
			}, {
				title: 'Hello8',
				id: 2
			}]
		}, {
			name: 'Node',
			titles: [{
				title: 'Hello9',
				id: 0
			}, {
				title: 'Hello10',
				id: 1
			}, {
				title: 'Hello0',
				id: 2
			}]
		}, {
			name: 'CSS',
			titles: [{
				title: 'Hello1',
				id: 0
			}, {
				title: 'Hello2',
				id: 1
			}, {
				title: 'Hello3',
				id: 2
			}]
		}, {
			name: 'HTML',
			titles: [{
				title: 'Hello4',
				id: 0
			}, {
				title: 'Hello5',
				id: 1
			}, {
				title: 'Hello6',
				id: 2
			}]
		}];
		let tagList = temp.concat(temp)
			.concat(temp)
			.concat(temp)
			.concat(temp);
		this.body = {
			total: 20,
			tagList
		};
		return;
	});

// setTimeout(function () {
// 	APIs.test.post({
// 			page: 1
// 		}, {
// 			queryString: {
// 				wtf: 2
// 			}
// 		})
// 		.then((data) => {
// 			console.log(data[2]);
// 		});
// }, 5000);

let app = new Koa();

app.use(KoaStatic(path.resolve(__dirname, '../../dist')))
	.use(router.routes())
	.use(function* (next) {
		let ctx = this;
		let body = yield getRawBody(ctx.req, {
			length: ctx.request.length,
			limit: '1mb',
			encoding: 'utf8'
		});
		console.log(this.url);
		console.log(body);
	});

app.listen(80);