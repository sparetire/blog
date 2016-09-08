const Koa = require('koa');
const KoaStatic = require('koa-static');
const KoaSession = require('koa-session');
const path = require('path');
const favicon = require('koa-favicon');
const init = require('./init');
const Router = require('./lib/router');
const errorPage = require('./controller/error404');
/* global logger */

let app = new Koa();
init(app);
app.context.router = Router;


app.use(KoaStatic(path.resolve(__dirname, '../../public')))
	.use(favicon(path.resolve(__dirname, '../../public/favicon-32x32.png')))
	.use(KoaSession({
		key: 'uuid'
	}, app))
	.use(Router.routes())
	.use(errorPage());
app.on('error', function (error) {
	logger.error(error);
});

app.listen(80);