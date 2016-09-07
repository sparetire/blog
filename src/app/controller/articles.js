const StatusCode = require('../../common/status-code');
const ArticleService = require('../lib/article-service');

function articles(opts) {
	return function* (next) {
		let ctx = this;
		let articleService = ArticleService.getInstance();
		let page = parseInt(ctx.query.page, 10);
		let limit = parseInt(ctx.query.limit, 10);
		if (isNaN(page) || isNaN(limit)) {
			ctx.body = {
				status: StatusCode.PARAM_ERROR,
				description: '请求参数错误'
			};
		}
		let total = yield articleService.getArticlesCount();
		let articleList = yield articleService.getArticles(page, limit);
		ctx.body = {
			status: StatusCode.OK,
			total: total,
			articleList: articleList
		};
		return;
	};
}

module.exports = articles;