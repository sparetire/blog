const captchagen = require('captchagen');
const uuid = require('node-uuid');
const BlackList = require('../lib/blacklist');
const CaptchaReqList = require('../lib/captcha-req-list');
const UuidCaptchaList = require('../lib/uuid-captcha-list');
const config = require('../config/app.conf');
// session的最大无响应时间也即过期时间，也是uuid的过期时间，uuid过期不代表token过期，每次重新请求会刷新,ms
let SESSION_TIMEOUT = config.sessionTimeout;



function isOverLimit(ipInfo, timeout) {
	let currentTime = (new Date())
		.getTime();
	// todo
	return currentTime - ipInfo.startTime < timeout && ipInfo.requestCount >=
		config.captchaRequestLimit;
}


function captcha(opts) {
	return function* (next) {
		let ctx = this;
		let ip = this.ip;
		let blkList = BlackList.getInstance();
		let cpReqList = CaptchaReqList.getInstance();
		let uuidCaptchaList = UuidCaptchaList.getInstance();

		// 一个ip只可能存在于黑名单或观察列表中的一个里面
		// 不可能既属于黑名单又属于观察列表
		if (yield blkList.has(ip)) {
			ctx.body = '该ip请求次数过多';
			return;
		} else if (!(yield cpReqList.has(ip))) {
			// 将新ip加入请求验证码次数的观察队列
			cpReqList.addOrUpdate(ip);
		}

		let ipInfo = yield * cpReqList.get(ip);
		if (isOverLimit(ipInfo, cpReqList.DEFAULT_TIMEOUT)) {
			cpReqList.del(ip);
			blkList.addOrUpdate(ip);
		} else {
			cpReqList.incr(ip);
		}

		// 这里又出现判断黑名单的原因是避免
		// 出现ip已经在黑名单还返回验证码的情况
		// 可以写在上面的else里但这样写更清晰点
		// 虽然要多查一次redis
		if (yield blkList.has(ip)) {
			ctx.body = '该ip请求次数过多';
		} else {
			let session = ctx.session;
			// 生成验证码，这个智障库不能复用这个配置对象。。它是根据这个对象来生成随机文本的。。
			let captchaImg = captchagen.create({
				height: 38,
				width: 120
			});
			captchaImg.generate();
			// 如果是新session就给session设置一个uuid，uuid和session一一对应
			// 需要一个额外id变量的原因是可能删除redis[session.id]的时候session的id已经变了
			let id = session.uuid = session.isNew ? uuid.v4() : session.uuid || uuid.v4();
			// 刷新session过期时间
			session.maxAge = SESSION_TIMEOUT;
			// 将uuid-验证码存入redis的验证码池或者刷新验证码
			uuidCaptchaList.addOrUpdate(id, captchaImg.text());
			// todo
			console.log(captchaImg.text());
			ctx.body = captchaImg.buffer();
		}
		return;
	};
}

module.exports = captcha;