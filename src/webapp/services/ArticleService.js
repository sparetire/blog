const util = require('../../common/util');

/*global ArticleService, APIs */

let ArticleService = (function () {
	let [instance, flag, getArticles, getTotal] = [null, true, null, null];

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
						per: pageLimit
					})
					.then((resp) => {
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
		flag = true;
		return self;
	}

	ArticleService.apiConfig = function (opts) {
		getArticles = opts.getArticles;
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