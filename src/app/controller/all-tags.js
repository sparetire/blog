const StatusCode = require('../../common/status-code');
const TokenList = require('../lib/token-list');

function allTags(opts) {
	return function* (next) {
		let ctx = this;
		let tokenList = TokenList.getInstance();
		let token = ctx.cookies.get('token');
		let routerMap = ctx.routerMap;
		if (yield tokenList.has(token)) {
			ctx.body = {
				status: StatusCode.OK,
				tags: ['Linux', 'Node', 'Java', 'Security', 'MySQL', 'CSS', 'Sass']
			};
		} else {
			ctx.body = {
				status: StatusCode.ACCESS_DENIED,
				// 可选字段description
				description: '未授权访问'
			};
		}
		return;
	};
}

module.exports = allTags;