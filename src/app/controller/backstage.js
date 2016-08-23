const TokenList = require('../lib/token-list');

function backstage(opts) {
	return function* (next) {
		let ctx = this;
		let tokenList = TokenList.getInstance();
		let token = ctx.cookies.get('token');
		let scripts = ['/scripts/vendor.js', '/scripts/backstage.js'];
		if (yield tokenList.has(token)) {
			yield this.render('backstage', {
				scripts
			});
		} else {
			ctx.redirect(ctx.routerMap.login);
		}
		return;
	};
}

module.exports = backstage;