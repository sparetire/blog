module.exports = {
	isValidArticle(article) {
		return !!(article.title && article.content && article.author && article.tags &&
			article.id && article.timeStamp);
	}
};