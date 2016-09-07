const StatusCode = require('../../common/status-code');
const ArticleService = require('../lib/ArticleService');

function archives(opts) {
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
		let total = yield articleService.getArchivesCount();
		let archiveList = yield articleService.getArchives(page, limit);
		ctx.body = {
			status: StatusCode.OK,
			total: total,
			archiveList: archiveList
		};
		return;
	};
}

module.exports = archives;