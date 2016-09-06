const util = require('./util');
module.exports = {
	isValidArticle(article) {
		return !!(article.title && article.content && article.author && article.tags);
	},
	isValidId(id) {
		return typeof id === 'string' && id.length === 24;
	}
};