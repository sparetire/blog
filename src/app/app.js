const Koa = require('koa');
const KoaStatic = require('koa-static');
const KoaRouter = require('koa-router');
const KoaSession = require('koa-session');
const getRawBody = require('raw-body');
const path = require('path');
const favicon = require('koa-favicon');
const init = require('./init');
const captcha = require('./controller/captcha');
const authorize = require('./controller/authorize');
const login = require('./controller/login');
const backstage = require('./controller/backstage');
const removeArticle = require('./controller/remove-article');
const allTags = require('./controller/all-tags');
const post = require('./controller/post');
const routerMap = require('./config/routerMap');

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
	.get(routerMap.post.name, routerMap.post.path, post())
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
					title: 'Hello1',
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
	.get('/captcha', captcha())
	.get(routerMap.login.name, routerMap.login.path, login())
	.post('/authorize', authorize())
	.get(routerMap.backstage.name, routerMap.backstage.path, backstage())
	.post('/removearticle', removeArticle())
	.get(routerMap.allTags.name, routerMap.allTags.path, allTags());

let app = new Koa();
app.keys = ['wTf852,./'];
init(app);
app.context.router = router;


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