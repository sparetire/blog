const util = require('../../common/util');
const ObjectId = require('mongodb')
	.ObjectId;
/* global DBs */
let instance = null,
	flag = true,
	articles = null;

function ArticleService() {
	if (flag) {
		throw new Error(
			'Use ArticleService.getInstance to get an instance of ArticleService.');
	}
	let self = this instanceof ArticleService ? this : Object.create(
		ArticleService.prototype);
	if (!util.isFunction(self.getArticleById)) {
		ArticleService.prototype.getArticleById = function (id) {
			if (articles) {
				ArticleService.prototype.getArticleById = function (id) {
					try {
						let query = {
							_id: new ObjectId(id)
						};
						return articles.findOne(query);
					} catch (err) {
						return Promise.resolve(false);
					}
				};
			} else {
				ArticleService.prototype.getArticleById = function (id) {
					try {
						let query = {
							_id: new ObjectId(id)
						};
						articles = DBs.blog.collection('articles');
						return articles.findOne(query);
					} catch (err) {
						return Promise.resolve(false);
					}
				};
			}
			return ArticleService.prototype.getArticleById(id);
		};
	}
	flag = false;
	return self;
}

ArticleService.getInstance = function () {
	if (!instance) {
		flag = false;
		instance = new ArticleService();
	}
	return instance;
};

module.exports = ArticleService;