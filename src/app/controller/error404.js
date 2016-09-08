function errorPage(opts) {
	return function* (next) {
		let ctx = this;
		if (ctx.status == 404) {
			ctx.redirect('/');
			return;
		} else {
			yield next;
		}
	};
}

module.exports = errorPage;