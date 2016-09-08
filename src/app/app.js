const Koa = require('koa');
const KoaStatic = require('koa-static');
const KoaRouter = require('koa-router');
const KoaSession = require('koa-session');
const getRawBody = require('raw-body');
const path = require('path');
const favicon = require('koa-favicon');
const init = require('./init');
const routerMap = require('./config/router-map');
/* global logger */

let router = new KoaRouter();
router.get(routerMap.articles.name, routerMap.articles.path, routerMap.articles
		.controller)
	.get(routerMap.post.name, routerMap.post.path, routerMap.post.controller)
	.get(routerMap.archives.name, routerMap.archives.path, routerMap.archives.controller)
	.get(routerMap.tags.name, routerMap.tags.path, routerMap.tags.controller)
	.get(routerMap.about.name, routerMap.about.path, routerMap.about.controller)
	.get(routerMap.captcha.name, routerMap.captcha.path, routerMap.captcha.controller)
	.get(routerMap.login.name, routerMap.login.path, routerMap.login.controller)
	.post(routerMap.authorize.name, routerMap.authorize.path, routerMap.authorize.controller)
	.get(routerMap.backstage.name, routerMap.backstage.path, routerMap.backstage.controller)
	.post(routerMap.removeArticle.name, routerMap.removeArticle.path, routerMap.removeArticle
		.controller)
	.get(routerMap.allTags.name, routerMap.allTags.path, routerMap.allTags.controller)
	.post(routerMap.addUpdateArticle.name, routerMap.addUpdateArticle.path,
		routerMap.addUpdateArticle.controller);

let app = new Koa();
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
	});
app.on('error', function (error) {
	logger.error(error);
});

app.listen(80);