let NProgress = require('nprogress/nprogress');
let util = require('../../common/util');
require('nprogress/nprogress.css');

let ArticleService = (function () {
	let instance = null;

	function ArticleService() {
		let self = this instanceof ArticleService ? this : Object.create(
			ArticleService.prototype);

		if (!util.isFunction(self.getArticles)) {
			ArticleService.prototype.getArticles = function () {
				NProgress.start();
				let i = 0;
				let handler = setInterval(function () {
					++i;
					NProgress.inc();
					if (i == 10) {
						clearInterval(handler);
						NProgress.done();
					}
				}, 1000);
			};
		}
		return self;
	}


	ArticleService.getInstance = function () {
		// if (!instance) {
		// 	instance = new ArticleService();
		// }
		return instance || new ArticleService();
	};

	return ArticleService;
})();

module.exports = ArticleService;