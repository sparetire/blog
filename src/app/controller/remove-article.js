const TokenList = require('../lib/token-list');
const StatusCode = require('../../common/status-code');
const getRawBody = require('raw-body');
const Validate = require('../../common/Validate');
const ArticleService = require('../lib/ArticleService');

function removeArticle(opts) {
	return function* (next) {
		let ctx = this;
		let tokenList = TokenList.getInstance();
		let token = ctx.cookies.get('token');
		let routerMap = ctx.routerMap;
		if (!(yield tokenList.has(token))) {
			ctx.body = {
				status: StatusCode.ACCESS_DENIED,
				// 可选字段description
				description: '未授权访问'
			};
		}

		let reqBody = JSON.parse(yield getRawBody(ctx.req, {
			length: ctx.request.length,
			limit: '1mb',
			encoding: 'utf8'
		}));
		if (!Validate.isValidId(reqBody.id)) {
			ctx.body = {
				status: StatusCode.PARAM_ERROR,
				description: '请求参数错误'
			};
		}

		let articleService = ArticleService.getInstance();
		let rst = yield articleService.removeArticleById(reqBody.id);
		switch (rst) {
			case 0:
				ctx.body = {
					status: StatusCode.ERROR,
					description: '内部错误'
				};
				break;
			case 1:
				ctx.body = {
					status: StatusCode.OK,
					description: '删除成功'
				};
				break;
			case 2:
				ctx.body = {
					status: StatusCode.SOURCE_NOT_FOUND,
					description: '文章不存在'
				};
				break;

			default:
				break;
		}
		return;
	};
}

module.exports = removeArticle;