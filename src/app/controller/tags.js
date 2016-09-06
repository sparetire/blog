const StatusCode = require('../../common/status-code');
const ArticleService = require('../lib/ArticleService');

function tags(opts) {
	return function* (next) {
		let ctx = this;
		let articleService = ArticleService.getInstance();
		let tags = yield articleService.getTags();
		let total = yield articleService.getArticlesCount();
		ctx.body = {
			status: StatusCode.OK,
			total: total,
			tagList: tags
		};
		return;
	};
}

module.exports = tags;