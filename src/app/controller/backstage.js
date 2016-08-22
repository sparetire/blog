const TokenList = require('../lib/token-list');

function backstage(opts) {
	return function* (next) {
		let ctx = this;
		let tokenList = TokenList.getInstance();
		let token = ctx.cookies.get('token');
		let scripts = ['/scripts/vendor.js', '/scripts/login.js'];
		if (yield tokenList.has(token)) {
			ctx.redirect('/login');
		} else {
			yield this.render('backstage', {
				scripts
			});
		}
		return;
	};
}

module.exports = backstage;