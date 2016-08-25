const TokenList = require('../lib/token-list');
const StatusCode = require('../../common/status-code');

function removeArticle(opst) {
	return function* (next) {
		let ctx = this;
		let tokenList = TokenList.getInstance();
		let token = ctx.cookies.get('token');
		let routerMap = ctx.routerMap;
		if (yield tokenList.has(token)) {
			ctx.body = {
				status: StatusCode.OK,
				description: '删除成功'
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

module.exports = removeArticle;