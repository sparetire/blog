const TokenList = require('../lib/token-list');

function login(opst) {
	return function* (next) {
		let ctx = this;
		let tokenList = TokenList.getInstance();
		let token = ctx.cookies.get('token');
		let scripts = ['/scripts/vendor.js', '/scripts/login.js'];
		if (yield tokenList.has(token)) {
			ctx.redirect(ctx.routerMap.backstage);
		} else {
			yield this.render('login', {
				scripts
			});
		}
		return;
	};
}

module.exports = login;