const Koa = require('koa');
const KoaStatic = require('koa-static');
const KoaRouter = require('koa-router');
const KoaSession = require('koa-session');
const render = require('koa-ejs');
const getRawBody = require('raw-body');
const sts = require('string-to-stream');
const path = require('path');
const crypto = require('crypto');
const queryString = require('querystring');
const favicon = require('koa-favicon');
const captchagen = require('captchagen');
const uuid = require('node-uuid');
const RequestWrapper = require('./RequestWrapper');
const APIConfig = require('./api.conf');
const API = require('../common/APIs');
const init = require('./init');
const captcha = require('./controller/captcha');
const authorize = require('./controller/authorize');

// 模拟redis
let redis = {
	//redis验证码队列
	captcha: {},
	//redis请求验证码统计队列
	reqCaptcha: {},
	error: {},
	token: {}
};
let blacklist = {};
// token生成密钥
let secret = 'sparetire';
// 指定加密算法和密钥生成加密器
// let cryptor = crypto.createHmac('sha256', secret);
// 注意到时候要为每个ip session提供一个删除句柄
let rmIP = null;
let rmErrIP = null;
let rmToken = null;
let rmCaptcha = null;
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
	})
	.get('/about', function* (next) {
		this.body = {
			content: `# About me

// CWOWER, 想看见更大的世界, 渴望成为魔法师



## 技能树

什么都会一点	, 什么都不精。。据说多写点就能和大牛谈笑风生

* 前端相关: JS(自觉还可以)/HTML/CSS/Vue/Angular(会一点)/Webpack/Sass(会一点)/D3(正在学)/JQuery
* 后端相关: NodeJS/PHP(很久没写了)/Java(一段时间没写了)/Koa/Spring&Spring MVC/Mybatis/Maven
* 版本控制: Git
* 开发工具: VS Code/Vim/IntelliJ IDEA
* 数据库: MySQL(不会优化)
* 网络协议: TCP(大概了解)/HTTP(比较熟悉)
* Linux(会用)
* 设计模式(只会几个)
* Android(也写上吧。。)`
		};
		return;
	})
	// .get('/captcha', function* (next) {
	// 	let session = this.session;
	// 	let captcha = captchagen.create({
	// 		height: 38,
	// 		width: 120,
	// 		font: 'Microsoft Yahei'
	// 	});
	// 	captcha.generate();
	// 	// 设置session最大无响应时间，单位ms
	// 	session.maxAge = 20000;
	// 	// 如果是新session就给session设置一个uuid，uuid和session一一对应
	// 	// 需要一个额外id变量的原因是可能删除redis[session.id]的时候session的id已经变了
	// 	let id = session.uuid = session.isNew ? uuid.v4() : session.uuid || uuid.v4();
	// 	// uuid作为key，验证码作为value存入redis
	// 	redis.captcha[id] = captcha.text();
	// 	console.log(redis.captcha[id]);
	// 	let ip = this.ip;
	// 	let currentTime = (new Date())
	// 		.getTime();
	// 	// 如果ip在黑名单中就返回错误
	// 	if (blacklist[ip]) {
	// 		this.body = '该ip请求次数过多';
	// 		return;
	// 	} else {
	// 		redis.reqCaptcha[ip] = redis.reqCaptcha[ip] || {
	// 			startTime: (new Date())
	// 				.getTime(),
	// 			requestCount: 1
	// 		};
	// 	}
	// 	// console.log(
	// 	// 	`CurrentTime:${currentTime} StartTime:${redis.reqCaptcha[ip].startTime} ${currentTime-redis.reqCaptcha[ip].startTime}`
	// 	// );
	// 	// 如果该ip起始请求时间和当前时间小于一小时且在一小时内请求超过20次就刷新起始时间
	// 	if (currentTime - redis.reqCaptcha[ip].startTime < 36000 && redis.reqCaptcha[
	// 			ip].requestCount >=
	// 		10) {
	// 		// 从正常统计列表中移除，移入黑名单
	// 		delete redis.reqCaptcha[ip];
	// 		blacklist[ip] = blacklist[ip] || ip;
	// 		clearTimeout(rmIP);
	// 		rmIP = setTimeout(function () {
	// 			// console.log('解除封锁');
	// 			delete blacklist[ip];
	// 		}, 30000);
	// 	} else {
	// 		// 否则一小时后删除该ip，必须大于等于一小时后删除，因为记录的是一小时内的请求次数
	// 		++redis.reqCaptcha[ip].requestCount;
	// 		clearTimeout(rmIP);
	// 		rmIP = setTimeout(function () {
	// 			delete redis.reqCaptcha[ip];
	// 			// console.log('解除正常统计');
	// 		}, 36000);
	// 		// 设置20秒验证码过期时间
	// 		rmCaptcha = setTimeout(() => {
	// 			delete redis.captcha[id];
	// 		}, 20000);
	// 	}
	// 	this.body = captcha.buffer();
	// 	return;
	// })
	.get('/captcha', captcha())
	.get('/login', function* (next) {
		yield this.render('login');
		return;
	}).post('/authorize', authorize());
	// .post('/authorize', function* (next) {
	// 	let session = this.session;
	// 	let reqBody = yield getRawBody(this.req, {
	// 		length: this.request.length,
	// 		limit: '1mb',
	// 		encoding: 'utf8'
	// 	});
	// 	let formdata = queryString.parse(reqBody);
	// 	let ip = this.ip;
	// 	// 如果ip在黑名单中就返回错误
	// 	if (blacklist[ip]) {
	// 		this.body = '该ip请求次数过多';
	// 		return;
	// 	} else {
	// 		redis.error[ip] = redis.error[ip] || {
	// 			startTime: (new Date())
	// 				.getTime(),
	// 			count: 0
	// 		};
	// 	}
	// 	let currentTime = (new Date())
	// 		.getTime();
	// 	if (formdata.username === 'admin' && formdata.password === '123' &&
	// 		formdata
	// 		.captcha === redis.captcha[session.uuid]) {
	// 		let data = session.uuid + currentTime;
	// 		// 根据uuid和当前时间戳生成token
	// 		let token = crypto.createHmac('sha256', secret)
	// 			.update(data)
	// 			.digest('hex');
	// 		// 将token存入redis，key为uuid值为token
	// 		redis.token[session.uuid] = token;
	// 		clearTimeout(rmToken);
	// 		rmToken = setTimeout(() => {
	// 			delete redis.token[session.uuid];
	// 		}, 30000);
	// 		this.cookies.set('token', token, {
	// 			expires: new Date(currentTime + 30000)
	// 		});
	// 		this.body = token;
	// 		return;
	// 		// this.redirect('/backstage');
	// 	} else {
	// 		++redis.error[ip].count;
	// 		this.redirect('/login');
	// 	}
	// 	// 不论授权成功还是失败都删除上次的验证码
	// 	delete redis.captcha[session.uuid];
	// 	clearTimeout(rmIP);

	// 	console.log(
	// 		`CurrentTime:${currentTime} StartTime:${redis.error[ip].startTime} ${currentTime-redis.error[ip].startTime}`
	// 	);
	// 	console.log(`${ip}:${redis.error[ip].count}`);
	// 	// 如果该ip起始请求时间和当前时间小于一小时且在一小时内请求超过20次就刷新起始时间
	// 	if (currentTime - redis.error[ip].startTime < 36000 && redis.error[
	// 			ip].count >= 5) {
	// 		// 从正常统计列表中移除，移入黑名单
	// 		delete redis.error[ip];
	// 		blacklist[ip] = blacklist[ip] || ip;
	// 		clearTimeout(rmErrIP);
	// 		rmErrIP = setTimeout(function () {
	// 			delete blacklist[ip];
	// 		}, 30000);
	// 	} else {
	// 		// 否则一小时后删除该ip，必须大于等于一小时后删除，因为记录的是一小时内的请求次数
	// 		clearTimeout(rmErrIP);
	// 		rmErrIP = setTimeout(function () {
	// 			delete redis.error[ip];
	// 		}, 36000);
	// 	}

	// });

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
app.keys = ['wTf852,./'];
init(app);
render(app, {
	root: path.resolve(__dirname, 'view'),
	layout: 'template',
	viewExt: 'html',
	cache: false,
	debug: true
});


app.use(KoaStatic(path.resolve(__dirname, '../../dist')))
	.use(favicon(path.resolve(__dirname, '../../dist/favicon.ico')))
	.use(KoaSession({
		key: 'uuid'
	}, app))
	.use(router.routes())
	.use(function* (next) {
		if (this.status == 404) {
			this.redirect('/');
			return;
		} else {
			yield next;
		}
	})
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
app.on('error', function (error) {
	console.log(error);
});

app.listen(80);