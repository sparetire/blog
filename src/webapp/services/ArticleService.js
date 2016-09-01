const util = require('../../common/util');
const Promise = require('bluebird');
const StatusCode = require('../../common/status-code');
const MarkdownParseService = require('./MarkdownParseService');

/*global ArticleService, APIs */

let ArticleService = (function () {
	let [instance, flag, getArticles, getArticle, getTotal, cacheArticles] = [
		null, true,
		null, null, null, []
	];

	function ArticleService() {
		let self = this instanceof ArticleService ? this : Object.create(
			ArticleService.prototype);
		if (flag) {
			throw new Error('To get an instance of ArticleService, use getInstance.');
		}

		if (!util.isFunction(self.getArticles)) {
			ArticleService.prototype.getArticles = function (pageNum, pageLimit) {
				if (!util.isObject(getArticles)) {
					throw new Error('API getArticles must be set properly.');
				}
				return getArticles.get({
						page: pageNum,
						limit: pageLimit
					})
					.then(resp => {
						return resp.json();
					});
			};
		}

		if (!util.isFunction(self.getTotal)) {
			ArticleService.prototype.getTotal = function (queryOpts) {
				if (!util.isObject(getTotal)) {
					throw new Error('API getTotal must be set properly.');
				}
				return getTotal.get(queryOpts);
			};
		}

		if (!util.isFunction(self.setCachedArticles)) {
			ArticleService.prototype.setCachedArticles = function (articles) {
				cacheArticles = articles;
			};
		}

		if (!util.isFunction(self.getArticleById)) {
			ArticleService.prototype.getArticleById = function (id) {
				for (let i = 0; i < cacheArticles.length; ++i) {
					if (cacheArticles[i].id === id) {
						return Promise.resolve(cacheArticles[i]);
					}
				}
				if (!util.isObject(getArticle)) {
					throw new Error('API getArticle must be set properly.');
				}
				let article = null;
				return getArticle.get({
						id
					})
					.then(resp => {
						return resp.json();
					})
					.then(data => {
						if (data.status === StatusCode.OK) {
							let markdownParser = MarkdownParseService.getInstance();
							article = data.post;
							return markdownParser.parse(article.content);
						} else {
							throw new Error(`Error: ${data.description}`);
						}
					})
					.then(content => {
						article.content = content;
						return article;
					});
			};
		}
		flag = true;
		return self;
	}

	ArticleService.apiConfig = function (opts) {
		getArticles = opts.getArticles;
		getArticle = opts.getArticle;
		getTotal = opts.getTotal;
	};


	ArticleService.getInstance = function () {
		if (!instance) {
			flag = false;
			instance = new ArticleService();
		}
		return instance;
	};

	return ArticleService;
})();

module.exports = ArticleService;