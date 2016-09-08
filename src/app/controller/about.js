const StatusCode = require('../../common/status-code');
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const ABOUT_INTRO = path.resolve(__dirname, '../config/about.md');

function about(opts) {
	return function* (next) {
		let ctx = this;
		let getContent = new Promise(function (resolve, reject) {
			try {
				fs.readFile(ABOUT_INTRO, 'utf8', (err, data) => {
					if (err) {
						reject(-1);
					} else {
						resolve(data);
					}
				});
			} catch (err) {
				reject(-1);
			}
		});

		let content = yield getContent;

		if (content === -1) {
			ctx.body = {
				status: StatusCode.ERROR,
				description: '内部错误'
			};
		} else {
			ctx.body = {
				status: StatusCode.OK,
				content: content
			};
		}
		return;
	};
}

module.exports = about;