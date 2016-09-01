const StatusCode = require('../../common/status-code');
const ArticleService = require('../lib/ArticleService');
const Validate = require('../lib/Validate');

function post(opts) {
	return function* (next) {
		let ctx = this;
		let articleService = ArticleService.getInstance();
		let id = ctx.params.id;
		let post = yield articleService.getArticleById(id);

		if (!post) {
			ctx.body = {
				status: StatusCode.SOURCE_NOT_FOUND,
				description: '文章未找到'
			};
		} else if (!Validate.isValidArticle(post)) {
			ctx.body = {
				status: StatusCode.DATA_INTEGRITY_ERROR,
				description: '文档内容错误'
			};
		} else {
			ctx.body = {
				status: StatusCode.OK,
				post: post
			};
		}



		// ctx.body = {
		// 	status: StatusCode.OK,
		// 	post: {
		// 		title: 'Hello',
		// 		content: '# Marked in browser\n\nRendered by **marked**.',
		// 		author: 'Sparetire',
		// 		tags: ['Linux', 'Node', 'Java'],
		// 		views: 50,
		// 		timeStamp: 1470751691242,
		// 		year: 2016,
		// 		month: 8,
		// 		day: 10,
		// 		id: '4'
		// 	}
		// };
		return;
	};
}

module.exports = post;