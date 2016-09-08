const BlackList = require('../lib/blacklist');
const AuthErrList = require('../lib/auth-err-list');
const UuidCaptchaList = require('../lib/uuid-captcha-list');
const TokenList = require('../lib/token-list');
const getRawBody = require('raw-body');
const queryString = require('querystring');
const crypto = require('crypto');
const config = require('../config/app.conf');


let secret = config.tokenSecret;

// todo
function getToken(uuid) {
	let currentTime = (new Date())
		.getTime();
	let data = uuid + currentTime;
	let token = crypto.createHmac('sha256', secret)
		.update(data)
		.digest('hex');
	return token;
}

// todo
function isValidUser(username, password, captcha, uuid) {
	let uuidCaptchaList = UuidCaptchaList.getInstance();
	return uuidCaptchaList.get(uuid)
		.then(data => {
			return username === config.username && password === config.password &&
				captcha === data;
		});
}

//todo
function isOverLimit(ipInfo, timeout) {
	let currentTime = (new Date())
		.getTime();
	return currentTime - ipInfo.startTime < timeout && ipInfo.errorCount >= config
		.loginRetryLimit;
}

function authorize(opts) {
	return function* (next) {
		let ctx = this;
		let ip = this.ip;
		let session = this.session;
		let routerMap = this.routerMap;
		let blkList = BlackList.getInstance();
		let authErrList = AuthErrList.getInstance();
		let tokenList = TokenList.getInstance();
		// 一个ip只可能存在于黑名单或观察列表中的一个里面
		// 不可能既属于黑名单又属于观察列表
		// 如果ip在黑名单中就返回错误
		if (yield blkList.has(ip)) {
			ctx.body = '该ip请求次数过多';
			return;
		} else if (!(yield authErrList.has(ip))) {
			// 将新ip加入请求授权错误次数的观察队列
			authErrList.addOrUpdate(ip);
		}

		// 解析请求body
		let reqBody = yield getRawBody(ctx.req, {
			length: ctx.request.length,
			limit: '1mb',
			encoding: 'utf8'
		});
		let formdata = queryString.parse(reqBody);
		// 授权成功标记
		let isAuthorized = yield isValidUser(formdata.username, formdata.password,
			formdata.captcha, session.uuid);
		// 不论授权成功还是失败都删除上次的验证码
		let uuidCaptchaList = UuidCaptchaList.getInstance();
		uuidCaptchaList.del(session.uuid);

		if (isAuthorized) {
			// 根据uuid取得一个token
			let currentTime = (new Date())
				.getTime();
			let token = getToken(session.uuid);
			tokenList.addOrUpdate(token);
			ctx.cookies.set('token', token, {
				expires: new Date(currentTime + tokenList.DEFAULT_TIMEOUT * 1000)
			});
			ctx.redirect(routerMap.backstage.path);
		} else {
			authErrList.incr(ip);
			let ipInfo = yield * authErrList.get(ip);
			if (isOverLimit(ipInfo, authErrList.DEFAULT_TIMEOUT)) {
				authErrList.del(ip);
				blkList.addOrUpdate(ip);
			}
			ctx.redirect(routerMap.login.path);
		}
		return;
	};
}

module.exports = authorize;