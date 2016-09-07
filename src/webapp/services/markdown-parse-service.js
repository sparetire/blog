const util = require('../../common/util');
const marked = require('marked');
const Promise = require('bluebird');


let MarkdownParseService = (function () {
	let [instance, flag] = [null, true];

	function MarkdownParseService() {
		let self = this instanceof MarkdownParseService ? this : Object.create(
			MarkdownParseService.prototype);
		if (flag) {
			throw new Error(
				'To get an instance of MarkdownParseService, use getInstance.');
		}

		if (!util.isFunction(self.parse)) {
			MarkdownParseService.prototype.parse = function (mkdString) {
				return new Promise(function (resolve, reject) {
					marked(mkdString, function (err, content) {
						if (err) {
							reject(err);
						} else {
							resolve(content);
						}
					});
				});
			};
		}
		flag = true;
		return self;
	}

	MarkdownParseService.config = function (opts) {
		marked.setOptions(opts);
	};

	MarkdownParseService.getInstance = function () {
		if (!instance) {
			flag = false;
			instance = new MarkdownParseService();
		}
		return instance;
	};

	return MarkdownParseService;
})();

module.exports = MarkdownParseService;