const StatusCode = require('../../common/status-code');
const TokenList = require('../lib/token-list');
const ArticleService = require('../lib/ArticleService');

function allTags(opts) {
	return function* (next) {
		let ctx = this;
		let tokenList = TokenList.getInstance();
		let token = ctx.cookies.get('token');
		if (yield tokenList.has(token)) {
			let articleService = ArticleService.getInstance();
			let tags = yield articleService.getTagsName();
			ctx.body = {
				status: StatusCode.OK,
				total: tags.length,
				tags: tags
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