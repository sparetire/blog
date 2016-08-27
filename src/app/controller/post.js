const StatusCode = require('../../common/status-code');

function post(opts) {
	return function* (next) {
		let ctx = this;
		ctx.body = {
			status: StatusCode.OK,
			post: {
				title: 'Hello',
				content: '# Marked in browser\n\nRendered by **marked**.',
				author: 'Sparetire',
				tags: ['Linux', 'Node', 'Java'],
				views: 50,
				timeStamp: 1470751691242,
				year: 2016,
				month: 8,
				day: 10,
				id: '4'
			}
		};
		return;
	};
}

module.exports = post;